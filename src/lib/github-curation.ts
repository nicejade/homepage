export type GithubProjectInput = {
  slug: string;
  data: {
    title?: string;
    description?: string;
    repo?: string;
    homepage?: string;
    tags?: string[];
    language?: string;
    stars?: number;
    license?: string;
    featured?: boolean;
    publishedAt?: string;
    updatedAt?: string;
    curationReason?: string;
    repoDescription?: string;
    avatarUrl?: string;
    forks?: number;
    openIssues?: number;
    contributors?: number;
  };
};

export type GithubProject = {
  title: string;
  description: string;
  repo: string;
  homepage?: string;
  tags: string[];
  language: string;
  stars: number;
  license: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  curationReason: string;
  repoDescription?: string;
  avatarUrl?: string;
  forks?: number;
  openIssues?: number;
  contributors?: number;
  slug: string;
  href: string;
  ownerRepo: string;
  searchText: string;
};

export type GithubProjectFilters = {
  query: string;
  selectedTag: string;
};

export const GITHUB_PAGE_SIZE = 15;

export type GithubPaginationResult = {
  items: GithubProject[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
};

export type GithubPaginationToken = number | 'ellipsis';

export function normalizeGithubProject(entry: GithubProjectInput): GithubProject {
  const repo = entry.data.repo ?? '';
  const ownerRepo = getOwnerRepo(repo);
  const tags = (entry.data.tags ?? []).slice(0, 3);
  const project = {
    title: entry.data.title ?? entry.slug,
    description: entry.data.description ?? '',
    repo,
    homepage: entry.data.homepage,
    tags,
    language: entry.data.language ?? 'Unknown',
    stars: entry.data.stars ?? 0,
    license: entry.data.license ?? 'Unknown',
    featured: entry.data.featured ?? false,
    publishedAt: entry.data.publishedAt ?? '',
    updatedAt: entry.data.updatedAt ?? '',
    curationReason: entry.data.curationReason ?? '',
    repoDescription: entry.data.repoDescription,
    avatarUrl: entry.data.avatarUrl,
    forks: entry.data.forks,
    openIssues: entry.data.openIssues,
    contributors: entry.data.contributors,
    slug: entry.slug,
    href: `/github/${entry.slug}/`,
    ownerRepo,
  };

  return {
    ...project,
    searchText: [
      project.title,
      project.description,
      project.curationReason,
      project.tags.join(' '),
      project.language,
      project.ownerRepo,
      project.repo,
    ]
      .join(' ')
      .toLocaleLowerCase(),
  };
}

export function filterGithubProjects(
  projects: GithubProject[],
  { query, selectedTag }: GithubProjectFilters
): GithubProject[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return projects.filter((project) => {
    const matchesQuery = normalizedQuery === '' || project.searchText.includes(normalizedQuery);
    const matchesTag = selectedTag === '' || project.tags.includes(selectedTag);
    return matchesQuery && matchesTag;
  });
}

export function getGithubProjectTags(projects: GithubProject[]): string[] {
  return [...new Set(projects.flatMap((project) => project.tags))].sort();
}

export function parseGithubPageParam(value: string | null): number {
  if (!value) return 1;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

export function paginateGithubProjects(
  projects: GithubProject[],
  page: number,
  pageSize = GITHUB_PAGE_SIZE,
): GithubPaginationResult {
  const totalItems = projects.length;
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);
  const safePage =
    totalPages === 0 ? 1 : Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const startOffset = (safePage - 1) * pageSize;
  const items = projects.slice(startOffset, startOffset + pageSize);

  return {
    items,
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
    startIndex: totalItems === 0 ? 0 : startOffset + 1,
    endIndex: totalItems === 0 ? 0 : startOffset + items.length,
  };
}

/** Page numbers for classic pagination; folds with ellipsis when totalPages > 7. */
export function getGithubPaginationPageNumbers(
  currentPage: number,
  totalPages: number,
): GithubPaginationToken[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}

function getOwnerRepo(repoUrl: string): string {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== 'github.com') return repoUrl;
    return url.pathname.replace(/^\/|\/$/g, '').split('/').slice(0, 2).join('/');
  } catch {
    return repoUrl;
  }
}
