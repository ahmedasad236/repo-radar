import type { RepoIdentifier } from "./types";

export const githubKeys = {
  all: ["github"] as const,

  search: () => [...githubKeys.all, "search"] as const,
  searchTerm: (term: string) => [...githubKeys.search(), term] as const,

  tracked: () => [...githubKeys.all, "tracked"] as const,
  trackedRepo: ({ owner, name }: RepoIdentifier) =>
    [...githubKeys.tracked(), owner, name] as const,
};
