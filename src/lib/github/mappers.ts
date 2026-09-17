import type {
  GitHubCommit,
  GitHubRepo,
  RepoDetails,
  RepoSummary,
} from "./types";

export function toRepoSummary(repo: GitHubRepo): RepoSummary {
  return {
    id: repo.id,
    owner: repo.owner.login,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    htmlUrl: repo.html_url,
    stars: repo.stargazers_count,
    openIssues: repo.open_issues_count,
  };
}

export function toRepoDetails(
  repo: GitHubRepo,
  commits: GitHubCommit[],
): RepoDetails {
  return {
    ...toRepoSummary(repo),
    lastCommitDate: commits[0]?.commit.author?.date ?? null,
  };
}
