<script lang="ts">
  import { onMount } from 'svelte';
  import type { GithubProject } from '../lib/github-curation';
  import { fetchLiveRepoStats, parseOwnerRepo } from '../lib/github-live-stats';
  import {
    formatGithubStars,
    formatGithubStatCompact,
    GITHUB_BUTTON_PRIMARY,
    GITHUB_BUTTON_SECONDARY,
    GITHUB_CARD_SHADOW,
    GITHUB_SURFACE,
    githubMetaTagClass,
  } from '../lib/github-ui';

  export let project: GithubProject;

  let stars = project.stars;
  let forks = project.forks;
  let openIssues = project.openIssues;
  let contributors = project.contributors;
  let repoDescription = project.repoDescription ?? '';
  let avatarUrl = project.avatarUrl ?? '';
  let starsLive = false;

  const parsed = parseOwnerRepo(project.repo);
  const homepage = project.homepage;

  onMount(async () => {
    if (!parsed) return;
    const live = await fetchLiveRepoStats(parsed.owner, parsed.repo);
    if (!live) return;
    stars = live.stars;
    forks = live.forks;
    openIssues = live.openIssues;
    if (live.description) repoDescription = live.description;
    if (live.avatarUrl) avatarUrl = live.avatarUrl;
    starsLive = true;
  });
</script>

<nav class="mb-6" aria-label="面包屑导航">
  <a
    href="/github/"
    class="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 -ml-3 text-sm font-medium text-grey no-underline transition-colors duration-200 motion-reduce:transition-none hover:bg-black/[0.04] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white dark:focus-visible:ring-offset-gray-950"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6"></path>
    </svg>
    返回开源琅嬛阁
  </a>
</nav>

<article
  class="mb-6 overflow-hidden {GITHUB_SURFACE} {GITHUB_CARD_SHADOW}"
  aria-label={`${project.title} GitHub 仓库预览`}
>
  <div class="p-5 sm:p-6">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0 flex-1">
        {#if project.featured}
          <span
            class="mb-2 inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand"
          >
            精选
          </span>
        {/if}
        <p class="m-0 font-mono text-sm font-semibold text-black dark:text-silver">{project.ownerRepo}</p>
        <p class="m-0 mt-2 text-sm leading-relaxed text-grey dark:text-gray-400">
          {repoDescription || project.description}
        </p>
      </div>
      {#if avatarUrl}
        <img
          src={avatarUrl}
          alt=""
          width="48"
          height="48"
          class="h-12 w-12 shrink-0 rounded-full border border-black/[0.06] dark:border-white/[0.08]"
          loading="lazy"
        />
      {/if}
    </div>

    <dl
      class="m-0 mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/[0.06] pt-4 text-sm text-grey dark:border-white/[0.08] dark:text-gray-400"
      aria-label="仓库统计"
    >
      <div class="flex items-center gap-1.5" title="Contributors">
        <span aria-hidden="true">👥</span>
        <span>{formatGithubStatCompact(contributors)}</span>
      </div>
      <div class="flex items-center gap-1.5" title="Open issues">
        <span class="h-2 w-2 rounded-full bg-grey/60" aria-hidden="true"></span>
        <span>{formatGithubStatCompact(openIssues)}</span>
      </div>
      <div class="flex items-center gap-1.5 font-medium text-black dark:text-silver" title="Stars">
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
        <span>{formatGithubStars(stars)}</span>
        {#if starsLive}
          <span class="text-xs font-normal text-emerald-600 dark:text-emerald-400">实时</span>
        {/if}
      </div>
      <div class="flex items-center gap-1.5" title="Forks">
        <span aria-hidden="true">⑂</span>
        <span>{formatGithubStatCompact(forks)}</span>
      </div>
      <a
        class="ml-auto inline-flex min-h-8 min-w-8 items-center justify-center text-grey hover:text-black dark:hover:text-white"
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`在 GitHub 打开 ${project.ownerRepo}`}
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
    </dl>
  </div>

  <div
    class="border-t border-black/[0.06] bg-black/[0.02] px-5 py-2.5 text-xs text-grey dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-gray-500 sm:px-6"
  >
    github.com · {project.ownerRepo}
  </div>
</article>

<div class="mb-8 grid gap-4">
  <div class="flex flex-wrap gap-2" aria-label="项目标签">
    {#each project.tags as tag}
      <a class={githubMetaTagClass()} href={`/github/?tag=${encodeURIComponent(tag)}`}>{tag}</a>
    {/each}
  </div>

  <div class="flex flex-col gap-2.5 sm:flex-row">
    {#if homepage}
      <a class={GITHUB_BUTTON_PRIMARY} href={homepage} target="_blank" rel="noopener noreferrer">
        官方主页 / 文档
      </a>
    {/if}
    <a class={GITHUB_BUTTON_SECONDARY} href={project.repo} target="_blank" rel="noopener noreferrer">
      在 GitHub 查看
    </a>
  </div>
</div>
