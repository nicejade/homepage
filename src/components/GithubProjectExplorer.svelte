<script lang="ts">
  import { onMount } from 'svelte';
  import {
    filterGithubProjects,
    getGithubProjectTags,
    GITHUB_SORT_DEFAULT,
    paginateGithubProjects,
    parseGithubPageParam,
    parseGithubSortParam,
    sortGithubProjects,
    type GithubProject,
    type GithubSortKey,
  } from '../lib/github-curation';
  import GithubEmptyState from './GithubEmptyState.svelte';
  import GithubFilterBar from './GithubFilterBar.svelte';
  import GithubPagination from './GithubPagination.svelte';
  import GithubProjectCard from './GithubProjectCard.svelte';

  export let projects: GithubProject[] = [];

  let query = '';
  let selectedTag = '';
  let selectedSort: GithubSortKey = GITHUB_SORT_DEFAULT;
  let requestedPage = 1;
  let gridElement: HTMLDivElement | null = null;
  let lastQuery = '';
  let lastSelectedTag = '';
  let lastSelectedSort: GithubSortKey = GITHUB_SORT_DEFAULT;
  let urlReady = false;

  $: tags = getGithubProjectTags(projects);
  $: filteredProjects = filterGithubProjects(projects, { query, selectedTag });
  $: sortedProjects = sortGithubProjects(filteredProjects, selectedSort);
  $: hasFilters = query.trim() !== '' || selectedTag !== '';
  $: pagination = paginateGithubProjects(sortedProjects, requestedPage);
  $: visibleProjects = pagination.items;

  $: if (
    urlReady &&
    (query !== lastQuery || selectedTag !== lastSelectedTag || selectedSort !== lastSelectedSort)
  ) {
    requestedPage = 1;
    lastQuery = query;
    lastSelectedTag = selectedTag;
    lastSelectedSort = selectedSort;
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
    selectedSort = parseGithubSortParam(params.get('sort'));
    lastQuery = query;
    lastSelectedTag = selectedTag;
    lastSelectedSort = selectedSort;
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
    if (selectedSort !== GITHUB_SORT_DEFAULT) {
      url.searchParams.set('sort', selectedSort);
    } else {
      url.searchParams.delete('sort');
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

  function setSort(sort: GithubSortKey) {
    selectedSort = sort;
  }
</script>

<section class="github-curation flex flex-col gap-6" aria-label="开源琅嬛阁项目列表">
  <header class="mx-auto max-w-2xl text-center">
    <h1
      class="text-3xl font-semibold tracking-tight text-black dark:text-silver sm:text-4xl"
    >
      高质量开源项目精选
    </h1>
    <p class="mt-4 text-base leading-relaxed text-grey dark:text-gray-400 sm:text-lg">
      收录 AI Agent、工作流自动化与开发者生产力等高质量开源项目。
    </p>
    <dl class="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3" aria-label="项目统计">
      <div
        class="inline-flex h-9 items-center gap-1.5 rounded-full bg-black/[0.04] px-4 dark:bg-white/[0.06]"
      >
        <dd class="text-base font-semibold leading-none text-black dark:text-silver">{projects.length}</dd>
        <dt class="text-sm leading-none text-grey dark:text-gray-400">个项目</dt>
      </div>
      <div
        class="inline-flex h-9 items-center gap-1.5 rounded-full bg-black/[0.04] px-4 dark:bg-white/[0.06]"
      >
        <dd class="text-base font-semibold leading-none text-black dark:text-silver">{tags.length}</dd>
        <dt class="text-sm leading-none text-grey dark:text-gray-400">个标签</dt>
      </div>
    </dl>
  </header>

  <GithubFilterBar
    bind:query
    {selectedTag}
    {selectedSort}
    {tags}
    resultCount={filteredProjects.length}
    {hasFilters}
    onTagSelect={setTag}
    onSortChange={setSort}
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
