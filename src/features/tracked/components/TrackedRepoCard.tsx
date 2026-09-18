import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";
import StarIcon from "@mui/icons-material/Star";
import ErrorOutlineIcon from "@mui/icons-material/Error";
import CommitIcon from "@mui/icons-material/Commit";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteOutlineIcon from "@mui/icons-material/Delete";

import type { RepoIdentifier } from "@/lib/github/types";
import { useTrackedRepos } from "@/store/trackedRepos";
import { GitHubErrorAlert } from "@/components/GitHubErrorAlert";
import { formatRelativeDate } from "@/lib/formatRelativeDate";
import { useTrackedRepo } from "@/features/tracked/hooks/useTrackedRepo";

function Stat({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  loading: boolean;
}) {
  return (
    <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
      {icon}
      <Typography variant="body2" color="text.secondary">
        {loading ? <Skeleton width={56} /> : value}
      </Typography>
      <Typography variant="caption" color="text.disabled">
        {label}
      </Typography>
    </Stack>
  );
}

function TrackedRepoCard({ repo }: { repo: RepoIdentifier }) {
  const { repoDetails, isLoading, error, refetch, isFetching, isError } =
    useTrackedRepo(repo);
  const untrack = useTrackedRepos((s) => s.untrack);

  const fullName = `${repo.owner}/${repo.name}`;

  return (
    <Card variant="outlined" sx={{ position: "relative", overflow: "hidden" }}>
      <Box sx={{ height: 4 }}>
        {isFetching && !isLoading && <LinearProgress />}
      </Box>

      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Link
              href={repoDetails?.htmlUrl ?? `https://github.com/${fullName}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtitle1"
              underline="hover"
            >
              {fullName}
            </Link>

            {repoDetails?.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {repoDetails.description}
              </Typography>
            )}
          </Box>

          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Refresh">
              <span>
                <IconButton
                  size="small"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  aria-label={`Refresh ${fullName}`}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Stop tracking">
              <IconButton
                size="small"
                onClick={() => untrack(repo)}
                aria-label={`Stop tracking ${fullName}`}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {isError ? (
          <Box sx={{ mt: 2 }}>
            <GitHubErrorAlert error={error} onRetry={() => refetch()} />
          </Box>
        ) : (
          <Stack
            direction="row"
            spacing={3}
            sx={{ mt: 2, flexWrap: "wrap", rowGap: 1 }}
          >
            <Stat
              icon={<StarIcon fontSize="small" color="warning" />}
              label="stars"
              value={repoDetails?.stars.toLocaleString()}
              loading={isLoading}
            />
            <Stat
              icon={<ErrorOutlineIcon fontSize="small" color="error" />}
              label="open issues"
              value={repoDetails?.openIssues.toLocaleString()}
              loading={isLoading}
            />
            <Stat
              icon={<CommitIcon fontSize="small" color="action" />}
              label="last commit"
              value={formatRelativeDate(repoDetails?.lastCommitDate)}
              loading={isLoading}
            />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export default TrackedRepoCard;
