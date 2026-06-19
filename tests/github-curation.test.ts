import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterGithubProjects,
  getGithubProjectTags,
  normalizeGithubProject,
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
