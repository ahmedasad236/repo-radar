import { useState } from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import { SearchInput } from "@/features/search/components/SearchInput";
import { SearchResultItem } from "@/features/search/components/SearchResultItem";
import { useRepoSearch } from "@/features/search/hooks/useRepoSearch";
import { GitHubErrorAlert } from "@/components/GitHubErrorAlert";

const SKELETON_COUNT = 5;

function Message({ children }: { children: React.ReactNode }) {
  return (
    <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
      {children}
    </Typography>
  );
}

function SearchPage() {
  const [term, setTerm] = useState("");
  const { repos, isLoading, isFetching, isError, error } = useRepoSearch(term);

  const hasTerm = term.trim().length > 0;

  function renderResults() {
    if (!hasTerm) {
      return <Message>Search for a repository to start tracking it.</Message>;
    }

    if (isLoading) {
      return (
        <Stack spacing={2}>
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <Skeleton key={i} variant="rounded" height={112} />
          ))}
        </Stack>
      );
    }

    if (isError) {
      return <GitHubErrorAlert error={error} />;
    }

    if (!repos?.length) {
      return <Message>No repositories found.</Message>;
    }

    return (
      <Stack spacing={2}>
        {repos.map((repo) => (
          <SearchResultItem key={repo.id} repo={repo} />
        ))}
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <SearchInput value={term} onChange={setTerm} />

      <Box sx={{ height: 4 }}>
        {isFetching && !isLoading && <LinearProgress />}
      </Box>

      {renderResults()}
    </Stack>
  );
}

export default SearchPage;
