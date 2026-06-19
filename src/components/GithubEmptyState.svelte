<script lang="ts">
  import { GITHUB_BUTTON_SECONDARY } from '../lib/github-ui';

  export let onClearFilters: () => void = () => {};
</script>

<div
  class="flex flex-col items-center rounded-2xl border border-dashed border-black/[0.1] px-6 py-16 text-center dark:border-white/[0.12]"
  role="status"
>
  <div
    class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.04] dark:bg-white/[0.06]"
  >
    <svg
      class="h-7 w-7 text-grey/70 dark:text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  </div>
  <h2 class="text-xl font-semibold tracking-tight text-black dark:text-silver">没有匹配的项目</h2>
  <p class="mx-auto mt-2 max-w-md text-base leading-relaxed text-grey dark:text-gray-400">
    换一个关键词，或清除当前标签筛选后再试。
  </p>
  <button type="button" class="mt-6 cursor-pointer {GITHUB_BUTTON_SECONDARY}" on:click={onClearFilters}>
    清除筛选
  </button>
</div>
