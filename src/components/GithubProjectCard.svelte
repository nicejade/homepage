<script lang="ts">
  import type { GithubProject } from '../lib/github-curation';
  import {
    formatGithubStarsCompact,
    GITHUB_CARD_INTERACTIVE,
    GITHUB_CARD_SHADOW,
    GITHUB_SURFACE,
    githubMetaTagClass,
  } from '../lib/github-ui';

  export let project: GithubProject;
  export let selectedTag = '';
  export let onTagClick: (tag: string) => void = () => {};
</script>

<article
  class="group relative flex h-full min-w-0 flex-col gap-4 p-5 sm:p-6 {GITHUB_SURFACE} {GITHUB_CARD_SHADOW} {GITHUB_CARD_INTERACTIVE}"
>
  <div class="flex flex-col gap-2 pr-16">
    <p class="truncate font-mono text-xs text-grey/80 dark:text-gray-500">{project.ownerRepo}</p>
    <h2 class="line-clamp-1 text-lg font-semibold tracking-tight text-black dark:text-silver">
      {project.title}
    </h2>
    <p class="line-clamp-2 text-sm leading-relaxed text-grey dark:text-gray-400">
      {project.description}
    </p>
  </div>

  {#if project.featured}
    <span
      class="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand sm:right-6 sm:top-6"
    >
      <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path
          d="M20.924 7.625a1.52 1.52 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.52 1.52 0 0 0 .387-1.575"
        />
      </svg>
      精选
    </span>
  {/if}

  <div class="flex flex-wrap gap-2" aria-label={`${project.title} 标签`}>
    {#each project.tags as tag}
      <button
        type="button"
        class={githubMetaTagClass(selectedTag === tag)}
        on:click={() => onTagClick(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>

  <dl class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
    <div class="flex items-center gap-1.5 font-medium text-black dark:text-silver">
      <svg
        class="h-4 w-4 text-amber-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path
          d="M20.924 7.625a1.52 1.52 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.52 1.52 0 0 0 .387-1.575"
        />
      </svg>
      <span>{formatGithubStarsCompact(project.stars)}</span>
    </div>
    <div class="flex items-center gap-1.5 text-grey dark:text-gray-400">
      <span class="h-2 w-2 rounded-full bg-brand/70" aria-hidden="true"></span>
      <span>{project.language || 'Unknown'}</span>
    </div>
    <div class="text-grey dark:text-gray-400">{project.license || 'Unknown'}</div>
  </dl>

  <div class="mt-auto flex items-center gap-2.5 pt-1">
    <a
      class="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-xl bg-brand px-4 py-2 text-center text-sm font-semibold text-white no-underline shadow-sm transition-[transform,background-color] duration-200 ease-out motion-reduce:transition-none hover:bg-brand/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
      href={project.href}
    >
      查看详情
    </a>
    <a
      class="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-black/10 px-3 py-2 text-grey no-underline transition-[transform,color,border-color,background-color] duration-200 ease-out motion-reduce:transition-none hover:border-black/20 hover:bg-black/[0.03] hover:text-black active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-gray-300 dark:hover:border-white/25 dark:hover:bg-white/[0.04] dark:hover:text-white dark:focus-visible:ring-offset-gray-950"
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`在 GitHub 打开 ${project.ownerRepo}`}
      title="打开 GitHub"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
      </svg>
    </a>
  </div>
</article>
