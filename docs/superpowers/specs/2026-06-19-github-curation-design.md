# GitHub Curation Design

Date: 2026-06-19
Status: Approved for implementation planning
Owner: Codex

## Goal

Build a polished GitHub project curation section for the existing Astro + Starlight homepage. The section should present high-quality GitHub repositories, focused first on AI and developer productivity, with search, tag filtering, project detail pages, and a repeatable Codex Skill workflow for turning a GitHub repository URL into publishable MDX content.

## Scope

In scope:

- Add a new site section named `开源琅嬛阁` at `/github/`.
- Create a static content collection for curated GitHub projects.
- Show a searchable, filterable list of project cards.
- Give every project its own MDX detail page.
- Include at least these detail sections: project introduction, GitHub repository preview, user value, suitable audience, and usage.
- Seed the first version with 6-10 real AI and developer productivity repositories.
- Create a local Codex Skill that can generate a new project MDX entry from a GitHub repository URL.
- Improve local UI consistency where directly needed by the new section.

Out of scope:

- Runtime database, admin panel, or CMS integration.
- Live GitHub API calls from the deployed site.
- User accounts, bookmarking, voting, comments, or analytics dashboards.
- Full-site redesign beyond targeted polish needed for consistency.

## Recommended Approach

Use an Astro content collection plus Svelte interaction islands.

Each curated repository is stored as one MDX file under `src/content/github/`. The `/github/` index page reads the collection at build time and passes normalized project data to a Svelte component for client-side search and tag filtering. Detail pages are generated statically from the same collection and render the MDX body with Starlight's reading experience.

This approach keeps the site static, SEO-friendly, and easy to update. It also gives the future Skill a clear output target: create or update one well-structured MDX file.

## Information Architecture

Pages:

- `/github/`: the curation list and filters.
- `/github/<slug>/`: one project detail page per repository.

Navigation:

- Add `开源琅嬛阁` as a visible route from the homepage experience.
- Keep the route compatible with Starlight's generated content navigation.

Naming:

- Section title: `开源琅嬛阁`
- Route: `/github/`
- Content collection: `github`

## Content Model

Each MDX entry uses frontmatter shaped for display, filtering, SEO, and Skill generation.

Required fields:

- `title`: display name of the project.
- `description`: concise Chinese summary.
- `repo`: GitHub repository URL.
- `homepage`: optional official site or docs URL.
- `tags`: exactly three Chinese tags.
- `language`: primary programming language.
- `stars`: repository star count captured at content-generation time.
- `license`: license name or `Unknown`.
- `featured`: boolean for ordering.
- `publishedAt`: ISO date string for first publication.
- `updatedAt`: ISO date string for last content refresh.
- `curationReason`: concise reason this project is worth including.

Required body sections:

- `## 项目介绍`
- `## GitHub 仓库预览`
- `## 对用户价值`
- `## 适应人群`
- `## 如何使用`

The `tags` field must always contain exactly three items. Tags should be useful for filtering rather than decorative, such as `AI 编程`, `本地模型`, `自动化`, `开发工具`, `Agent`, `知识管理`, `CLI`, `工作流`.

## First Content Batch

The first batch should include 6-10 real repositories in the AI and developer productivity direction. Final selection can be adjusted during implementation, but the seed set should cover several practical use cases:

- AI coding or agentic development.
- Local AI or model orchestration.
- Workflow automation.
- Developer documentation or knowledge workflows.
- CLI or terminal productivity.

The batch must be diverse enough to validate filtering, search, card metadata, detail-page copy, and tag design.

## List Page Design

The `/github/` page should feel like a curated library rather than a plain link dump.

Top section:

- Title: `开源琅嬛阁`
- Subtitle: explain that the section collects AI and developer productivity open-source projects.
- A compact stats row can show total projects and tag count if it does not crowd the layout.

Toolbar:

- Search input for project title, description, tags, language, and repository owner/name.
- Tag filter controls.
- Result count.
- Clear filters action when a search or tag filter is active.

Cards:

- Project title.
- Description.
- Exactly three visible tags.
- Stars, primary language, and license.
- Curation reason, kept short.
- Primary action to open the detail page.
- Secondary action to open GitHub in a new tab.

States:

- Empty state for no matching results.
- Responsive layout for mobile, tablet, and desktop.
- Light and dark theme support.

Visual direction:

- Reuse the existing site's blue, green, and soft gradient language.
- Keep the design more refined than the existing simple link cards.
- Avoid a marketing landing-page feel; this is a working collection page.
- Use restrained shadows, compact metadata, and readable spacing.

## Detail Page Design

Each detail page opens with a repository preview card inspired by social link previews:

- Repository title.
- `owner/repo`.
- GitHub description.
- Stars, language, license.
- Link to GitHub.
- Optional homepage/docs link when available.

Below the preview, render the MDX body sections in a consistent order:

- Project introduction.
- GitHub repository preview.
- User value.
- Suitable audience.
- Usage.

The detail page should keep Starlight's reading affordances, including Markdown styles, headings, code blocks, and dark mode support.

## Components

Likely new or updated units:

- `GithubProjectExplorer.svelte`: client-side search, tag filtering, result count, empty state, and cards.
- `GithubProjectCard.svelte` or an internal card subcomponent: one project item in the grid.
- `GithubRepoPreview.astro`: static preview block used by detail pages and, if useful, MDX.
- `/github/` index page: reads the collection and renders the explorer.
- `/github/[slug].astro` or equivalent static route: renders one detail page.
- Content collection schema in `src/content/config.ts`.

Boundaries:

- Astro owns content loading and static routing.
- Svelte owns client-side interactions on the list page.
- MDX owns long-form project copy.
- The Skill owns future content generation, not runtime rendering.

## Data Flow

1. A project MDX file is added under `src/content/github/`.
2. Astro validates the file against the `github` collection schema.
3. The `/github/` page loads all entries with `getCollection('github')`.
4. Entries are sorted by `featured`, then `publishedAt` or `updatedAt`.
5. The list page serializes card-safe data to the Svelte explorer.
6. The browser performs local search and tag filtering.
7. Detail pages are statically generated from the same collection.

No deployed page should depend on live GitHub API availability.

## Skill Workflow

Create a local Codex Skill, tentatively named `github-project-curator`.

When the user provides a GitHub repository URL, the Skill should:

1. Normalize and validate the GitHub URL.
2. Read repository metadata from GitHub, including description, README, topics, primary language, stars, license, homepage, and repository owner/name.
3. Prefer official repository sources and docs.
4. Generate exactly three Chinese tags.
5. Write a concise Chinese MDX entry with the required frontmatter and body sections.
6. Keep claims grounded in repository content; make uncertainty explicit when repository information is thin.
7. Run project validation, at least content schema validation and site build checks when practical.
8. Report the generated file path and any follow-up manual review notes.

The Skill should not publish automatically unless the user explicitly asks for deployment or version release.

## Error Handling

Content errors:

- Missing required frontmatter should fail schema validation.
- More or fewer than three tags should fail schema validation.
- Missing GitHub URL should fail schema validation.

UI errors:

- Empty result sets show a calm no-results state and a clear-filter action.
- Missing optional homepage links are simply omitted.
- Unknown license or language displays `Unknown` instead of breaking layout.

Skill errors:

- Invalid URL: stop and ask for a valid GitHub repository URL.
- Repository inaccessible: report the access issue and do not invent content.
- Sparse README: generate a shorter entry and mark low-confidence areas for review.

## Testing And Verification

Required verification after implementation:

- Run `pnpm build` or, if blocked, at least `pnpm astro check`.
- Verify `/github/` renders seeded projects.
- Verify search matches title, description, tag, language, and owner/repo.
- Verify tag filtering and clear filters.
- Verify the no-results state.
- Verify at least one detail page renders all required sections.
- Verify GitHub external links open in a new tab with safe `rel` attributes.
- Inspect mobile and desktop layouts.
- Inspect light and dark themes.
- Confirm the new Skill can generate one valid MDX file from a repository URL.

## Accessibility And SEO

Accessibility:

- Search input must have an accessible label.
- Tag filters must be keyboard operable.
- Buttons and links must have clear names.
- Color should not be the only way to communicate selected state.

SEO:

- `/github/` should have title, description, canonical URL, and useful metadata.
- Each detail page should derive SEO metadata from frontmatter.
- Detail pages should remain crawlable static HTML.

## Implementation Notes

- Keep edits scoped to the GitHub curation section and nearby style consistency.
- Do not migrate existing `src/configs/*.ts` navigation content into the new collection.
- Do not enable Pagefind as part of this first version; local collection search is enough.
- Preserve the existing homepage personality while improving polish where the new section touches shared UI.
- Avoid adding a new design system or large UI dependency.

## Acceptance Criteria

- `/github/` exists and shows a polished, responsive, searchable, filterable project list.
- Each list item shows title, description, exactly three tags, stars, language, and license.
- Each project has a detail page with the required content sections.
- The first batch contains 6-10 real AI and developer productivity repositories.
- The content model is documented and schema-validated.
- A local Codex Skill exists for generating project MDX from a GitHub repository URL.
- The site builds successfully after the new section and seeded content are added.
