<script lang="ts">
  import { getGithubPaginationPageNumbers } from '../lib/github-curation';
  import { githubPaginationNavClass, githubPaginationPageClass } from '../lib/github-ui';

  export let page = 1;
  export let totalPages = 0;
  export let totalItems = 0;
  export let startIndex = 0;
  export let endIndex = 0;
  export let onPageChange: (page: number) => void = () => {};

  $: pageNumbers = getGithubPaginationPageNumbers(page, totalPages);
  $: showPagination = totalPages > 1;

  function selectPage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    onPageChange(nextPage);
  }
</script>

{#if showPagination}
  <nav
    class="flex flex-col items-center gap-4 border-t border-black/[0.06] pt-6 dark:border-white/[0.08] sm:flex-row sm:justify-between"
    aria-label="分页导航"
  >
    <p class="text-center text-sm text-grey dark:text-gray-400 sm:text-left" aria-live="polite">
      共 <span class="font-semibold text-black dark:text-silver">{totalItems}</span> 个项目 · 第
      <span class="font-semibold text-black dark:text-silver">{startIndex}–{endIndex}</span> 项
    </p>

    <div class="flex items-center gap-1.5">
      <button
        type="button"
        class={githubPaginationNavClass(page <= 1)}
        aria-label="上一页"
        aria-disabled={page <= 1}
        disabled={page <= 1}
        on:click={() => selectPage(page - 1)}
      >
        ‹
      </button>

      {#each pageNumbers as token}
        {#if token === 'ellipsis'}
          <span
            class="inline-flex h-9 min-w-9 items-center justify-center px-1 text-sm text-grey/70 dark:text-gray-500"
            aria-hidden="true"
          >
            …
          </span>
        {:else}
          <button
            type="button"
            class={githubPaginationPageClass(page === token)}
            aria-label={`第 ${token} 页`}
            aria-current={page === token ? 'page' : undefined}
            on:click={() => selectPage(token)}
          >
            {token}
          </button>
        {/if}
      {/each}

      <button
        type="button"
        class={githubPaginationNavClass(page >= totalPages)}
        aria-label="下一页"
        aria-disabled={page >= totalPages}
        disabled={page >= totalPages}
        on:click={() => selectPage(page + 1)}
      >
        ›
      </button>
    </div>
  </nav>
{/if}
