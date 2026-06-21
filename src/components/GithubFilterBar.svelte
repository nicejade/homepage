<script lang="ts">
  import {
    GITHUB_SORT_OPTIONS,
    type GithubSortKey,
  } from '../lib/github-curation';
  import { githubTagButtonClass } from '../lib/github-ui';

  export let query = '';
  export let selectedTag = '';
  export let selectedSort: GithubSortKey = 'stars';
  export let tags: string[] = [];
  export let resultCount = 0;
  export let hasFilters = false;
  export let onTagSelect: (tag: string) => void = () => {};
  export let onSortChange: (sort: GithubSortKey) => void = () => {};
  export let onClearFilters: () => void = () => {};

  const sortSelectClass =
    'min-h-9 min-w-[9.5rem] cursor-pointer appearance-none rounded-xl border border-black/[0.08] bg-white py-2 pl-3 pr-9 text-sm font-medium text-black outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-brand/60 focus:ring-4 focus:ring-brand/10 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-silver dark:focus:bg-white/[0.06]';
</script>

<div
  class="sticky top-0 z-10 -mx-4 border-b border-black/[0.06] bg-white/70 px-4 py-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-gray-950/70 sm:-mx-6 sm:px-6"
  aria-label="开源琅嬛阁筛选"
>
  <div class="flex flex-col gap-3.5">
    <label for="github-search" class="sr-only">搜索开源琅嬛阁</label>
    <div class="relative">
      <svg
        class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey/70 dark:text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        id="github-search"
        type="search"
        bind:value={query}
        placeholder="搜索标题、描述、标签、语言或 owner/repo"
        autocomplete="off"
        class="min-h-11 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] py-2.5 pl-11 pr-4 text-base text-black outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-grey/60 focus:border-brand/60 focus:bg-white focus:ring-4 focus:ring-brand/10 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-silver dark:placeholder:text-gray-500 dark:focus:bg-white/[0.06]"
      />
    </div>

    <div
      class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6"
      aria-label="标签筛选"
      role="group"
    >
      <button
        type="button"
        class={githubTagButtonClass(selectedTag === '')}
        aria-pressed={selectedTag === ''}
        on:click={() => onTagSelect('')}
      >
        全部
      </button>
      {#each tags as tag}
        <button
          type="button"
          class={githubTagButtonClass(selectedTag === tag)}
          aria-pressed={selectedTag === tag}
          on:click={() => onTagSelect(tag)}
        >
          {tag}
        </button>
      {/each}
    </div>

    <div
      class="flex flex-wrap items-center justify-between gap-3 text-sm text-grey dark:text-gray-400"
      aria-live="polite"
    >
      <span>共 <span class="font-semibold text-black dark:text-silver">{resultCount}</span> 个结果</span>

      <div class="flex flex-wrap items-center gap-2 sm:gap-3">
        <div class="flex shrink-0 items-center gap-2">
          <label
            for="github-sort"
            class="whitespace-nowrap text-grey dark:text-gray-400"
          >
            排序
          </label>
          <div class="relative">
            <select
              id="github-sort"
              class={sortSelectClass}
              value={selectedSort}
              on:change={(event) => onSortChange(event.currentTarget.value as GithubSortKey)}
            >
              {#each GITHUB_SORT_OPTIONS as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
            <svg
              class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey/70 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        {#if hasFilters}
          <button
            type="button"
            class="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-full px-3 font-medium text-brand transition-colors duration-200 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            on:click={onClearFilters}
          >
            <svg
              class="h-3.5 w-3.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            清除筛选
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
