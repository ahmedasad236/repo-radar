import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StarIcon from "@mui/icons-material/Star";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import type { RepoSummary } from "@/lib/github/types";
import { useTrackedRepos, useIsTracked } from "@/store/trackedRepos";

export function SearchResultItem({ repo }: { repo: RepoSummary }) {
  const tracked = useIsTracked(repo);
  const track = useTrackedRepos((s) => s.track);
  const untrack = useTrackedRepos((s) => s.untrack);

  const id = { owner: repo.owner, name: repo.name };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Link
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtitle1"
              underline="hover"
            >
              {repo.fullName}
            </Link>

            {repo.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {repo.description}
              </Typography>
            )}

            <Stack
              direction="row"
              spacing={0.5}
              sx={{ mt: 1, alignItems: "center" }}
            >
              <StarIcon fontSize="inherit" color="warning" />
              <Typography variant="caption" color="text.secondary">
                {repo.stars.toLocaleString()}
              </Typography>
            </Stack>
          </Box>

          <Tooltip title={tracked ? "Untrack repository" : "Track repository"}>
            <IconButton
              onClick={() => (tracked ? untrack(id) : track(id))}
              aria-label={
                tracked ? `Untrack ${repo.fullName}` : `Track ${repo.fullName}`
              }
              color={tracked ? "primary" : "default"}
            >
              {tracked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
}
