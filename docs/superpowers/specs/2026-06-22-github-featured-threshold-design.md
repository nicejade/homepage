# GitHub Featured Threshold Design

Date: 2026-06-22
Status: Approved for implementation planning
Owner: Codex

## Goal

Replace manual「精选」curation with a deterministic star-threshold rule. Existing six hand-picked featured entries are retired; `featured` in MDX frontmatter is set automatically from the stored `stars` snapshot when entries are created, refreshed, or batch-migrated.

## Decisions Summary

| Topic | Choice |
|-------|--------|
| Featured threshold | `stars >= 100_000` → `featured: true` |
| Below threshold | `featured: false` (regular 琅嬛阁 entry, e.g. Arya at ~3.7K) |
| Storage | Write `featured` to MDX frontmatter (not computed at runtime) |
| Manual override | None; exceptions require direct frontmatter edits (discouraged) |
| Former 1M ask rule | Removed; 100K is the sole rule |
| Shared constant | `GITHUB_FEATURED_STAR_THRESHOLD` in `github-curation.ts` |
| Runtime behavior | `normalizeGithubProject` reads frontmatter as-is; no override |

## Featured Rule

```
featured = stars >= 100_000
```

- `stars` is the integer snapshot in frontmatter at generation or refresh time.
- Detail-page live star refresh does not change `featured`; only MDX updates do.

## Impact on Former Manual Featured Six

| Slug | Stars (snapshot) | Was featured | New featured |
|------|------------------|--------------|--------------|
| ollama | 174,528 | true | true |
| dify | 145,825 | true | true |
| open-webui | 142,246 | true | true |
| langchain | 139,697 | true | true |
| cline | 63,531 | true | **false** |
| continue | 34,117 | true | **false** |

Additionally, ~16 entries currently `featured: false` but with `stars >= 100_000` will become featured (e.g. react, n8n, claude-code, openclaw). Total featured count after migration: ~22.

## Scope

In scope:

- `GITHUB_FEATURED_STAR_THRESHOLD` and `isGithubFeatured(stars)` in `src/lib/github-curation.ts`
- Unit tests for threshold boundary (99,999 / 100,000 / 100,001)
- `create_github_project_mdx.py`: set `featured` from stars on generate
- `.codex/skills/github-project-curator/SKILL.md`: document threshold rule; refresh workflow updates `featured` when stars snapshot changes
- One-time batch update of all `src/content/github/*.mdx` `featured` values from existing `stars`

Out of scope:

- Runtime featured computation from live GitHub API
-「仅看精选」filter or featured-based sort (sort already ignores featured per 2026-06-21 design)
- Per-repo manual approval for 1M+ stars
- Featured badge UI changes
- Scheduled star-refresh automation

## Architecture

```
GitHub API (curator script)
  → stars snapshot in MDX frontmatter
  → featured = isGithubFeatured(stars)   // written at generate/refresh/migrate
  → normalizeGithubProject() reads featured from frontmatter
  → GithubProjectCard shows「精选」badge when featured === true
```

Curator script mirrors the TS constant (`100_000`) in Python; tests in `github-curation.test.ts` lock the threshold.

## Migration

1. For each `src/content/github/*.mdx`, read `stars` from frontmatter.
2. Set `featured: true` if `stars >= 100_000`, else `featured: false`.
3. Do not modify other frontmatter fields or body content.

## Curator Skill Changes

Replace step「Choose `featured` intentionally. New entries default to `false`.」with:

- On **create**: `featured: true` when `stars >= 100_000`, else `false`.
- On **refresh**: recompute `featured` whenever the `stars` snapshot is updated.
- Agent must not set `featured` by editorial judgment.

## Testing

- `isGithubFeatured(99_999)` → `false`
- `isGithubFeatured(100_000)` → `true`
- `isGithubFeatured(100_001)` → `true`
- After migration: count of `featured: true` in `src/content/github/` matches entries with `stars >= 100_000`

## Verification

```bash
pnpm test tests/github-curation.test.ts
pnpm astro check
pnpm build
```
