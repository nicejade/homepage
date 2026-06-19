#!/usr/bin/env python3
"""Generate a GitHub curation MDX entry from a repository URL."""

from __future__ import annotations

import argparse
import base64
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

GITHUB_API = "https://api.github.com"
USER_AGENT = "github-project-curator/1.0"

TOPIC_TAG_MAP = {
    "ai": "AI 编程",
    "agent": "Agent",
    "agents": "Agent",
    "automation": "自动化",
    "cli": "CLI",
    "developer-tools": "开发工具",
    "devops": "开发工具",
    "documentation": "知识管理",
    "knowledge-base": "知识管理",
    "llm": "本地模型",
    "machine-learning": "本地模型",
    "nlp": "本地模型",
    "note-taking": "知识管理",
    "productivity": "开发工具",
    "self-hosted": "本地模型",
    "terminal": "CLI",
    "workflow": "工作流",
    "workflow-automation": "工作流",
}

LANGUAGE_TAG_MAP = {
    "go": "CLI",
    "python": "开发工具",
    "rust": "开发工具",
    "shell": "CLI",
    "typescript": "开发工具",
}

DEFAULT_TAGS = ["开发工具", "开源项目", "GitHub"]


def parse_repo_url(raw_url: str) -> tuple[str, str]:
    cleaned = raw_url.strip().rstrip("/")
    cleaned = re.sub(r"\.git$", "", cleaned)
    match = re.search(r"github\.com[:/](?P<owner>[^/]+)/(?P<repo>[^/?#]+)", cleaned)
    if not match:
        raise ValueError(f"Invalid GitHub repository URL: {raw_url}")
    return match.group("owner"), match.group("repo")


def curl_request(url: str, headers: dict[str, str]) -> bytes:
    command = ["curl", "-fsSL", url]
    for key, value in headers.items():
        command.extend(["-H", f"{key}: {value}"])
    result = subprocess.run(command, capture_output=True, text=False, check=False)
    if result.returncode != 0:
        message = result.stderr.decode("utf-8", errors="replace").strip() or "curl request failed"
        raise URLError(message)
    return result.stdout


def github_request(path: str, token: str | None = None) -> Any:
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": USER_AGENT,
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    url = f"{GITHUB_API}{path}"
    try:
        request = Request(url, headers=headers)
        with urlopen(request, timeout=30) as response:
            payload = response.read()
    except URLError as error:
        if "CERTIFICATE_VERIFY_FAILED" not in str(error):
            raise
        payload = curl_request(url, headers)
    return json.loads(payload.decode("utf-8"))


def fetch_readme(owner: str, repo: str, token: str | None = None) -> str:
    try:
        payload = github_request(f"/repos/{owner}/{repo}/readme", token)
    except HTTPError as error:
        if error.code == 404:
            return ""
        raise
    content = payload.get("content", "")
    if not content:
        return ""
    return base64.b64decode(content).decode("utf-8", errors="replace")


def summarize_readme(readme: str, limit: int = 480) -> str:
    text = re.sub(r"```.*?```", " ", readme, flags=re.DOTALL)
    text = re.sub(r"<!--.*?-->", " ", text, flags=re.DOTALL)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[#>*_`~-]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return ""
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def pick_tags(repo: dict[str, Any]) -> list[str]:
    tags: list[str] = []
    topics = [topic.lower() for topic in repo.get("topics", [])]
    for topic in topics:
        mapped = TOPIC_TAG_MAP.get(topic)
        if mapped and mapped not in tags:
            tags.append(mapped)
    language = (repo.get("language") or "").lower()
    mapped_language = LANGUAGE_TAG_MAP.get(language)
    if mapped_language and mapped_language not in tags:
        tags.append(mapped_language)
    description = (repo.get("description") or "").lower()
    keyword_map = {
        "agent": "Agent",
        "automation": "自动化",
        "cli": "CLI",
        "knowledge": "知识管理",
        "llm": "本地模型",
        "local": "本地模型",
        "workflow": "工作流",
    }
    for keyword, tag in keyword_map.items():
        if keyword in description and tag not in tags:
            tags.append(tag)
    for fallback in DEFAULT_TAGS:
        if len(tags) >= 3:
            break
        if fallback not in tags:
            tags.append(fallback)
    return tags[:3]


def yaml_quote(value: str) -> str:
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def truncate_chinese(text: str, limit: int) -> str:
    text = text.strip()
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def build_curation_reason(title: str, tags: list[str]) -> str:
    tag_a = tags[0] if len(tags) > 0 else "开源"
    tag_b = tags[1] if len(tags) > 1 else "开发工具"
    reason = f"适合关注{tag_a}、{tag_b}场景的开发者与团队。"
    return truncate_chinese(reason, 100)


def build_chinese_description(title: str, readme_summary: str, english_desc: str) -> str:
    if readme_summary:
        return truncate_chinese(readme_summary, 80)
    if english_desc:
        return truncate_chinese(f"{title} 开源项目（请润色为中文摘要）。", 80)
    return truncate_chinese(f"{title} 是值得纳入开源琅嬛阁的开源项目。", 80)


def extract_install_snippet(readme: str) -> str:
    if not readme:
        return "请查阅仓库 README 中的安装说明。"
    match = re.search(
        r"```[\w]*\n(?:(?:npm install|pnpm |yarn |pip install|brew |curl |docker ).*?)\n```",
        readme,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if match:
        return match.group(0).strip()
    return "请查阅仓库 README 中的安装说明。"


def extract_feature_bullets(readme: str, limit: int = 5) -> list[str]:
    bullets: list[str] = []
    for line in readme.splitlines():
        stripped = line.strip()
        if stripped.startswith(("- ", "* ", "• ")):
            text = re.sub(r"^[-*•]\s+", "", stripped)
            text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
            if 8 <= len(text) <= 120:
                bullets.append(text)
        if len(bullets) >= limit:
            break
    return bullets


def fetch_contributor_count(owner: str, repo: str, token: str | None = None) -> int | None:
    try:
        payload = github_request(
            f"/repos/{owner}/{repo}/contributors?per_page=1&anon=1",
            token,
        )
        if not isinstance(payload, list):
            return None
        # Full count requires pagination; use length if small repo
        if len(payload) == 0:
            return 0
        if len(payload) == 1:
            return 1
        return None
    except HTTPError:
        return None


def build_body(
    title: str,
    description: str,
    readme_summary: str,
    install_snippet: str,
    feature_bullets: list[str],
) -> str:
    intro = readme_summary or description or f"{title} 是一个活跃维护的 GitHub 开源项目。"
    features = feature_bullets or [
        f"围绕 {title} 的核心能力提供开源实现（请根据 README 补充具体特性）。",
        "社区活跃，文档与示例可参考官方仓库。",
        "支持常见开发环境与集成场景（需人工核实）。",
    ]
    feature_lines = "\n".join(f"- {item}" for item in features[:5])
    return f"""## 项目介绍

{intro}

## 核心特性

{feature_lines}

## 对用户价值

{description or f"{title} 提供了可复用的开源能力，适合纳入个人或团队工具箱。"}

## 与替代方案

- 与同类工具相比，{title} 的差异点需结合官方定位人工补充。
- 若你正在评估替代方案，请对照许可证、部署方式、集成成本与团队技能栈。
- 不确定时建议先 Fork 或小规模试用，再决定是否纳入主力工具链。

## 适应人群

- 正在寻找 {title} 相关开源方案的个人开发者。
- 希望评估 GitHub 项目质量、社区活跃度与许可信息的工程团队。
- 想把成熟开源组件接入现有工作流的效率型用户。

## 如何使用

### 前置条件

- 确认运行环境、依赖版本与网络访问要求（见 README）。
- 了解项目许可证与商业使用边界。

### 安装方式

{install_snippet}

### 首次运行

按照 README 完成初始化配置，并在隔离环境或测试项目中进行首次启动。

### 验证是否成功

确认核心命令可执行、示例流程可跑通，并检查日志中无阻塞性错误。

### 常见坑 / 注意事项

- 密钥、凭据与生产数据应单独管理，避免直接写入仓库。
- 版本升级前阅读 Releases / CHANGELOG，关注破坏性变更。
- 以下内容需人工核实：具体命令、配置项与平台差异。
"""


def build_mdx(
    repo: dict[str, Any],
    owner: str,
    repo_name: str,
    readme: str,
    contributors: int | None,
) -> str:
    today = date.today().isoformat()
    repo_url = repo.get("html_url") or f"https://github.com/{owner}/{repo_name}"
    title = repo.get("name") or repo_name
    english_description = (repo.get("description") or "").strip()
    language = repo.get("language") or "Unknown"
    stars = int(repo.get("stargazers_count") or 0)
    forks = int(repo.get("forks_count") or 0)
    open_issues = int(repo.get("open_issues_count") or 0)
    license_info = repo.get("license") or {}
    license_name = license_info.get("spdx_id") or "Unknown"
    homepage = (repo.get("homepage") or "").strip() or None
    owner_info = repo.get("owner") or {}
    avatar_url = (owner_info.get("avatar_url") or "").strip() or None
    tags = pick_tags(repo)
    readme_summary = summarize_readme(readme)
    chinese_description = build_chinese_description(title, readme_summary, english_description)
    curation_reason = build_curation_reason(title, tags)
    install_snippet = extract_install_snippet(readme)
    feature_bullets = extract_feature_bullets(readme)
    body = build_body(
        title=title,
        description=chinese_description,
        readme_summary=readme_summary,
        install_snippet=install_snippet,
        feature_bullets=feature_bullets,
    )

    frontmatter = [
        "---",
        f"title: {yaml_quote(title)}",
        f"description: {yaml_quote(chinese_description)}",
        f"repo: {yaml_quote(repo_url)}",
    ]
    if homepage:
        frontmatter.append(f"homepage: {yaml_quote(homepage)}")
    if english_description:
        frontmatter.append(f"repoDescription: {yaml_quote(english_description)}")
    if avatar_url:
        frontmatter.append(f"avatarUrl: {yaml_quote(avatar_url)}")
    frontmatter.extend(
        [
            "tags:",
            *[f"  - {tag}" for tag in tags],
            f"language: {yaml_quote(language)}",
            f"stars: {stars}",
            f"forks: {forks}",
            f"openIssues: {open_issues}",
        ]
    )
    if contributors is not None:
        frontmatter.append(f"contributors: {contributors}")
    frontmatter.extend(
        [
            f"license: {yaml_quote(license_name)}",
            "featured: false",
            f'publishedAt: "{today}"',
            f'updatedAt: "{today}"',
            f"curationReason: {yaml_quote(curation_reason)}",
            "---",
            "",
        ]
    )
    return "\n".join(frontmatter) + body


def find_repo_root(start: Path) -> Path:
    for candidate in [start, *start.parents]:
        if (candidate / "src/content/github").exists():
            return candidate
    raise FileNotFoundError("Could not locate src/content/github from current path.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("repo_url", help="GitHub repository URL")
    parser.add_argument(
        "--output-root",
        type=Path,
        default=None,
        help="Repository root containing src/content/github",
    )
    parser.add_argument(
        "--token",
        default=None,
        help="Optional GitHub token for higher API rate limits",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print generated MDX without writing a file",
    )
    args = parser.parse_args()

    try:
        owner, repo_name = parse_repo_url(args.repo_url)
        repo = github_request(f"/repos/{owner}/{repo_name}", args.token)
        readme = fetch_readme(owner, repo_name, args.token)
        contributors = fetch_contributor_count(owner, repo_name, args.token)
        mdx = build_mdx(repo, owner, repo_name, readme, contributors)
    except (ValueError, HTTPError, URLError, TimeoutError) as error:
        print(f"error: {error}", file=sys.stderr)
        return 1

    if args.dry_run:
        print(mdx)
        return 0

    root = args.output_root or find_repo_root(Path.cwd())
    output_dir = root / "src/content/github"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{repo_name}.mdx"
    output_path.write_text(mdx, encoding="utf-8")
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
