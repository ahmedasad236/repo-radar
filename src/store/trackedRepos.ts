import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { RepoIdentifier } from "../lib/github/types";
import { sameRepo } from "../helpers/sameRepo";

interface TrackedReposStat {
  trackedRepos: RepoIdentifier[];

  track(repo: RepoIdentifier): void;
  untrack(repo: RepoIdentifier): void;
}

export const useTrackedRepos = create<TrackedReposStat>()(
  persist(
    (set) => ({
      trackedRepos: [],

      track: (repo) =>
        set((state) =>
          state.trackedRepos.some((r) => sameRepo(r, repo))
            ? state
            : { trackedRepos: [...state.trackedRepos, repo] },
        ),

      untrack: (repo) =>
        set((state) => ({
          trackedRepos: state.trackedRepos.filter((r) => !sameRepo(r, repo)),
        })),
    }),
    {
      name: "repo-radar:tracked-repos",
      version: 1,
      partialize: (state) => ({ trackedRepos: state.trackedRepos }),
    },
  ),
);

export const useIsTracked = (repo: RepoIdentifier) =>
  useTrackedRepos((s) => s.trackedRepos.some((r) => sameRepo(r, repo)));
