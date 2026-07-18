import { useQuery } from '@tanstack/react-query';
import { fetchGitHubRepos, fetchGitHubProfile, GitHubRepo, GitHubProfile } from '@/lib/github';

export function useGitHubRepos(username: string) {
  return useQuery<GitHubRepo[]>({
    queryKey: ['github-repos', username],
    queryFn: () => fetchGitHubRepos(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useGitHubProfile(username: string) {
  return useQuery<GitHubProfile>({
    queryKey: ['github-profile', username],
    queryFn: () => fetchGitHubProfile(username),
    enabled: !!username,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}
