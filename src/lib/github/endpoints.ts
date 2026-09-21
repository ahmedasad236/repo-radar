import { githubFetch } from "./client";
import { isGitHubError } from "./errors";
import { toRepoDetails, toRepoSummary } from "./mappers";
import type {
  GitHubCommit,
  GitHubRepo,
  GitHubSearchResponse,
  RepoDetails,
  RepoIdentifier,
  RepoSummary,
} from "./types";

const SEARCH_PER_PAGE = 10;

export async function searchRepos(
  term: string,
  perPage: number = SEARCH_PER_PAGE,
): Promise<RepoSummary[]> {
  const query = encodeURIComponent(term);
  const data = await githubFetch<GitHubSearchResponse>(
    `/search/repositories?q=${query}&per_page=${perPage}`,
  );
  return data.items.map(toRepoSummary);
}

export function fetchRepo({ owner, name }: RepoIdentifier) {
  return githubFetch<GitHubRepo>(`/repos/${owner}/${name}`);
}

export async function fetchLastCommit({
  owner,
  name,
}: RepoIdentifier): Promise<GitHubCommit[]> {
  try {
    return await githubFetch<GitHubCommit[]>(
      `/repos/${owner}/${name}/commits?per_page=1`,
    );
  } catch (error) {
    // 409 = empty repo (no commits yet), not a real error.
    if (isGitHubError(error) && error.status === 409) {
      return [];
    }
    throw error;
  }
}

export async function fetchRepoDetails(
  id: RepoIdentifier,
): Promise<RepoDetails> {
  const [repo, commits] = await Promise.all([
    fetchRepo(id),
    fetchLastCommit(id),
  ]);
  return toRepoDetails(repo, commits);
}
