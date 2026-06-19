import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterGithubProjects,
  getGithubProjectTags,
  normalizeGithubProject,
} from '../src/lib/github-curation.ts';
import {
  normalizeRepoStats,
  parseOwnerRepo,
} from '../src/lib/github-live-stats.ts';
import {
  formatGithubStarsCompact,
  formatGithubStatCompact,
} from '../src/lib/github-ui.ts';

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
    repoDescription: 'The open-source AI code assistant',
    forks: 3200,
    openIssues: 412,
  },
});

test('normalizes repository owner/name and detail URL', () => {
  assert.equal(project.ownerRepo, 'continuedev/continue');
  assert.equal(project.href, '/github/continue/');
  assert.equal(project.tags.length, 3);
  assert.equal(project.repoDescription, 'The open-source AI code assistant');
});

test('filters by search text across title, description, tags, language, and owner/repo', () => {
  assert.equal(filterGithubProjects([project], { query: 'continuedev', selectedTag: '' }).length, 1);
  assert.equal(filterGithubProjects([project], { query: 'TypeScript', selectedTag: '' }).length, 1);
  assert.equal(filterGithubProjects([project], { query: '知识管理', selectedTag: '' }).length, 0);
});

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

test('filters by selected tag and returns unique sorted tags', () => {
  assert.equal(filterGithubProjects([project], { query: '', selectedTag: 'Agent' }).length, 1);
  assert.deepEqual(getGithubProjectTags([project]), ['AI 编程', 'Agent', '开发工具']);
});

test('formatGithubStarsCompact rounds list card star counts', () => {
  assert.equal(formatGithubStarsCompact(45234), '45k+');
  assert.equal(formatGithubStarsCompact(1200), '1.2k+');
  assert.equal(formatGithubStarsCompact(500), '<1k+');
});

test('formatGithubStatCompact formats social card stats', () => {
  assert.equal(formatGithubStatCompact(1200), '1.2k');
  assert.equal(formatGithubStatCompact(undefined), '—');
});

test('parseOwnerRepo extracts owner and repo from GitHub URLs', () => {
  assert.deepEqual(parseOwnerRepo('https://github.com/usebruno/bruno'), {
    owner: 'usebruno',
    repo: 'bruno',
  });
  assert.equal(parseOwnerRepo('https://example.com/foo'), null);
});

test('normalizeRepoStats maps GitHub API payload', () => {
  const stats = normalizeRepoStats({
    description: 'Opensource IDE',
    stargazers_count: 45000,
    forks_count: 3100,
    open_issues_count: 1000,
    owner: { avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4' },
  });
  assert.ok(stats);
  assert.equal(stats?.stars, 45000);
  assert.equal(stats?.forks, 3100);
  assert.equal(stats?.avatarUrl, 'https://avatars.githubusercontent.com/u/1?v=4');
});
