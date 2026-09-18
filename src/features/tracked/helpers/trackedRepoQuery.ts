import { queryOptions } from "@tanstack/react-query";
import { fetchRepoDetails } from "@/lib/github/endpoints";
import { githubKeys } from "@/lib/github/queryKeys";
import type { RepoIdentifier } from "@/lib/github/types";

export function trackedRepoQuery(repo: RepoIdentifier) {
  return queryOptions({
    queryKey: githubKeys.trackedRepo(repo),
    queryFn: () => fetchRepoDetails(repo),
  });
}
