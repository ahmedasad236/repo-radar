import { GitHubError } from "./errors";

const BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export async function githubFetch<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  };

  let response: Response;
  try {
    response = await fetch(url, { headers });
  } catch {
    throw new GitHubError("Network request failed", "network", 0);
  }

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");

    if (response.status === 403 && remaining === "0") {
      const reset = response.headers.get("x-ratelimit-reset");
      const resetAt = reset ? new Date(Number(reset) * 1000) : undefined;
      throw new GitHubError(
        "GitHub rate limit exceeded",
        "rate_limit",
        403,
        resetAt,
      );
    }

    if (response.status === 404) {
      throw new GitHubError("Resource not found", "not_found", 404);
    }

    throw new GitHubError(
      `GitHub request failed with status ${response.status}`,
      "unknown",
      response.status,
    );
  }

  return (await response.json()) as T;
}
