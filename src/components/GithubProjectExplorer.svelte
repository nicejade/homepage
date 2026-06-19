<script lang="ts">
  import { onMount } from 'svelte';
  import {
    filterGithubProjects,
    getGithubProjectTags,
    type GithubProject,
  } from '../lib/github-curation';
  import GithubEmptyState from './GithubEmptyState.svelte';
  import GithubFilterBar from './GithubFilterBar.svelte';
  import GithubProjectCard from './GithubProjectCard.svelte';

  export let projects: GithubProject[] = [];

  let query = '';
  let selectedTag = '';

  $: tags = getGithubProjectTags(projects);
  $: filteredProjects = filterGithubProjects(projects, { query, selectedTag });
  $: hasFilters = query.trim() !== '' || selectedTag !== '';

  onMount(() => {
    const tagFromUrl = new URLSearchParams(window.location.search).get('tag');
    if (tagFromUrl && tags.includes(tagFromUrl)) {
      selectedTag = tagFromUrl;
    }
  });

  function setTag(tag: string) {
    selectedTag = selectedTag === tag ? '' : tag;
    syncTagToUrl(selectedTag);
  }

  function syncTagToUrl(tag: string) {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (tag) {
      url.searchParams.set('tag', tag);
    } else {
      url.searchParams.delete('tag');
    }
    window.history.replaceState({}, '', url);
  }

  function clearFilters() {
    query = '';
    selectedTag = '';
    syncTagToUrl('');
  }
</script>

<section class="flex flex-col gap-8" aria-label="GitHub 珍藏项目列表">
  <header class="mx-auto max-w-2xl text-center">
    <h2
      class="text-3xl font-semibold tracking-tight text-black dark:text-silver sm:text-4xl"
    >
      高质量开源项目精选
    </h2>
    <p class="mt-4 text-base leading-relaxed text-grey dark:text-gray-400 sm:text-lg">
      收录 AI 编程、本地模型、工作流自动化与开发者生产力方向的高质量开源项目。
    </p>
    <dl class="mt-7 flex items-center justify-center gap-3" aria-label="项目统计">
      <div
        class="flex items-baseline gap-1.5 rounded-full bg-black/[0.04] px-4 py-1.5 dark:bg-white/[0.06]"
      >
        <dd class="text-base font-semibold text-black dark:text-silver">{projects.length}</dd>
        <dt class="text-sm text-grey dark:text-gray-400">个项目</dt>
      </div>
      <div
        class="flex items-baseline gap-1.5 rounded-full bg-black/[0.04] px-4 py-1.5 dark:bg-white/[0.06]"
      >
        <dd class="text-base font-semibold text-black dark:text-silver">{tags.length}</dd>
        <dt class="text-sm text-grey dark:text-gray-400">个标签</dt>
      </div>
    </dl>
  </header>

  <GithubFilterBar
    bind:query
    {selectedTag}
    {tags}
    resultCount={filteredProjects.length}
    {hasFilters}
    onTagSelect={setTag}
    onClearFilters={clearFilters}
  />

  {#if filteredProjects.length > 0}
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {#each filteredProjects as project (project.slug)}
        <GithubProjectCard {project} {selectedTag} onTagClick={setTag} />
      {/each}
    </div>
  {:else}
    <GithubEmptyState onClearFilters={clearFilters} />
  {/if}
</section>
