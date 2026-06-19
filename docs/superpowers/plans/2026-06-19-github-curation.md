# GitHub Curation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved `GitHub 珍藏` static curation section with seeded repository MDX entries, searchable filtering UI, detail pages, and a local Codex Skill for generating new entries.

**Architecture:** Astro owns content collections, static routing, SEO metadata, and MDX rendering. Svelte owns the list-page interaction island using small pure helper functions for normalization and filtering. The repo-local Codex Skill produces one MDX file under `src/content/github/` and validates the site after generation.

**Tech Stack:** Astro 5, Starlight, Svelte 5, Astro content collections, MDX, Node built-in test runner.

---

### Task 1: Data Model And Filtering Helpers

**Files:**
- Create: `tests/github-curation.test.ts`
- Create: `src/lib/github-curation.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterGithubProjects,
  normalizeGithubProject,
  getGithubProjectTags,
} from '../src/lib/github-curation.ts';

const project = normalizeGithubProject({
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
    curationReason: 'IDE 中可控的开源 AI 编程体验。',
  },
});

test('normalizes repository owner/name and detail URL', () => {
  assert.equal(project.ownerRepo, 'continuedev/continue');
  assert.equal(project.href, '/github/continue/');
  assert.equal(project.tags.length, 3);
});

test('filters by search text across title, description, tags, language, and owner/repo', () => {
  assert.equal(filterGithubProjects([project], { query: 'continuedev', selectedTag: '' }).length, 1);
  assert.equal(filterGithubProjects([project], { query: 'TypeScript', selectedTag: '' }).length, 1);
  assert.equal(filterGithubProjects([project], { query: '知识管理', selectedTag: '' }).length, 0);
});

test('filters by selected tag and returns unique sorted tags', () => {
  assert.equal(filterGithubProjects([project], { query: '', selectedTag: 'Agent' }).length, 1);
  assert.deepEqual(getGithubProjectTags([project]), ['AI 编程', 'Agent', '开发工具']);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `PATH="/Users/jade/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node --test tests/github-curation.test.ts`

Expected: FAIL because `src/lib/github-curation.ts` does not exist.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/github-curation.ts` with `GithubProject`, `normalizeGithubProject()`, `filterGithubProjects()`, and `getGithubProjectTags()`.

- [ ] **Step 4: Run test to verify it passes**

Run: `PATH="/Users/jade/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node --test tests/github-curation.test.ts`

Expected: PASS.

### Task 2: Content Collection And Seed Entries

**Files:**
- Modify: `src/content/config.ts`
- Create: `src/content/github/*.mdx`

- [ ] **Step 1: Add schema expectations through build validation**

Extend `src/content/config.ts` with a `github` collection that requires title, description, repo URL, exactly three tags, language, stars, license, featured, dates, and curation reason.

- [ ] **Step 2: Seed 8 MDX entries**

Create entries for `continue`, `open-webui`, `langchain`, `dify`, `n8n`, `obsidian`, `tmux`, and `cline`, each with the required frontmatter and body sections:

```md
## 项目介绍
## GitHub 仓库预览
## 对用户价值
## 适应人群
## 如何使用
```

- [ ] **Step 3: Run collection validation**

Run: `PATH="/Users/jade/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm astro check`

Expected: PASS.

### Task 3: List And Detail Pages

**Files:**
- Create: `src/pages/github/index.astro`
- Create: `src/pages/github/[slug].astro`
- Create: `src/components/GithubProjectExplorer.svelte`
- Create: `src/components/GithubRepoPreview.astro`
- Modify: `src/content/docs/index.mdx`

- [ ] **Step 1: Build `/github/` page**

Load `getCollection('github')`, normalize entries, sort featured projects first, and render `GithubProjectExplorer` with `client:load`.

- [ ] **Step 2: Build Svelte explorer**

Use the helper functions for search, tag filtering, result count, clear action, empty state, project cards, detail links, and safe GitHub external links.

- [ ] **Step 3: Build detail route**

Generate static paths from the collection, render `GithubRepoPreview`, and render the MDX content body below it inside `StarlightPage`.

- [ ] **Step 4: Add homepage navigation**

Add a visible `GitHub 珍藏` action or section link from `src/content/docs/index.mdx`.

### Task 4: Local Codex Skill

**Files:**
- Create: `.codex/skills/github-project-curator/SKILL.md`
- Create: `.codex/skills/github-project-curator/agents/openai.yaml`
- Create: `.codex/skills/github-project-curator/scripts/create_github_project_mdx.py`

- [ ] **Step 1: Initialize skill structure**

Run the skill creator init script for `github-project-curator` with `scripts` resources into `.codex/skills`.

- [ ] **Step 2: Implement deterministic generator script**

The script accepts a GitHub repository URL, reads repository API metadata and README, generates safe frontmatter with exactly three Chinese tags, writes `src/content/github/<repo>.mdx`, and supports `--dry-run`.

- [ ] **Step 3: Write concise skill instructions**

Document the workflow: normalize URL, fetch official metadata, ground claims, generate MDX, run validation, and report review notes.

- [ ] **Step 4: Validate skill**

Run: `/Users/jade/.codex/skills/.system/skill-creator/scripts/quick_validate.py .codex/skills/github-project-curator`

Expected: PASS.

### Task 5: Final Verification

**Files:**
- Verify generated `dist/github/index.html`
- Verify one generated detail page such as `dist/github/continue/index.html`

- [ ] **Step 1: Run helper tests**

Run: `PATH="/Users/jade/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node --test tests/github-curation.test.ts`

Expected: PASS.

- [ ] **Step 2: Run full build**

Run: `PATH="/Users/jade/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm build`

Expected: PASS.

- [ ] **Step 3: Inspect generated output**

Check `/github/`, a detail page, search-related markup, safe external link attributes, and required section headings in the built HTML.
