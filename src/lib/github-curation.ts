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
  slug: string;
  href: string;
  ownerRepo: string;
  searchText: string;
};

export type GithubProjectFilters = {
  query: string;
  selectedTag: string;
};

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
    slug: entry.slug,
    href: `/github/${entry.slug}/`,
    ownerRepo,
  };

  return {
    ...project,
    searchText: [
      project.title,
      project.description,
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

function getOwnerRepo(repoUrl: string): string {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== 'github.com') return repoUrl;
    return url.pathname.replace(/^\/|\/$/g, '').split('/').slice(0, 2).join('/');
  } catch {
    return repoUrl;
  }
}
