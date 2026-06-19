# GitHub Curator Card Simplify Design

Date: 2026-06-19
Status: Approved
Owner: Codex

## Goal

Make `/github/` list cards visually concise by showing a single description line, while preserving search discoverability through a repurposed `curationReason` field. Update the `github-project-curator` Skill and generator script so new entries do not produce redundant copy.

## Decisions Summary

| Dimension | Choice |
|-----------|--------|
| Scope | Skill + list card UI (no schema change) |
| Card visible copy | `description` only |
| `curationReason` | Required in frontmatter; search-only; not rendered on cards |
| Description style | One sentence, ≤80 Chinese characters, answers "what is this?" |
| `curationReason` style | One sentence, ≤100 Chinese characters; audience, scenario, or search keywords; must not repeat `description` |
| Card layout | Keep `line-clamp-2` on `description`; remove gray highlight box |
| Detail page | Unchanged (`repoDescription` on `GithubSocialCard`) |
| Existing MDX | No mandatory bulk rewrite in this change |

## Recommended Approach

**Approach 1: Remove card UI for `curationReason` + rewrite Skill copy rules + fix generator**

Rejected alternatives:

- **Approach 2 (single-line card):** `line-clamp-1` and ≤48 characters is too aggressive; truncates useful positioning copy.
- **Approach 3 (schema max length):** Requires migrating all existing entries before build passes; unnecessary for this scope.

## Card UI

### Current behavior

`GithubProjectCard.svelte` renders:

1. `owner/repo`, `title`
2. `description` (plain text under title)
3. tags, stats row
4. `curationReason` (gray rounded box)
5. action buttons

The generator often copies `description` into `curationReason`, making both blocks read nearly the same.

### New behavior

Remove the `curationReason` render block from `GithubProjectCard.svelte`.

Card information hierarchy:

```
owner/repo
title
description          ← only visible editorial copy
tags
stars · language · license
[查看详情] [GitHub]
```

`curationReason` remains on the `GithubProject` type and continues to flow into `GithubProjectExplorer` search matching (`filterGithubProjects` in `github-curation.ts`). It is not displayed anywhere in the list UI.

No change to detail pages: `description` still powers page meta/OG; `GithubSocialCard` still uses `repoDescription`.

## Content Model

No schema changes in `src/content/config.ts`. Both fields stay required:

- `description: z.string()`
- `curationReason: z.string()`

### Field semantics (Skill + editorial)

| Field | Surfaces | Writing rule |
|-------|----------|--------------|
| `description` | List card, detail SEO (`<title>` meta, OG), search | One sentence, ≤80 chars, Chinese, answers **what the project is** |
| `curationReason` | Search only | One sentence, ≤100 chars, answers **who should care / which scenarios**; must use a different angle than `description`; may include filter-friendly phrases (e.g. 终端工作流, 本地模型, 团队规则) |
| `repoDescription` | Detail social card fallback | GitHub English tagline from API; unchanged |

### Examples

**aider**

- `description`: 在终端里与大模型结对编程的开源 CLI，支持代码库地图与 Git diff 审查。
- `curationReason`: 适合偏好终端与 Git 审查流程的开发者；关注开源模型接入与可控 diff。

**ollama**

- `description`: 在本机快速下载、运行和管理大语言模型的命令行与服务工具。
- `curationReason`: 本地模型入门基础设施；自托管、离线试用、模型切换场景。

## Skill Updates (`SKILL.md`)

### Required Output Shape — frontmatter section

Replace the current undifferentiated listing with explicit roles:

- `description` — Chinese one-liner for list card and SEO (≤80 chars, "what is this")
- `curationReason` — Required search-only curation note (≤100 chars, audience/scenario/keywords; do not duplicate `description`)

### Workflow step 3 additions

After polishing generated MDX:

- Rewrite `description` as a tight positioning sentence for the card.
- Write `curationReason` from a different angle (persona, use case, or search phrases).
- Verify the two fields are not paraphrases of each other.

### Guardrails additions

- Do not write `curationReason` as a copy of `description`.
- Keep `description` within ~80 Chinese characters so `line-clamp-2` cards stay scannable.

## Generator Script Updates

File: `.codex/skills/github-project-curator/scripts/create_github_project_mdx.py`

### `build_chinese_description()`

Keep producing a short Chinese positioning line from README summary or English description. Target ≤80 characters when possible.

### `build_curation_reason()`

**Stop copying `description`.** New logic:

1. Prefer audience/scenario phrases derived from assigned tags and README themes.
2. Fallback template: `适合关注 {tag1}、{tag2} 场景的开发者与团队。`
3. Hard cap at 100 characters with ellipsis if needed.

### Post-generation note in Skill report

Flag entries where `curationReason` still overlaps `description` after generation so the human review step can fix them.

## Files to Change

| File | Change |
|------|--------|
| `src/components/GithubProjectCard.svelte` | Remove `curationReason` block |
| `.codex/skills/github-project-curator/SKILL.md` | Field semantics, workflow, guardrails |
| `.codex/skills/github-project-curator/scripts/create_github_project_mdx.py` | Separate `build_curation_reason()` logic |
| `tests/github-curation.test.ts` | Assert card-related types still pass; search still matches `curationReason` |
| `docs/superpowers/specs/2026-06-19-github-pages-responsive-design.md` | Update "Card density" row to reflect single visible copy line (optional note) |

Out of scope for implementation plan unless user requests:

- Bulk rewrite of existing `src/content/github/*.mdx` `curationReason` values
- Schema `.max()` validation
- Detail page surfacing of `curationReason`

## Acceptance Criteria

- List cards show exactly one description block (`description`); no gray `curationReason` box.
- Searching `/github/` still matches text present only in `curationReason`.
- `github-project-curator` Skill documents distinct rules for both fields.
- Generator produces non-duplicative scaffold values for new repos.
- `pnpm astro check` and `pnpm build` pass.
- Existing MDX files validate without mandatory content edits.

## Verification

```bash
pnpm astro check
pnpm build
pnpm test tests/github-curation.test.ts
```

Manual:

- Open `/github/` and confirm cards have one text block under the title.
- Search for a phrase that appears only in a project's `curationReason` and confirm the project appears.
