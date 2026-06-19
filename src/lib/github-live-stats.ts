export type LiveRepoStats = {
  description: string;
  avatarUrl: string;
  stars: number;
  forks: number;
  openIssues: number;
};

type GithubRepoPayload = {
  description?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  owner?: { avatar_url?: string };
};

export function parseOwnerRepo(repoUrl: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== 'github.com') return null;
    const [owner, repo] = url.pathname.replace(/^\/|\/$/g, '').split('/').slice(0, 2);
    if (!owner || !repo) return null;
    return { owner, repo };
  } catch {
    return null;
  }
}

export function normalizeRepoStats(payload: unknown): LiveRepoStats | null {
  if (!payload || typeof payload !== 'object') return null;
  const data = payload as GithubRepoPayload;
  const avatarUrl = data.owner?.avatar_url;
  if (!avatarUrl || typeof data.stargazers_count !== 'number') return null;

  return {
    description: (data.description ?? '').trim(),
    avatarUrl,
    stars: data.stargazers_count,
    forks: data.forks_count ?? 0,
    openIssues: data.open_issues_count ?? 0,
  };
}

export async function fetchLiveRepoStats(owner: string, repo: string): Promise<LiveRepoStats | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) return null;
    const payload: unknown = await response.json();
    return normalizeRepoStats(payload);
  } catch {
    return null;
  }
}
