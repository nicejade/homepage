---
name: github-project-curator
description: Generate and validate 开源琅嬛阁 MDX entries for the Astro homepage from a GitHub repository URL. Use when adding or refreshing curated projects under src/content/github/, turning a repo link into schema-valid frontmatter and required Chinese body sections with X-style social preview support.
---

# GitHub Project Curator

## Overview

Turn a GitHub repository URL into one publishable MDX file for the site's `开源琅嬛阁` section. The workflow fetches official repository metadata, drafts grounded Chinese copy, writes `src/content/github/<repo>.mdx`, and validates the result against the site schema.

**Visual preview is rendered by the site**, not written in MDX. Detail pages show an X-style social card (`GithubSocialCard.svelte`) with the GitHub English description, avatar, and stats. Stars refresh live on the detail page; list cards use compact static snapshots (`45k+`).

## When To Use

- The user shares a GitHub repository URL and wants it added to `/github/`.
- An existing curated entry needs refreshed metadata, stars snapshot, or copy grounded in current README content.
- You need a repeatable starting point before polishing curation language by hand.

## Required Output Shape

Each entry must satisfy `src/content/config.ts`:

### Frontmatter

Required:

- `title`, `repo`, optional `homepage`
- `description` — Chinese one-liner (≤80 chars) for list card and SEO; answers **what the project is**
- `curationReason` — required search-only note (≤100 chars); audience, scenario, or filter-friendly keywords; **must not repeat `description`**
- Exactly three Chinese `tags`, `language`, `stars`, `license`, `featured`, `publishedAt`, `updatedAt`

Optional snapshots (generator should populate when available):

- `repoDescription` — GitHub English description (X card fallback)
- `avatarUrl` — owner avatar URL
- `forks`, `openIssues`, `contributors` — stats row fallbacks

### Body sections (in order)

Do **not** include `## GitHub 仓库预览` — the site component handles the visual card.

1. `## 项目介绍` — 2–3 sentences, Chinese positioning
2. `## 核心特性` — 3–5 bullets from README/features
3. `## 对用户价值` — concrete problems solved
4. `## 与替代方案` — compare to 1–3 alternatives or state boundaries
5. `## 适应人群` — 3 persona bullets
6. `## 如何使用` — must include all five subsections:
   - `### 前置条件`
   - `### 安装方式` (real install commands when README provides them)
   - `### 首次运行`
   - `### 验证是否成功`
   - `### 常见坑 / 注意事项`

Read `docs/superpowers/specs/2026-06-19-github-curator-skill-v2-design.md` for full product rules.

## Workflow

1. Normalize the repository URL to `https://github.com/<owner>/<repo>`.
2. Run the generator script from the site root:

```bash
python3 .codex/skills/github-project-curator/scripts/create_github_project_mdx.py <github-repo-url>
```

Use `--dry-run` to inspect output without writing a file.

3. Review the generated MDX:
   - Rewrite `description` and body copy in polished Chinese.
   - Ensure `repoDescription` keeps the GitHub English tagline for the social card.
   - Expand `## 与替代方案` with real competitors when applicable.
   - Replace scaffold install steps with verified README commands.
   - Mark uncertainty instead of inventing features.
   - Keep `description` as the single visible list-card line (≤80 Chinese chars).
   - Write `curationReason` from a different angle (persona, scenario, search phrases).
   - Confirm `description` and `curationReason` are not paraphrases before saving.
4. Choose `featured` intentionally. New entries default to `false`.
5. Validate the site:

```bash
pnpm astro check
pnpm build
```

6. Report:
   - output file path
   - chosen tags and why they fit filtering
   - low-confidence sections needing manual review
   - validation command results

## Guardrails

- Stop on invalid URLs or inaccessible repositories. Do not fabricate metadata.
- Keep exactly three tags. Prefer practical filter tags such as `AI 编程`, `本地模型`, `自动化`, `开发工具`, `Agent`, `知识管理`, `CLI`, `工作流`.
- Do not write `## GitHub 仓库预览` in MDX body.
- `## 如何使用` must not be a single “read the README” paragraph.
- Do not deploy or open a PR unless the user explicitly asks.
- Preserve existing slugs when refreshing content. The slug is the repository name unless the user requests otherwise.
- If README content is sparse, keep sections shorter and note review follow-ups.
- Do not copy `description` into `curationReason`; the list card shows only `description`.
- `curationReason` is indexed for `/github/` search but not rendered on list cards.

## Script Reference

`scripts/create_github_project_mdx.py`

- Accepts a GitHub repository URL
- Reads GitHub REST API metadata and README
- Writes snapshot frontmatter (`repoDescription`, `avatarUrl`, `forks`, `openIssues`, `contributors`)
- Writes `src/content/github/<repo>.mdx` with new section scaffolds
- Supports `--dry-run`, `--output-root`, and optional `--token`

After generation, treat the script output as a scaffold. The final entry should read like curated editorial content, not raw API dump.
