import { useState } from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import { SearchInput } from "@/features/search/components/SearchInput";
import { SearchResultItem } from "@/features/search/components/SearchResultItem";
import { useRepoSearch } from "@/features/search/hooks/useRepoSearch";
import { GitHubErrorAlert } from "@/components/GithubErrorAlert";

function SearchPage() {
  const [term, setTerm] = useState("");
  const { repos, isLoading, isFetching, isError, error } = useRepoSearch(term);

  const hasTerm = term.trim().length > 0;

  return (
    <Stack spacing={2}>
      <SearchInput value={term} onChange={setTerm} />

      <Box sx={{ height: 4 }}>
        {isFetching && !isLoading && <LinearProgress />}
      </Box>

      {!hasTerm && (
        <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
          Search for a repository to start tracking it.
        </Typography>
      )}

      {hasTerm && isLoading && (
        <Stack spacing={2}>
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} variant="rounded" height={112} />
          ))}
        </Stack>
      )}

      {hasTerm && isError && <GitHubErrorAlert error={error} />}

      {hasTerm && !isLoading && !isError && repos?.length === 0 && (
        <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
          No repositories found.
        </Typography>
      )}

      {repos?.map((repo) => (
        <SearchResultItem key={repo.id} repo={repo} />
      ))}
    </Stack>
  );
}

export default SearchPage;
