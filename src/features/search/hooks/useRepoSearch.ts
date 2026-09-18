import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { githubKeys } from "@/lib/github/queryKeys";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { searchRepos } from "@/lib/github/endpoints";

export function useRepoSearch(searchValue: string) {
  const term = useDebouncedValue(searchValue).trim();
  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: githubKeys.searchTerm(term),
    queryFn: () => searchRepos(term),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    enabled: term.length > 0,
  });

  return { repos: data, isFetching, isLoading, isError, error };
}
