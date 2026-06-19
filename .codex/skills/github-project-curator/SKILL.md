---
name: github-project-curator
description: Generate and validate GitHub 珍藏 MDX entries for the Astro homepage from a GitHub repository URL. Use when adding or refreshing curated projects under src/content/github/, turning a repo link into schema-valid frontmatter and required Chinese body sections.
---

# GitHub Project Curator

## Overview

Turn a GitHub repository URL into one publishable MDX file for the site's `GitHub 珍藏` section. The workflow fetches official repository metadata, drafts grounded Chinese copy, writes `src/content/github/<repo>.mdx`, and validates the result against the site schema.

## When To Use

- The user shares a GitHub repository URL and wants it added to `/github/`.
- An existing curated entry needs refreshed stars, dates, or copy grounded in current README content.
- You need a repeatable starting point before polishing curation language by hand.

## Required Output Shape

Each entry must satisfy `src/content/config.ts`:

- Frontmatter: `title`, `description`, `repo`, optional `homepage`, exactly three Chinese `tags`, `language`, `stars`, `license`, `featured`, `publishedAt`, `updatedAt`, `curationReason`
- Body sections, in order:
  - `## 项目介绍`
  - `## GitHub 仓库预览`
  - `## 对用户价值`
  - `## 适应人群`
  - `## 如何使用`

Read `docs/superpowers/specs/2026-06-19-github-curation-design.md` when you need the full product rules.

## Workflow

1. Normalize the repository URL to `https://github.com/<owner>/<repo>`.
2. Run the generator script from the site root:

```bash
python3 .codex/skills/github-project-curator/scripts/create_github_project_mdx.py <github-repo-url>
```

Use `--dry-run` to inspect output without writing a file.

3. Review the generated MDX. Improve Chinese copy so claims stay grounded in README, topics, docs, and license information. Mark uncertainty instead of inventing features.
4. Choose `featured` intentionally. New entries default to `false`.
5. Validate the site:

```bash
pnpm astro check
pnpm build
```

6. Report:
   - output file path
   - chosen tags and why they fit filtering
   - any low-confidence sections that need manual review
   - validation command results

## Guardrails

- Stop on invalid URLs or inaccessible repositories. Do not fabricate metadata.
- Keep exactly three tags. Prefer practical filter tags such as `AI 编程`, `本地模型`, `自动化`, `开发工具`, `Agent`, `知识管理`, `CLI`, `工作流`.
- Do not deploy or open a PR unless the user explicitly asks.
- Preserve existing slugs when refreshing content. The slug is the repository name unless the user requests otherwise.
- If README content is sparse, keep sections shorter and note review follow-ups.

## Script Reference

`scripts/create_github_project_mdx.py`

- Accepts a GitHub repository URL
- Reads GitHub REST API metadata and README
- Writes `src/content/github/<repo>.mdx`
- Supports `--dry-run`, `--output-root`, and optional `--token`

After generation, treat the script output as a scaffold. The final entry should read like curated editorial content, not raw API dump.
