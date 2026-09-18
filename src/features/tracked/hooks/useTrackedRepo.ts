import type { RepoIdentifier } from "@/lib/github/types";
import { useQuery } from "@tanstack/react-query";
import { trackedRepoQuery } from "@/features/tracked/helpers/trackedRepoQuery";

export function useTrackedRepo(repo: RepoIdentifier) {
  const {
    data: repoDetails,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery(trackedRepoQuery(repo));

  return { repoDetails, isLoading, isError, error, refetch, isFetching };
}
