export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  fork: boolean;
  visibility: string;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

const GITHUB_USERNAME = 'YUKIHANA-REALMS';
const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return response.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=${perPage}&page=${page}`
    );
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data: GitHubRepo[] = await response.json();
    repos.push(...data);
    if (data.length < perPage) break;
    page++;
  }

  return repos.filter(repo => !repo.fork && repo.visibility === 'public');
}

export function repoToProject(repo: GitHubRepo) {
  const year = new Date(repo.pushed_at).getFullYear().toString();
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  if (repo.topics) tags.push(...repo.topics.slice(0, 4));

  let status: string;
  if (repo.archived) {
    status = 'archived';
  } else if (repo.stargazers_count > 5 || repo.forks_count > 2) {
    status = 'production';
  } else {
    status = 'development';
  }

  return {
    name: repo.name,
    year,
    description: repo.description || `A ${repo.language || 'software'} project`,
    tags: tags.length > 0 ? tags : ['GitHub'],
    status,
    featured: repo.stargazers_count > 3,
    liveLink: repo.homepage || '',
    githubLink: repo.html_url,
    logoUrl: '',
    _githubId: repo.id,
  };
}
