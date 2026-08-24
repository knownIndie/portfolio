const GITHUB_API_URL = "https://api.github.com";
const CONTRIBUTIONS_API_URL = "https://github-contributions-api.jogruber.de/v4";
const GITHUB_USERNAME = "knownIndie";
const IGNORED_REPOSITORIES = new Set([
  "knownIndie",
  "neetcode-submissions",
  "placement-26",
  "portfolio",
  "skills",
]);

type GitHubRepository = {
  name: string;
  full_name: string;
  html_url: string;
  pushed_at: string | null;
  fork: boolean;
  archived: boolean;
};

type GitHubCommitResponse = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author?: {
      date?: string | null;
    } | null;
  };
};

export type GitHubRecentCommit = {
  id: string;
  message: string;
  repository: string;
  repositoryUrl: string;
  commitUrl: string;
  date: string;
};

export type GitHubActivity = {
  username: string;
  profileUrl: string;
  publicRepositoryCount: number;
  recentCommits: GitHubRecentCommit[];
};

export type GitHubContribution = {
  date: string;
  count: number;
  level: number;
};

type GitHubContributionResponse = {
  total?: {
    lastYear?: number;
  };
  contributions?: GitHubContribution[];
};

export type GitHubContributions = {
  username: string;
  profileUrl: string;
  total: number;
  contributions: GitHubContribution[];
};

export type GitHubProjectContribution = {
  id: string;
  message: string;
  commitUrl: string;
  date: string;
};

async function fetchGitHub<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Aryan-Bhardwaj-Portfolio",
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchPublicJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Aryan-Bhardwaj-Portfolio",
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getGitHubActivity(
  username = GITHUB_USERNAME,
): Promise<GitHubActivity> {
  const repositories = await fetchGitHub<GitHubRepository[]>(
    `${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
  );

  const candidates = (repositories ?? [])
    .filter(
      (repository) =>
        !repository.fork &&
        !repository.archived &&
        !IGNORED_REPOSITORIES.has(repository.name),
    )
    .filter((repository) => repository.pushed_at)
    .sort(
      (a, b) =>
        new Date(b.pushed_at ?? 0).getTime() -
        new Date(a.pushed_at ?? 0).getTime(),
    )
    .slice(0, 8);

  const commitsByRepository = await Promise.all(
    candidates.map(async (repository) => {
      const commits = await fetchGitHub<GitHubCommitResponse[]>(
        `${GITHUB_API_URL}/repos/${repository.full_name}/commits?author=${encodeURIComponent(username)}&per_page=3`,
      );

      return (commits ?? []).map((commit) => ({
        id: commit.sha,
        message: commit.commit.message.split(/\r?\n/, 1)[0],
        repository: repository.name,
        repositoryUrl: repository.html_url,
        commitUrl: commit.html_url,
        date: commit.commit.author?.date ?? repository.pushed_at ?? "",
      }));
    }),
  );

  const recentCommits = commitsByRepository
    .flat()
    .filter((commit) => commit.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return {
    username,
    profileUrl: `https://github.com/${username}`,
    publicRepositoryCount: repositories?.length ?? 0,
    recentCommits,
  };
}

export async function getGitHubContributions(
  username = GITHUB_USERNAME,
): Promise<GitHubContributions> {
  const data = await fetchPublicJson<GitHubContributionResponse>(
    `${CONTRIBUTIONS_API_URL}/${encodeURIComponent(username)}?y=last`,
  );
  const contributions = data?.contributions ?? [];
  const total =
    data?.total?.lastYear ??
    contributions.reduce((sum, contribution) => sum + contribution.count, 0);

  return {
    username,
    profileUrl: `https://github.com/${username}`,
    total,
    contributions,
  };
}

function getGitHubRepositoryPath(repositoryUrl: string): string | null {
  try {
    const url = new URL(repositoryUrl);
    if (url.hostname !== "github.com") return null;

    const [owner, repository] = url.pathname
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.replace(/\.git$/, ""));

    if (!owner || !repository) return null;
    return `${owner}/${repository}`;
  } catch {
    return null;
  }
}

export async function getGitHubProjectContributions(
  repositoryUrl?: string,
  username = GITHUB_USERNAME,
): Promise<GitHubProjectContribution[]> {
  if (!repositoryUrl) return [];

  const repositoryPath = getGitHubRepositoryPath(repositoryUrl);
  if (!repositoryPath) return [];

  const commits = await fetchGitHub<GitHubCommitResponse[]>(
    `${GITHUB_API_URL}/repos/${repositoryPath}/commits?author=${encodeURIComponent(username)}&per_page=8`,
  );

  return (commits ?? [])
    .filter((commit) => commit.commit.author?.date)
    .map((commit) => ({
      id: commit.sha,
      message: commit.commit.message.split(/\r?\n/, 1)[0],
      commitUrl: commit.html_url,
      date: commit.commit.author?.date ?? "",
    }));
}
