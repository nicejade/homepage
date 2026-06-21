import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterGithubProjects,
  getGithubProjectTags,
  getGithubPaginationPageNumbers,
  GITHUB_PAGE_SIZE,
  normalizeGithubProject,
  paginateGithubProjects,
  parseGithubPageParam,
  parseGithubSortParam,
  sortGithubProjects,
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

function makeSortableProject(overrides: {
  slug: string;
  title: string;
  stars: number;
  publishedAt: string;
  featured?: boolean;
}) {
  return normalizeGithubProject({
    slug: overrides.slug,
    data: {
      title: overrides.title,
      description: '测试项目',
      repo: `https://github.com/org/${overrides.slug}`,
      tags: ['开发工具', 'CLI', '工作流'],
      language: 'TypeScript',
      stars: overrides.stars,
      license: 'MIT',
      featured: overrides.featured ?? false,
      publishedAt: overrides.publishedAt,
      updatedAt: overrides.publishedAt,
      curationReason: '适合测试排序场景。',
    },
  });
}

test('sorts projects by stars, title, and published date', () => {
  const projects = [
    makeSortableProject({ slug: 'beta', title: 'Beta', stars: 100, publishedAt: '2026-06-18' }),
    makeSortableProject({ slug: 'alpha', title: 'Alpha', stars: 100, publishedAt: '2026-06-20' }),
    makeSortableProject({
      slug: 'featured-low',
      title: 'Featured Low',
      stars: 10,
      publishedAt: '2026-06-19',
      featured: true,
    }),
    makeSortableProject({ slug: 'gamma', title: 'Gamma', stars: 500, publishedAt: '2026-06-17' }),
  ];

  assert.deepEqual(
    sortGithubProjects(projects, 'stars').map((item) => item.slug),
    ['gamma', 'alpha', 'beta', 'featured-low'],
  );
  assert.deepEqual(
    sortGithubProjects(projects, 'title').map((item) => item.slug),
    ['alpha', 'beta', 'featured-low', 'gamma'],
  );
  assert.deepEqual(
    sortGithubProjects(projects, 'published').map((item) => item.slug),
    ['alpha', 'featured-low', 'beta', 'gamma'],
  );
});

test('parseGithubSortParam falls back to stars for invalid values', () => {
  assert.equal(parseGithubSortParam(null), 'stars');
  assert.equal(parseGithubSortParam('stars'), 'stars');
  assert.equal(parseGithubSortParam('title'), 'title');
  assert.equal(parseGithubSortParam('published'), 'published');
  assert.equal(parseGithubSortParam('updated'), 'stars');
});

function makeProjects(count: number) {
  return Array.from({ length: count }, (_, index) =>
    normalizeGithubProject({
      slug: `project-${index + 1}`,
      data: {
        title: `Project ${index + 1}`,
        description: '测试项目',
        repo: `https://github.com/org/project-${index + 1}`,
        tags: ['开发工具', 'CLI', '工作流'],
        language: 'TypeScript',
        stars: 100,
        license: 'MIT',
        featured: false,
        publishedAt: '2026-06-20',
        updatedAt: '2026-06-20',
        curationReason: '适合测试分页场景。',
      },
    })
  );
}

test('paginates projects with a fixed page size of 15', () => {
  const projects = makeProjects(18);
  const page1 = paginateGithubProjects(projects, 1);
  const page2 = paginateGithubProjects(projects, 2);

  assert.equal(GITHUB_PAGE_SIZE, 15);
  assert.equal(page1.page, 1);
  assert.equal(page1.totalPages, 2);
  assert.equal(page1.totalItems, 18);
  assert.equal(page1.items.length, 15);
  assert.equal(page1.startIndex, 1);
  assert.equal(page1.endIndex, 15);
  assert.equal(page1.items[0]?.slug, 'project-1');
  assert.equal(page2.page, 2);
  assert.equal(page2.items.length, 3);
  assert.equal(page2.startIndex, 16);
  assert.equal(page2.endIndex, 18);
  assert.equal(page2.items[0]?.slug, 'project-16');
});

test('clamps invalid page numbers to the nearest valid page', () => {
  const projects = makeProjects(18);

  assert.equal(paginateGithubProjects(projects, 0).page, 1);
  assert.equal(paginateGithubProjects(projects, 99).page, 2);
  assert.equal(parseGithubPageParam(null), 1);
  assert.equal(parseGithubPageParam('2'), 2);
  assert.equal(parseGithubPageParam('abc'), 1);
});

test('returns empty pagination metadata for no results', () => {
  const result = paginateGithubProjects([], 3);

  assert.deepEqual(result.items, []);
  assert.equal(result.totalItems, 0);
  assert.equal(result.totalPages, 0);
  assert.equal(result.startIndex, 0);
  assert.equal(result.endIndex, 0);
});

test('folds page numbers with ellipsis when there are many pages', () => {
  assert.deepEqual(getGithubPaginationPageNumbers(1, 10), [1, 2, 3, 4, 5, 'ellipsis', 10]);
  assert.deepEqual(getGithubPaginationPageNumbers(5, 10), [
    1,
    'ellipsis',
    4,
    5,
    6,
    'ellipsis',
    10,
  ]);
  assert.deepEqual(getGithubPaginationPageNumbers(10, 10), [
    1,
    'ellipsis',
    6,
    7,
    8,
    9,
    10,
  ]);
  assert.deepEqual(getGithubPaginationPageNumbers(3, 5), [1, 2, 3, 4, 5]);
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
