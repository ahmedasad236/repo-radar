import { useQueries } from "@tanstack/react-query";
import { BarChart } from "@mui/x-charts/BarChart";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

import type { RepoIdentifier } from "@/lib/github/types";
import { trackedRepoQuery } from "@/features/tracked/helpers/trackedRepoQuery";

const CHART_HEIGHT = 320;

export function StarsChart({ repos }: { repos: RepoIdentifier[] }) {
  const results = useQueries({
    queries: repos.map(trackedRepoQuery),
  });

  const loaded = results.flatMap((r) => (r.data ? [r.data] : []));
  const isInitialLoad = loaded.length === 0 && results.some((r) => r.isLoading);

  const sorted = [...loaded].sort((a, b) => b.stars - a.stars);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" component="h2" gutterBottom>
        Stars per repository
      </Typography>

      {isInitialLoad && <Skeleton variant="rounded" height={CHART_HEIGHT} />}

      {!isInitialLoad && sorted.length === 0 && (
        <Box
          sx={{ height: CHART_HEIGHT, display: "grid", placeItems: "center" }}
        >
          <Typography variant="body2" color="text.secondary">
            No data available yet.
          </Typography>
        </Box>
      )}

      {sorted.length > 0 && (
        <BarChart
          height={CHART_HEIGHT}
          dataset={sorted.map((repo) => ({
            name: repo.name,
            stars: repo.stars,
          }))}
          xAxis={[{ dataKey: "name", scaleType: "band" }]}
          yAxis={[{ label: "stars" }]}
          series={[
            {
              dataKey: "stars",
              label: "Stars",
              valueFormatter: (v) => (v ?? 0).toLocaleString(),
            },
          ]}
          margin={{ left: 70, bottom: 60 }}
        />
      )}
    </Paper>
  );
}
