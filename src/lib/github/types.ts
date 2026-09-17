// ---------- API response shapes (snake_case, as GitHub returns them) ----------

export interface GitHubOwner {
  login: string;
  avatar_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  open_issues_count: number;
  owner: GitHubOwner;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepo[];
}

export interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      date: string; // ISO 8601
    } | null;
  };
}

// ---------- Domain types (camelCase, owned by the app) ----------

export interface RepoIdentifier {
  owner: string;
  name: string;
}

export interface RepoSummary extends RepoIdentifier {
  id: number;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  openIssues: number;
}

export interface RepoDetails extends RepoSummary {
  lastCommitDate: string | null;
}
