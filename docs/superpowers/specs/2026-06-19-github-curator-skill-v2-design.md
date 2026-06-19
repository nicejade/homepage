# GitHub Project Curator Skill v2 Design

Date: 2026-06-19
Status: Approved
Owner: Codex

## Goal

Upgrade the `github-project-curator` Skill and the 开源琅嬛阁 GitHub section so curated projects feel like rich X/Twitter link previews—not plain text summaries. Visitors who do not know a repository should quickly understand its value, see live community signals, and find actionable usage steps.

## Decisions Summary

| Dimension | Choice |
|-----------|--------|
| Preview style | X-style social card (owner/repo, English description, avatar, stats row) |
| Card copy | Faithful to GitHub: English description + official avatar on card; Chinese editorial copy in MDX body below |
| Stars refresh | Detail page: live via client GitHub API; list page: compressed static snapshot (`45k+`) |
| Usage section | Structured steps: prerequisites → install → first run → verify → pitfalls |
| Quick value | New MDX sections: `## 核心特性`, `## 与替代方案` |

## Recommended Approach

**Approach 1: Component-rendered X card + client fetch on detail page**

- Detail page uses a Svelte island (`GithubSocialCard.svelte`) for the X-style preview.
- On mount, fetch `GET https://api.github.com/repos/{owner}/{repo}` to refresh stars (and optionally forks / open issues).
- List cards keep using frontmatter snapshots with compact star formatting.
- The Skill focuses on richer MDX generation and frontmatter snapshots for fallback.

Rejected alternatives:

- **Approach 2 (build-time only):** Does not satisfy live stars requirement.
- **Approach 3 (oEmbed / OG embed):** Too little control over X-style stats row and Chinese editorial layout.

## Scope

In scope:

- Upgrade preview UI on detail pages to X-style social card.
- Add live stars on detail preview with frontmatter fallback.
- Add compact star display on list cards (`45k+`).
- Extend content schema with optional GitHub snapshot fields.
- Expand MDX body structure and Skill generation rules.
- Update `create_github_project_mdx.py` to populate new fields and section scaffolds.
- Update `SKILL.md` and `agents/openai.yaml`.

Out of scope:

- Admin panel, CMS, or database.
- Live refresh of all stats on the list page (rate-limit risk).
- Full-site redesign beyond GitHub curation components.
- Automated PR deployment or scheduled global metadata refresh jobs.

## Preview Component Design

### Detail page: `GithubSocialCard.svelte`

Replace or supersede the current `GithubRepoPreview.astro` block with an X-inspired card:

```
┌─────────────────────────────────────────────┐
│ usebruno/bruno                    [avatar]  │
│ Opensource IDE For Exploring...  (English)  │
│ 👥 451  ● 1k  💬 —  ⭐ 45,234  ⑂ 3k   [GH] │
│ github.com · usebruno/bruno                 │
└─────────────────────────────────────────────┘
```

Layout rules:

- **Top row:** `owner/repo` (mono), repository avatar (rounded), GitHub English description.
- **Stats row:** contributors (snapshot or approximate), open issues, stars (live on detail), forks, small GitHub icon link.
- **Footer strip:** `github.com · owner/repo` (muted bar, X-like).
- **Actions:** optional homepage/docs + GitHub buttons below or beside the card, matching existing `github-ui` tokens.

Data sources:

| Field | Primary | Fallback |
|-------|---------|----------|
| English description | Client API `description` | `repoDescription` frontmatter |
| Avatar | Client API `owner.avatar_url` | `avatarUrl` frontmatter |
| Stars | Client API `stargazers_count` | `stars` frontmatter |
| Forks | Client API `forks_count` | `forks` frontmatter |
| Open issues | Client API `open_issues_count` | `openIssues` frontmatter |
| Contributors | Snapshot at generation time | Omit or show `—` if unavailable |

Discussions count is omitted unless cheap to source; do not block v2 on it.

Styling:

- Reuse `GITHUB_SURFACE`, `GITHUB_CARD_SHADOW`, and existing button/tag utilities from `src/lib/github-ui.ts`.
- Light/dark mode, reduced-motion, and accessible link labels.

### List page: `GithubProjectCard.svelte`

- Keep current card layout.
- Change star display to compact format via `formatGithubStarsCompact(stars)` → e.g. `45234` → `45k+`, `1200` → `1.2k+`.
- No client-side GitHub API calls on the list page.

### MDX body change

Remove `## GitHub 仓库预览` from required MDX sections. The visual preview is rendered by the component above the MDX body. Duplicating it in Markdown adds noise and drifts from the X card.

## Live Stars Architecture

### Detail page flow

1. Astro renders static HTML with frontmatter snapshot values (SEO-friendly, instant paint).
2. Svelte island mounts and calls `fetchLiveRepoStats(owner, repo)` in `src/lib/github-live-stats.ts`.
3. On success, update stars (and other stats if returned) in the card UI.
4. On failure (network, 403, rate limit), keep snapshot values; do not show a broken state.

### Rate limits

- Unauthenticated GitHub API: 60 requests/hour per IP.
- One request per detail page view is acceptable.
- List page does not call the API.

### CORS

- Use browser `fetch` to `https://api.github.com/repos/{owner}/{repo}`.
- If CORS fails in production, document fallback to snapshot-only and consider a future proxy endpoint (out of v2 scope unless blocking).

### Formatting helpers (`src/lib/github-ui.ts`)

- `formatGithubStars(n)` — existing exact format for detail (`45,234`).
- `formatGithubStarsCompact(n)` — list format (`45k+`, `1.2k+`, `<1k+` for small repos).

## Content Model

### Frontmatter schema (`src/content/config.ts`)

Existing required fields unchanged. Add optional snapshot fields:

```ts
repoDescription: z.string().optional(),  // GitHub English description
avatarUrl: z.string().url().optional(),
forks: z.number().int().nonnegative().optional(),
openIssues: z.number().int().nonnegative().optional(),
contributors: z.number().int().nonnegative().optional(),
```

- `description` remains the **Chinese summary** for SEO, list cards, and Open Graph.
- `stars` remains the build-time snapshot used for list compact display and detail fallback.

### MDX body sections (new order)

1. `## 项目介绍` — 2–3 sentences: what it is, who it helps, one-line positioning.
2. `## 核心特性` — 3–5 bullets grounded in README/features.
3. `## 对用户价值` — concrete problems solved; avoid marketing fluff.
4. `## 与替代方案` — compare to 1–3 common alternatives (e.g. Postman, Insomnia) or state boundaries when no direct competitor exists.
5. `## 适应人群` — 3 bullet personas.
6. `## 如何使用` — fixed substructure:
   - **前置条件**
   - **安装方式** (include real install commands when README provides them)
   - **首次运行**
   - **验证是否成功**
   - **常见坑 / 注意事项**

## Skill Workflow Updates

### `SKILL.md`

Document that:

1. Visual preview is **not** written in MDX; the site component renders the X card.
2. The Skill must produce Chinese editorial sections plus frontmatter snapshots for fallback.
3. `## 如何使用` must follow the five-part structure; generic “read the README” alone is insufficient.
4. `## 与替代方案` must be grounded in official positioning; mark uncertainty when README is thin.
5. After generation, the agent polishes Chinese copy and flags low-confidence sections.

### Generation workflow

1. Normalize GitHub URL.
2. Run `create_github_project_mdx.py` (or `--dry-run` first).
3. Script fetches repo metadata + README and writes:
   - frontmatter snapshots (`repoDescription`, `avatarUrl`, `forks`, `openIssues`, `contributors` when available)
   - MDX scaffolds for all required sections
4. Agent reviews and improves Chinese copy; verifies install commands against README.
5. Validate: `pnpm astro check` and `pnpm build`.
6. Report: file path, tag rationale, low-confidence sections, validation results.

### Script updates (`create_github_project_mdx.py`)

- Persist `repoDescription` from API `description`.
- Persist `avatarUrl` from `owner.avatar_url`.
- Persist `forks`, `openIssues` from repo payload.
- Optionally fetch contributor count (best-effort; skip on failure).
- Extract README install snippets for `## 如何使用` draft.
- Generate scaffolds for `## 核心特性` and `## 与替代方案` from README headings/topics.
- Stop emitting `## GitHub 仓库预览` in generated body.

### `agents/openai.yaml`

Update `default_prompt` to mention X-style preview, structured usage, and new sections.

## Component Boundaries

| Unit | Responsibility |
|------|----------------|
| `GithubSocialCard.svelte` | X-style card UI + client live stats on detail |
| `GithubProjectCard.svelte` | List card + compact stars |
| `github-live-stats.ts` | Fetch + normalize GitHub repo API response |
| `github-ui.ts` | Shared styles + star formatters |
| `create_github_project_mdx.py` | Snapshot metadata + MDX scaffold |
| `SKILL.md` | Editorial rules and workflow for agents |

## Error Handling

- Invalid GitHub URL: stop; do not fabricate metadata.
- Inaccessible repo: report error; no MDX write.
- Sparse README: shorter sections; explicit “需人工补充” notes in agent report.
- Live API failure on detail: silent fallback to frontmatter; no user-facing error banner.
- Missing optional frontmatter on old entries: component uses `Unknown` / omits stat gracefully.

## Testing And Verification

- Unit tests for `formatGithubStarsCompact` and `normalizeRepoStats` response mapping.
- Build passes with updated schema and at least one migrated sample MDX entry.
- Detail page: stars update when API succeeds; snapshot shown when API blocked.
- List page: displays compact stars only.
- Skill dry-run generates valid MDX without `## GitHub 仓库预览`.
- Light/dark mode and mobile layout for the new card.

## Migration

- Update existing `src/content/github/*.mdx` entries incrementally:
  - Remove `## GitHub 仓库预览` section text.
  - Add `## 核心特性` and `## 与替代方案` where missing.
  - Expand `## 如何使用` to five-part structure.
  - Backfill optional frontmatter via script re-run or manual pass.
- Prioritize featured or high-traffic entries first; others can fall back with partial snapshots.

## Acceptance Criteria

- Detail pages show an X-style social card with English GitHub description and avatar.
- Detail page stars refresh client-side when GitHub API is reachable.
- List cards show compact star format from frontmatter without API calls.
- Skill documents new section requirements and updated workflow.
- Generator script outputs new frontmatter fields and section scaffolds.
- MDX schema validates; site builds successfully.
- A unfamiliar reader can understand project value from 项目介绍 + 核心特性 + 与替代方案 + structured 如何使用 without opening GitHub first.
