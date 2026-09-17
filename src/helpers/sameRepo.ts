import type { RepoIdentifier } from "../lib/github/types";

export function sameRepo(
  repo_a: RepoIdentifier,
  repo_b: RepoIdentifier,
): boolean {
  return repo_a.name === repo_b.name && repo_a.owner === repo_b.owner;
}
