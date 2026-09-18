import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";

import { useTrackedRepos } from "@/store/trackedRepos";
import { githubKeys } from "@/lib/github/queryKeys";
import TrackedRepoCard from "@/features/tracked/components/TrackedRepoCard";
import { StarsChart } from "@/features/tracked/components/StarsChart";

function TrackedPage() {
  const trackedRepos = useTrackedRepos((s) => s.trackedRepos);
  const queryClient = useQueryClient();

  const fetchingCount = useIsFetching({ queryKey: githubKeys.tracked() });

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: githubKeys.tracked() });
  };

  if (trackedRepos.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 6, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          No repositories tracked yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use the Search tab to find repositories and start tracking them.
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="h6" component="h2">
          Tracked repositories ({trackedRepos.length})
        </Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={refreshAll}
          disabled={fetchingCount > 0}
        >
          {fetchingCount > 0 ? `Refreshing ${fetchingCount}…` : "Refresh all"}
        </Button>
      </Stack>

      <Box>
        <StarsChart repos={trackedRepos} />
        <Stack spacing={2}>
          {trackedRepos.map((repo) => (
            <TrackedRepoCard key={`${repo.owner}/${repo.name}`} repo={repo} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export default TrackedPage;
