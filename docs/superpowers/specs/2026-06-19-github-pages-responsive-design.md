# GitHub Pages Responsive Redesign

Date: 2026-06-19
Status: Approved
Owner: Codex

## Goal

Redesign the `/github/` list and `/github/[slug]/` detail pages with a componentized layout (Approach B): wider list canvas, balanced project cards, sticky search with horizontally scrollable tag filters, and a wide preview card with narrow MDX reading column on detail pages.

## Decisions

| Topic | Choice |
|-------|--------|
| Scope | Full chain: header, filters, cards, empty state, detail preview |
| Card density | Balanced: keep metadata + short curation reason; GitHub action as secondary icon button |
| List width | `max-w-6xl` centered, `not-content` |
| Filters | Full-width sticky search; horizontally scrollable tag chips |
| Detail width | Wide preview card; `max-w-3xl` centered MDX body |
| Grid | 1 col mobile, 2 col `md`, 3 col `lg` |

## Component Architecture

- `GithubPageShell.astro` — width wrapper (`max-w-6xl` or `max-w-3xl`)
- `GithubProjectExplorer.svelte` — list page state and layout orchestration
- `GithubFilterBar.svelte` — search, tag chips, result count
- `GithubProjectCard.svelte` — single list card
- `GithubEmptyState.svelte` — no-results state
- `GithubRepoPreview.astro` — detail preview (aligned with card visual language)
- `src/lib/github-ui.ts` — shared shadow classes and tag button styles

## Responsive Grid

| Breakpoint | Columns | Tailwind |
|------------|---------|----------|
| `< 768px` | 1 | `grid-cols-1` |
| `768px – 1023px` | 2 | `md:grid-cols-2` |
| `≥ 1024px` | 3 | `lg:grid-cols-3` |

Gap: `gap-4 md:gap-5 lg:gap-6`

## Verification

- Three breakpoint column counts render correctly
- Cards equal height in grid rows
- Tag row scrolls on narrow viewports
- Detail preview wide, MDX body narrow
- Light and dark themes consistent
- `pnpm build` passes
