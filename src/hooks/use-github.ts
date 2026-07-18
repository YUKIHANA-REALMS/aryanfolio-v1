import { useQuery } from '@tanstack/react-query';
import { fetchGitHubRepos, fetchGitHubProfile, GitHubRepo, GitHubProfile } from '@/lib/github';

export function useGitHubRepos() {
  return useQuery<GitHubRepo[]>({
    queryKey: ['github-repos'],
    queryFn: fetchGitHubRepos,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useGitHubProfile() {
  return useQuery<GitHubProfile>({
    queryKey: ['github-profile'],
    queryFn: fetchGitHubProfile,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}
