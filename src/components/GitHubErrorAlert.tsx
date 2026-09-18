import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { isGitHubError } from "@/lib/github/errors";

interface GitHubErrorAlertProps {
  error: unknown;
  onRetry?: () => void;
}

function describe(error: unknown): { title: string; detail: string } {
  if (!isGitHubError(error)) {
    return {
      title: "Something went wrong",
      detail: "An unexpected error occurred.",
    };
  }

  switch (error.kind) {
    case "not_found":
      return {
        title: "Not found",
        detail: "This repository no longer exists or was renamed.",
      };
    case "rate_limit":
      return {
        title: "Rate limit reached",
        detail: error.resetAt
          ? `GitHub's limit is exhausted. It resets at ${error.resetAt.toLocaleTimeString()}.`
          : "GitHub's request limit is exhausted. Try again shortly.",
      };
    case "network":
      return {
        title: "Connection problem",
        detail: "Check your connection and try again.",
      };
    default:
      return {
        title: "Request failed",
        detail: `GitHub responded with status ${error.status}.`,
      };
  }
}

export function GitHubErrorAlert({ error, onRetry }: GitHubErrorAlertProps) {
  const { title, detail } = describe(error);
  const canRetry =
    onRetry && !(isGitHubError(error) && error.kind === "rate_limit");

  return (
    <Alert
      severity="error"
      action={
        canRetry ? (
          <Button size="small" onClick={onRetry}>
            Retry
          </Button>
        ) : undefined
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {detail}
    </Alert>
  );
}
