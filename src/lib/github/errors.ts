export type GitHubErrorKind =
  | "not_found"
  | "rate_limit"
  | "network"
  | "unknown";

export class GitHubError extends Error {
  readonly kind: GitHubErrorKind;
  readonly status: number;
  readonly resetAt?: Date;

  constructor(
    message: string,
    kind: GitHubErrorKind,
    status: number,
    resetAt?: Date,
  ) {
    super(message);
    this.name = "GitHubError";
    this.kind = kind;
    this.status = status;
    this.resetAt = resetAt;
    Object.setPrototypeOf(this, GitHubError.prototype);
  }
}

export function isGitHubError(e: unknown): e is GitHubError {
  return e instanceof GitHubError;
}
