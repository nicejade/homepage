<script lang="ts">
  import { onMount } from 'svelte';
  import {
    filterGithubProjects,
    getGithubProjectTags,
    paginateGithubProjects,
    parseGithubPageParam,
    type GithubProject,
  } from '../lib/github-curation';
  import GithubEmptyState from './GithubEmptyState.svelte';
  import GithubFilterBar from './GithubFilterBar.svelte';
  import GithubPagination from './GithubPagination.svelte';
  import GithubProjectCard from './GithubProjectCard.svelte';

  export let projects: GithubProject[] = [];

  let query = '';
  let selectedTag = '';
  let requestedPage = 1;
  let gridElement: HTMLDivElement | null = null;
  let lastQuery = '';
  let lastSelectedTag = '';
  let urlReady = false;

  $: tags = getGithubProjectTags(projects);
  $: filteredProjects = filterGithubProjects(projects, { query, selectedTag });
  $: hasFilters = query.trim() !== '' || selectedTag !== '';
  $: pagination = paginateGithubProjects(filteredProjects, requestedPage);
  $: visibleProjects = pagination.items;

  $: if (urlReady && (query !== lastQuery || selectedTag !== lastSelectedTag)) {
    requestedPage = 1;
    lastQuery = query;
    lastSelectedTag = selectedTag;
  }

  $: if (urlReady) {
    syncUrl(pagination.page);
  }

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const tagFromUrl = params.get('tag');
    if (tagFromUrl && tags.includes(tagFromUrl)) {
      selectedTag = tagFromUrl;
    }
    requestedPage = parseGithubPageParam(params.get('page'));
    lastQuery = query;
    lastSelectedTag = selectedTag;
    urlReady = true;
  });

  function syncUrl(page: number) {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (selectedTag) {
      url.searchParams.set('tag', selectedTag);
    } else {
      url.searchParams.delete('tag');
    }
    if (page > 1) {
      url.searchParams.set('page', String(page));
    } else {
      url.searchParams.delete('page');
    }
    window.history.replaceState({}, '', url);
  }

  function scrollToGrid() {
    if (!gridElement || typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gridElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  function goToPage(page: number) {
    requestedPage = page;
    scrollToGrid();
  }

  function setTag(tag: string) {
    selectedTag = selectedTag === tag ? '' : tag;
  }

  function clearFilters() {
    query = '';
    selectedTag = '';
  }
</script>

<section class="flex flex-col gap-8" aria-label="开源琅嬛阁项目列表">
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
    <div id="github-project-grid" class="flex flex-col gap-6">
      <div class="project-grid" bind:this={gridElement}>
        {#each visibleProjects as project (project.slug)}
          <GithubProjectCard {project} {selectedTag} onTagClick={setTag} />
        {/each}
      </div>

      <GithubPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        onPageChange={goToPage}
      />
    </div>
  {:else}
    <GithubEmptyState onClearFilters={clearFilters} />
  {/if}
</section>

<style>
  .project-grid {
    display: grid;
    width: 100%;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }

  /* 平板 / MacBook：2 列 */
  @media (min-width: 48rem) {
    .project-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  /* 超大 MacBook / 宽屏：3 列 */
  @media (min-width: 90rem) {
    .project-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
    }
  }
</style>
