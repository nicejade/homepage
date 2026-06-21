# GitHub List Sort Design

Date: 2026-06-21
Status: Approved for implementation
Owner: Codex

## Goal

Add user-selectable sorting to `/github/` with **Stars descending** as the default. Remove `featured` from sort logic while keeping the existing「精选」badge on cards.

## Decisions Summary

| Topic | Choice |
|-------|--------|
| Default sort | Stars descending |
| Sort options | Stars, title A→Z, publishedAt descending (3 total) |
| `featured` | Not used in sort; card badge unchanged |
| Tiebreaker | `title` ascending |
| URL state | `?sort=stars\|title\|published`; omit when default (`stars`) |
| Sort change | Reset to page 1; keep search and tag filters |
| Implementation | Pure `sortGithubProjects()` in `github-curation.ts` (Approach 1) |

## Scope

In scope:

- `sortGithubProjects()` and `parseGithubSortParam()` in `src/lib/github-curation.ts`
- Sort UI in `GithubFilterBar.svelte`
- Pipeline `filter → sort → paginate` in `GithubProjectExplorer.svelte`
- URL read/write for `sort` alongside `tag` and `page`
- Build-time default Stars sort in `index.astro`
- Unit tests for sort logic

Out of scope:

- `updatedAt` sort option
- `featured` pinning or「仅看精选」filter
- Ascending/descending toggle per field

## Architecture

```
getCollection('github')
  → normalizeGithubProject()
  → sortGithubProjects(projects, 'stars')   // SSR default
  → GithubProjectExplorer
       ├─ filterGithubProjects()
       ├─ sortGithubProjects(filtered, sort)
       ├─ paginateGithubProjects()
       └─ URL sync: tag + sort + page
```

## Sort Rules

| URL `sort` | Label | Rule |
|------------|-------|------|
| *(omit)* / `stars` | 最多 Star | `stars` desc, then `title` asc |
| `title` | 标题 A→Z | `title` asc |
| `published` | 最新收录 | `publishedAt` desc, then `title` asc |

Invalid `sort` values fall back to `stars`.

## URL Examples

```
/github/
/github/?sort=title
/github/?sort=published&tag=AI
/github/?sort=published&page=2
```

## UI

- Segmented pills on `sm+` in the filter bar results row (right side)
- Native `<select>` on narrow viewports
- Switching sort resets pagination to page 1

## Testing

- Each sort direction orders correctly
- Stars tiebreaker uses title
- `parseGithubSortParam()` handles invalid input
