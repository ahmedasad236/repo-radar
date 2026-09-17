import { QueryClient } from "@tanstack/react-query";
import { isGitHubError } from "../lib/github/errors";

const MAX_RETRIES = 2;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (isGitHubError(error)) {
          // Neither a missing repo nor an exhausted rate limit
          // will resolve by asking again.
          if (error.kind === "not_found" || error.kind === "rate_limit") {
            return false;
          }
        }
        return failureCount < MAX_RETRIES;
      },
    },
  },
});
