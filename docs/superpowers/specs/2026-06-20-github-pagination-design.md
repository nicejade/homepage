# GitHub List Pagination Design

Date: 2026-06-20
Status: Approved for implementation planning
Owner: Codex

## Goal

Add client-side pagination to `/github/` so the project grid shows at most **15 items per page**. The pagination UI must match the existing 开源琅嬛阁 visual language and work correctly with search and tag filtering.

## Decisions Summary

| Topic | Choice |
|-------|--------|
| Page size | Fixed at 15 items |
| Pagination UI | Classic numbered controls (prev / page numbers / next) |
| Result scope | Paginate **filtered** results, not the full collection |
| URL state | Sync `?page=N` via `history.replaceState`; coexists with `?tag=` |
| Filter change | Reset to page 1 and remove `page` from URL |
| Implementation | Client-side slice in Svelte (Approach 1) |
| Scroll on page change | Smooth scroll to grid top; respect `prefers-reduced-motion` |
| Visibility | Hide pagination when `totalPages <= 1` |

## Scope

In scope:

- Paginate the `/github/` list after search and tag filtering
- New `GithubPagination.svelte` component
- Pagination helpers in `src/lib/github-curation.ts`
- URL read/write for `page` parameter alongside existing `tag` sync
- Unit tests for pagination logic
- Light/dark theme and responsive layout

Out of scope:

- Detail page pagination (`/github/[slug]/`)
- Astro static routes such as `/github/page/2/`
- Infinite scroll or "Load more"
- User-configurable page size
- SEO-specific paginated HTML pages (client-only state is sufficient at current scale)

## Recommended Approach

**Approach 1: Client-side slice in `GithubProjectExplorer`**

The index page already loads all projects at build time and passes them to a Svelte island for search and tag filtering. Pagination is applied as a final `slice` on `filteredProjects`. A new `GithubPagination` component renders controls below the card grid.

Rejected alternatives:

- **Approach 2 (Astro static pagination routes):** Conflicts with client-side filtering; requires duplicate pagination logic.
- **Approach 3 (infinite scroll):** Does not match the approved classic numbered UI.

## Architecture

```
getCollection('github')
  → normalizeGithubProject()
  → GithubProjectExplorer
       ├─ filterGithubProjects(query, tag)  → filteredProjects
       ├─ paginateGithubProjects(filtered, page, PAGE_SIZE) → page slice + meta
       └─ render GithubProjectCard[] + GithubPagination
```

Boundaries:

- **Astro** — content loading and static routing (unchanged)
- **Svelte** — search, tag filter, pagination state, URL sync
- **`github-curation.ts`** — pure filter and pagination functions

## Data Model

Add to `src/lib/github-curation.ts`:

```ts
export const GITHUB_PAGE_SIZE = 15;

export type GithubPaginationResult = {
  items: GithubProject[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number; // 1-based inclusive
  endIndex: number;   // 1-based inclusive
};

export function paginateGithubProjects(
  projects: GithubProject[],
  page: number,
  pageSize = GITHUB_PAGE_SIZE,
): GithubPaginationResult;
```

Rules:

- `page` is 1-based
- Invalid or missing page (`< 1`, `NaN`) clamps to `1`
- Page beyond `totalPages` clamps to `totalPages` (minimum `1`)
- Empty `projects` returns `totalPages: 0`, `items: []`, indices `0`

## URL State

| Parameter | Behavior |
|-----------|----------|
| `page` | 1-based page number; omitted when `page === 1` |
| `tag` | Existing tag filter (unchanged) |
| Combined | e.g. `/github/?tag=AI编程&page=2` |

Sync rules:

- On mount: read `page` and `tag` from `URLSearchParams`
- On page change: `replaceState` with updated `page`
- On search or tag change: reset `page` to `1`, delete `page` param
- Use `replaceState` (not `pushState`) to avoid polluting browser history

## UI: `GithubPagination.svelte`

### Layout (approved Option A)

Placed directly below the project grid.

**Desktop (single row):**

- Left: `共 18 个项目 · 第 1–15 项` with `aria-live="polite"`
- Right: `‹` prev · page number buttons · next `›`

**Mobile (stacked):**

- Range text centered on top
- Controls centered below

### Visual style

Reuse existing 开源琅嬛阁 tokens from `src/lib/github-ui.ts`:

- Rounded controls (`rounded-xl` / `rounded-full`)
- Active page: `bg-brand text-white`
- Inactive page: `bg-black/[0.04]` pill, hover darken
- Prev/next: hairline border, disabled state at first/last page
- Optional helper: `githubPaginationButtonClass(active, disabled)` in `github-ui.ts`

### Page number folding

| Total pages | Display |
|-------------|---------|
| ≤ 7 | All page numbers |
| > 7 | `1 … 4 5 6 … N` pattern (current page centered when possible) |

### Accessibility

- Wrapper: `<nav aria-label="分页导航">`
- Current page: `aria-current="page"`
- Disabled prev/next: `aria-disabled="true"`, no click handler
- All controls keyboard-focusable with visible focus ring

### Visibility

Render only when `totalPages > 1`.

## Interaction

1. User lands on `/github/` — page 1, up to 15 cards
2. User clicks page 2 — grid updates, URL becomes `?page=2`, smooth scroll to grid top
3. User filters by tag — results re-filter, page resets to 1, `page` removed from URL
4. User shares `?tag=CLI&page=2` — recipient sees filtered page 2
5. User navigates to invalid page — clamped to valid range

Scroll target: the project grid container (add `id="github-project-grid"` or ref on grid wrapper).

## Files to Change

| File | Change |
|------|--------|
| `src/lib/github-curation.ts` | `GITHUB_PAGE_SIZE`, `paginateGithubProjects()` |
| `src/components/GithubPagination.svelte` | New pagination component |
| `src/lib/github-ui.ts` | Optional pagination button style helper |
| `src/components/GithubProjectExplorer.svelte` | Page state, URL sync, sliced render, pagination mount |
| `tests/github-curation.test.ts` | Tests for pagination edge cases |

## Acceptance Criteria

- With 18 projects and no filters, page 1 shows 15 cards and pagination shows 2 pages
- Page 2 shows the remaining 3 cards
- Search/tag filter paginates only matching results
- Changing search or tag resets to page 1
- `?page=2` persists across refresh
- Pagination hidden when results ≤ 15
- Invalid `page` values clamp safely
- Pagination matches light/dark theme and is usable on mobile
- `pnpm astro check && pnpm build` pass
- Pagination unit tests pass

## Verification

```bash
pnpm astro check
pnpm build
pnpm test tests/github-curation.test.ts
```

Manual:

- Open `/github/` — confirm 15 cards + pagination on page 1
- Click page 2 — confirm 3 cards, URL shows `?page=2`, page scrolls to grid
- Apply a tag filter — confirm page resets, pagination recalculates
- Refresh `?tag=<tag>&page=2` — confirm correct slice
- Toggle dark mode — confirm pagination styling
- Narrow viewport — confirm stacked mobile layout
