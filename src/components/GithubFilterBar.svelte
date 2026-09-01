<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';
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

  let sortOpen = false;
  let sortRoot: HTMLDivElement | null = null;
  let sortTrigger: HTMLButtonElement | null = null;
  let sortListbox: HTMLUListElement | null = null;
  let activeIndex = 0;

  $: selectedSortLabel =
    GITHUB_SORT_OPTIONS.find((option) => option.value === selectedSort)?.label ??
    GITHUB_SORT_OPTIONS[0].label;

  function selectedSortIndex() {
    const index = GITHUB_SORT_OPTIONS.findIndex((option) => option.value === selectedSort);
    return index >= 0 ? index : 0;
  }

  function closeSortMenu(restoreFocus = false) {
    if (!sortOpen) return;
    sortOpen = false;
    if (restoreFocus) {
      sortTrigger?.focus();
    }
  }

  function openSortMenu() {
    activeIndex = selectedSortIndex();
    sortOpen = true;
    void tick().then(() => {
      sortListbox?.focus();
    });
  }

  function toggleSortMenu() {
    if (sortOpen) {
      closeSortMenu();
    } else {
      openSortMenu();
    }
  }

  function chooseSort(sort: GithubSortKey) {
    onSortChange(sort);
    closeSortMenu(true);
  }

  function onSortTriggerKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!sortOpen) {
        openSortMenu();
      }
    } else if (event.key === 'Escape') {
      closeSortMenu();
    }
  }

  function onSortListboxKeydown(event: KeyboardEvent) {
    const lastIndex = GITHUB_SORT_OPTIONS.length - 1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        activeIndex = activeIndex >= lastIndex ? 0 : activeIndex + 1;
        break;
      case 'ArrowUp':
        event.preventDefault();
        activeIndex = activeIndex <= 0 ? lastIndex : activeIndex - 1;
        break;
      case 'Home':
        event.preventDefault();
        activeIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        activeIndex = lastIndex;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        chooseSort(GITHUB_SORT_OPTIONS[activeIndex].value);
        break;
      case 'Escape':
        event.preventDefault();
        closeSortMenu(true);
        break;
      case 'Tab':
        closeSortMenu();
        break;
    }
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (!sortOpen || !sortRoot) return;
    const target = event.target as Node | null;
    if (target && !sortRoot.contains(target)) {
      closeSortMenu();
    }
  }

  onMount(() => {
    document.addEventListener('pointerdown', onDocumentPointerDown);
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('pointerdown', onDocumentPointerDown);
    }
  });
</script>

<div
  class="github-filter-search sticky top-[var(--sl-nav-height,4rem)] z-10 -mx-4 border-b border-black/[0.06] bg-[color-mix(in_srgb,var(--sl-color-bg)_86%,transparent)] px-4 pb-3 pt-4 backdrop-blur-xl dark:border-white/[0.08] sm:-mx-6 sm:px-6"
  role="search"
>
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
      class="min-h-11 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] py-2.5 pl-11 pr-4 text-base text-black outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-grey/60 focus:border-brand/60 focus:bg-surface focus:ring-4 focus:ring-brand/10 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-silver dark:placeholder:text-gray-500 dark:focus:bg-surface-dark"
    />
  </div>
</div>

<div class="github-filter-bar flex flex-col gap-3" aria-label="开源琅嬛阁筛选">
    <div
      class="-mx-4 flex flex-nowrap items-center gap-2 overflow-x-auto scroll-px-4 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:scroll-px-6 sm:px-6"
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
      class="flex min-h-9 flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-grey dark:text-gray-400"
      aria-live="polite"
    >
      <span class="inline-flex h-9 items-center gap-1.5">
        共
        <span class="font-semibold text-black dark:text-silver">{resultCount}</span>
        个结果
      </span>

      <div class="flex flex-wrap items-center gap-2 sm:gap-3">
        <div class="inline-flex h-9 items-center gap-2">
          <span id="github-sort-label" class="inline-flex h-9 items-center whitespace-nowrap text-grey dark:text-gray-400">
            排序
          </span>

          <div class="relative" bind:this={sortRoot}>
            <button
              type="button"
              id="github-sort"
              bind:this={sortTrigger}
              class="inline-flex h-9 min-w-[10rem] cursor-pointer items-center justify-between gap-2 rounded-full border bg-white py-0 pl-3.5 pr-2.5 text-sm font-medium leading-none outline-none transition-[border-color,box-shadow,background-color,color] duration-200 ease-out motion-reduce:transition-none focus-visible:border-brand/50 focus-visible:shadow-[0_0_0_3px_rgba(33,150,243,0.12)] dark:bg-white/[0.04] dark:focus-visible:bg-white/[0.06] {sortOpen
                ? 'border-brand/40 text-black shadow-[0_0_0_3px_rgba(33,150,243,0.1)] dark:border-brand/35 dark:text-silver'
                : 'border-black/[0.08] text-black hover:border-black/[0.14] hover:bg-black/[0.02] dark:border-white/[0.1] dark:text-silver dark:hover:border-white/[0.16] dark:hover:bg-white/[0.06]'}"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              aria-controls="github-sort-listbox"
              aria-labelledby="github-sort-label github-sort"
              on:click={toggleSortMenu}
              on:keydown={onSortTriggerKeydown}
            >
              <span class="truncate">{selectedSortLabel}</span>
              <svg
                class="h-3.5 w-3.5 shrink-0 text-grey/55 transition-transform duration-200 ease-out motion-reduce:transition-none dark:text-gray-400 {sortOpen
                  ? 'rotate-180 text-brand'
                  : ''}"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.25"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {#if sortOpen}
              <ul
                id="github-sort-listbox"
                bind:this={sortListbox}
                class="github-sort-menu absolute right-0 top-[calc(100%+0.375rem)] z-20 m-0 flex w-max min-w-full list-none flex-col gap-1.5 overflow-hidden rounded-xl border border-black/[0.06] bg-surface p-1.5 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.14),0_2px_8px_-2px_rgba(15,23,42,0.06)] dark:border-white/[0.1] dark:bg-surface-dark dark:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.55)]"
                role="listbox"
                tabindex="-1"
                aria-labelledby="github-sort-label"
                aria-activedescendant="github-sort-option-{GITHUB_SORT_OPTIONS[activeIndex]?.value}"
                on:keydown={onSortListboxKeydown}
              >
                {#each GITHUB_SORT_OPTIONS as option, index}
                  {@const isSelected = selectedSort === option.value}
                  {@const isActive = activeIndex === index}
                  <li
                    id="github-sort-option-{option.value}"
                    role="option"
                    aria-selected={isSelected}
                    class="!ml-0 flex min-h-10 list-none cursor-pointer items-center gap-2 rounded-xl py-2 pl-2.5 pr-2 text-sm leading-none no-underline transition-[background-color,color] duration-150 ease-out motion-reduce:transition-none {isSelected
                      ? 'bg-brand/[0.1] font-medium text-brand'
                      : isActive
                        ? 'bg-black/[0.05] font-medium text-black dark:bg-white/[0.08] dark:text-silver'
                        : 'font-normal text-grey dark:text-gray-400'}"
                    on:click={() => chooseSort(option.value)}
                    on:mouseenter={() => {
                      activeIndex = index;
                    }}
                  >
                    <span class="whitespace-nowrap no-underline">{option.label}</span>
                    <span
                      class="ml-auto inline-flex h-4 w-4 shrink-0 items-center justify-center text-brand"
                      aria-hidden="true"
                    >
                      {#if isSelected}
                        <svg
                          class="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      {/if}
                    </span>
                  </li>
                {/each}
              </ul>
            {/if}
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

<style>
  @media (prefers-reduced-transparency: reduce) {
    .github-filter-search {
      background: var(--sl-color-bg);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }

  .github-sort-menu {
    transform-origin: top right;
    opacity: 1;
    transform: translateY(0) scale(1);
    transition:
      opacity 160ms var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      transform 160ms var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
    /* Override global `.main-pane li { margin-left: 2rem }` from custom.css */
    list-style: none;
    margin: 0;
  }

  @starting-style {
    .github-sort-menu {
      opacity: 0;
      transform: translateY(-4px) scale(0.98);
    }
  }

  .github-sort-menu :global(li) {
    list-style: none;
    margin-left: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .github-sort-menu {
      transform: none;
      transition: opacity 160ms ease;
    }

    @starting-style {
      .github-sort-menu {
        transform: none;
        opacity: 0;
      }
    }
  }
</style>
