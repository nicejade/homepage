# GitHub Curator Card Simplify Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show only `description` on `/github/` list cards while keeping `curationReason` as a required search-only frontmatter field, and update the curator Skill + generator so the two fields are authored with distinct roles.

**Architecture:** One UI deletion in `GithubProjectCard.svelte`; one search-index fix in `github-curation.ts` (today `curationReason` is stored but not searchable). Skill and Python generator get explicit copy rules so new scaffolds do not duplicate `description` into `curationReason`. No schema or MDX bulk migration.

**Tech Stack:** Astro 5, Svelte 5, Node built-in test runner, Python 3 generator script.

**Spec:** `docs/superpowers/specs/2026-06-19-github-curator-card-simplify-design.md`

---

## File Map

| File | Responsibility |
|------|----------------|
| `src/lib/github-curation.ts` | Build `searchText` including `curationReason` |
| `tests/github-curation.test.ts` | Regression: search matches `curationReason`-only phrases |
| `src/components/GithubProjectCard.svelte` | List card; remove gray `curationReason` block |
| `.codex/skills/github-project-curator/scripts/create_github_project_mdx.py` | Separate description vs curation-reason generation |
| `.codex/skills/github-project-curator/SKILL.md` | Document field semantics and review checklist |
| `docs/superpowers/specs/2026-06-19-github-curator-card-simplify-design.md` | Mark spec Approved |
| `docs/superpowers/specs/2026-06-19-github-pages-responsive-design.md` | Update card-density note (one visible copy line) |

---

### Task 1: Make `curationReason` searchable

**Files:**
- Modify: `src/lib/github-curation.ts:82-91`
- Modify: `tests/github-curation.test.ts:44-48`

- [ ] **Step 1: Write the failing test**

Add a new test after the existing search test in `tests/github-curation.test.ts`:

```ts
test('filters by curationReason even when phrase is absent from description', () => {
  const curated = normalizeGithubProject({
    slug: 'continue',
    data: {
      title: 'Continue',
      description: '开源 AI 编程助手',
      repo: 'https://github.com/continuedev/continue',
      tags: ['AI 编程', '开发工具', 'Agent'],
      language: 'TypeScript',
      stars: 28000,
      license: 'Apache-2.0',
      featured: true,
      publishedAt: '2026-06-19',
      updatedAt: '2026-06-19',
      curationReason: '适合需要团队自定义编码代理的 IDE 用户。',
    },
  });

  assert.equal(
    filterGithubProjects([curated], { query: '团队自定义编码代理', selectedTag: '' }).length,
    1
  );
  assert.equal(
    filterGithubProjects([curated], { query: '团队自定义编码代理', selectedTag: '' })[0]?.slug,
    'continue'
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/github-curation.test.ts`

Expected: FAIL — query `团队自定义编码代理` returns 0 matches because `searchText` omits `curationReason`.

- [ ] **Step 3: Add `curationReason` to `searchText`**

In `src/lib/github-curation.ts`, update the `searchText` array inside `normalizeGithubProject`:

```ts
    searchText: [
      project.title,
      project.description,
      project.curationReason,
      project.tags.join(' '),
      project.language,
      project.ownerRepo,
      project.repo,
    ]
      .join(' ')
      .toLocaleLowerCase(),
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test tests/github-curation.test.ts`

Expected: PASS (all tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/github-curation.ts tests/github-curation.test.ts
git commit -m "fix: include curationReason in GitHub project search index"
```

---

### Task 2: Remove `curationReason` from list card UI

**Files:**
- Modify: `src/components/GithubProjectCard.svelte:76-82`

- [ ] **Step 1: Delete the curation reason render block**

Remove this entire block from `GithubProjectCard.svelte`:

```svelte
  {#if project.curationReason}
    <p
      class="line-clamp-2 rounded-xl bg-black/[0.025] px-3.5 py-2.5 text-sm leading-relaxed text-grey dark:bg-white/[0.03] dark:text-gray-400"
    >
      {project.curationReason}
    </p>
  {/if}
```

The card should flow directly from the stats `<dl>` to the action buttons `<div class="mt-auto ...">`.

- [ ] **Step 2: Build to verify no Svelte errors**

Run: `pnpm astro check`

Expected: PASS with no errors in `GithubProjectCard.svelte`.

- [ ] **Step 3: Commit**

```bash
git add src/components/GithubProjectCard.svelte
git commit -m "refactor: show single description on GitHub list cards"
```

---

### Task 3: Fix generator to produce distinct `curationReason`

**Files:**
- Modify: `.codex/skills/github-project-curator/scripts/create_github_project_mdx.py:157-169`
- Modify: `.codex/skills/github-project-curator/scripts/create_github_project_mdx.py:304-305`

- [ ] **Step 1: Cap description length at 80 characters**

Replace `build_chinese_description` with:

```python
def truncate_chinese(text: str, limit: int) -> str:
    text = text.strip()
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def build_chinese_description(title: str, readme_summary: str, english_desc: str) -> str:
    if readme_summary:
        return truncate_chinese(readme_summary, 80)
    if english_desc:
        return truncate_chinese(f"{title} 开源项目（请润色为中文摘要）。", 80)
    return truncate_chinese(f"{title} 是值得纳入开源琅嬛阁的开源项目。", 80)
```

- [ ] **Step 2: Rewrite `build_curation_reason` to use tags, not description**

Replace `build_curation_reason` and update its call site in `build_mdx`:

```python
def build_curation_reason(title: str, tags: list[str]) -> str:
  tag_a = tags[0] if len(tags) > 0 else "开源"
  tag_b = tags[1] if len(tags) > 1 else "开发工具"
  reason = f"适合关注{tag_a}、{tag_b}场景的开发者与团队。"
  return truncate_chinese(reason, 100)
```

In `build_mdx`, change:

```python
curation_reason = build_curation_reason(title, chinese_description)
```

to:

```python
curation_reason = build_curation_reason(title, tags)
```

- [ ] **Step 3: Smoke-test generator output**

Run from repo root:

```bash
python3 .codex/skills/github-project-curator/scripts/create_github_project_mdx.py https://github.com/continuedev/continue --dry-run | head -25
```

Expected in frontmatter:

- `description:` and `curationReason:` are different strings.
- `curationReason` mentions tags (e.g. `AI 编程`, `开发工具`) rather than copying `description`.

- [ ] **Step 4: Commit**

```bash
git add .codex/skills/github-project-curator/scripts/create_github_project_mdx.py
git commit -m "fix: generate search-only curationReason distinct from description"
```

---

### Task 4: Update curator Skill documentation

**Files:**
- Modify: `.codex/skills/github-project-curator/SKILL.md:26-35`
- Modify: `.codex/skills/github-project-curator/SKILL.md:66-71`
- Modify: `.codex/skills/github-project-curator/SKILL.md:86-94`

- [ ] **Step 1: Replace frontmatter bullet list**

Change the Required frontmatter section to:

```markdown
Required:

- `title`, `repo`, optional `homepage`
- `description` — Chinese one-liner (≤80 chars) for list card and SEO; answers **what the project is**
- `curationReason` — required search-only note (≤100 chars); audience, scenario, or filter-friendly keywords; **must not repeat `description`**
- Exactly three Chinese `tags`, `language`, `stars`, `license`, `featured`, `publishedAt`, `updatedAt`
```

- [ ] **Step 2: Extend workflow step 3**

After the existing polish bullets, add:

```markdown
   - Keep `description` as the single visible list-card line (≤80 Chinese chars).
   - Write `curationReason` from a different angle (persona, scenario, search phrases).
   - Confirm `description` and `curationReason` are not paraphrases before saving.
```

- [ ] **Step 3: Add guardrails**

Append to Guardrails:

```markdown
- Do not copy `description` into `curationReason`; the list card shows only `description`.
- `curationReason` is indexed for `/github/` search but not rendered on list cards.
```

- [ ] **Step 4: Commit**

```bash
git add .codex/skills/github-project-curator/SKILL.md
git commit -m "docs: clarify description vs search-only curationReason in curator skill"
```

---

### Task 5: Update design docs status and card-density note

**Files:**
- Modify: `docs/superpowers/specs/2026-06-19-github-curator-card-simplify-design.md:4`
- Modify: `docs/superpowers/specs/2026-06-19-github-pages-responsive-design.md:16`

- [ ] **Step 1: Mark card-simplify spec Approved**

In `docs/superpowers/specs/2026-06-19-github-curator-card-simplify-design.md`, change:

```markdown
Status: Draft — pending user review
```

to:

```markdown
Status: Approved
```

- [ ] **Step 2: Update responsive design card-density row**

In `docs/superpowers/specs/2026-06-19-github-pages-responsive-design.md`, change the Card density row from:

```markdown
| Card density | Balanced: keep metadata + short curation reason; GitHub action as secondary icon button |
```

to:

```markdown
| Card density | Balanced: single `description` line + metadata; `curationReason` search-only; GitHub action as secondary icon button |
```

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-06-19-github-curator-card-simplify-design.md docs/superpowers/specs/2026-06-19-github-pages-responsive-design.md docs/superpowers/plans/2026-06-19-github-curator-card-simplify.md
git commit -m "docs: approve card-simplify spec and add implementation plan"
```

---

### Task 6: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Run unit tests**

```bash
pnpm test tests/github-curation.test.ts
```

Expected: all PASS.

- [ ] **Step 2: Run Astro check and production build**

```bash
pnpm astro check
pnpm build
```

Expected: both exit 0.

- [ ] **Step 3: Manual smoke check (dev server)**

```bash
pnpm dev
```

Open `http://localhost:4321/github/` and confirm:

- Each card has one text block under the title (`description`).
- No gray `curationReason` box.
- Searching a phrase that appears only in a project's `curationReason` (e.g. `团队自定义编码代理` on Continue) still returns that project.

---

## Spec Coverage Checklist

| Spec requirement | Task |
|------------------|------|
| List cards show only `description` | Task 2 |
| `curationReason` search-only, not on card | Task 1 + Task 2 |
| Skill documents distinct field roles | Task 4 |
| Generator produces non-duplicative scaffolds | Task 3 |
| No schema change; existing MDX unchanged | implicit (no Task) |
| `pnpm astro check` / `pnpm build` pass | Task 6 |
| Search matches `curationReason`-only text | Task 1 |

## Out of Scope (do not implement unless user asks)

- Bulk rewrite of `src/content/github/*.mdx`
- Schema `.max()` validation on `description`
- Detail page surfacing of `curationReason`
