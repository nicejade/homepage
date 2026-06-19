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


def build_curation_reason(title: str, description: str) -> str:
    if description:
        return description if len(description) <= 80 else description[:77].rstrip() + "…"
    return f"{title} 是值得纳入 GitHub 珍藏的开源项目。"


def build_body(
    title: str,
    owner: str,
    repo: str,
    repo_url: str,
    description: str,
    readme_summary: str,
    language: str,
    homepage: str | None,
) -> str:
  homepage_line = (
      f"项目主页为 [{homepage}]({homepage})，可配合仓库 README 一起阅读。"
      if homepage
      else "可结合仓库 README 与 Releases 了解安装方式与版本变化。"
  )
  intro = readme_summary or description or f"{title} 是一个活跃维护的 GitHub 开源项目。"
  return f"""## 项目介绍

{intro}

## GitHub 仓库预览

仓库位于 [{owner}/{repo}]({repo_url})，主要语言为 {language or "Unknown"}。{homepage_line}

## 对用户价值

{description or f"{title} 提供了可复用的开源能力，适合纳入个人或团队工具箱。"}

## 适应人群

- 正在寻找 {title} 相关开源方案的个人开发者。
- 希望评估 GitHub 项目质量、社区活跃度与许可信息的工程团队。
- 想把成熟开源组件接入现有工作流的效率型用户。

## 如何使用

克隆或 Fork 仓库，阅读 README 中的安装与配置说明，再在小范围环境中验证。上线前请确认许可证、依赖与安全边界是否符合你的使用场景。
"""


def build_mdx(repo: dict[str, Any], owner: str, repo_name: str, readme: str) -> str:
    today = date.today().isoformat()
    repo_url = repo.get("html_url") or f"https://github.com/{owner}/{repo_name}"
    title = repo.get("name") or repo_name
    description = (repo.get("description") or "").strip()
    language = repo.get("language") or "Unknown"
    stars = int(repo.get("stargazers_count") or 0)
    license_info = repo.get("license") or {}
    license_name = license_info.get("spdx_id") or "Unknown"
    homepage = (repo.get("homepage") or "").strip() or None
    tags = pick_tags(repo)
    curation_reason = build_curation_reason(title, description)
    readme_summary = summarize_readme(readme)
    body = build_body(
        title=title,
        owner=owner,
        repo=repo_name,
        repo_url=repo_url,
        description=description,
        readme_summary=readme_summary,
        language=language,
        homepage=homepage,
    )

    frontmatter = [
        "---",
        f"title: {yaml_quote(title)}",
        f"description: {yaml_quote(description or f'{title} 开源项目收录。')}",
        f"repo: {yaml_quote(repo_url)}",
    ]
    if homepage:
        frontmatter.append(f"homepage: {yaml_quote(homepage)}")
    frontmatter.extend(
        [
            "tags:",
            *[f"  - {tag}" for tag in tags],
            f"language: {yaml_quote(language)}",
            f"stars: {stars}",
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
        mdx = build_mdx(repo, owner, repo_name, readme)
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
