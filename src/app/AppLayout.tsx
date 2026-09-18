import type { PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { PAGES, type PageKey } from "../pages/registry";
import { useTrackedRepos } from "../store/trackedRepos";

interface AppLayoutProps extends PropsWithChildren {
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
}

const PAGE_KEYS = Object.keys(PAGES) as PageKey[];

function AppLayout({ activePage, onPageChange, children }: AppLayoutProps) {
  const trackedCount = useTrackedRepos((s) => s.trackedRepos.length);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            GitHub Dashboard
          </Typography>

          <Tabs
            value={activePage}
            onChange={(_, value: PageKey) => onPageChange(value)}
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="Main navigation"
          >
            {PAGE_KEYS.map((key) => {
              const { label, icon: Icon } = PAGES[key];
              const showBadge = key === "tracked" && trackedCount > 0;

              return (
                <Tab
                  key={key}
                  value={key}
                  icon={<Icon fontSize="small" />}
                  iconPosition="start"
                  label={
                    showBadge ? (
                      <Badge badgeContent={trackedCount} color="secondary">
                        <Box sx={{ pr: 1.5 }}>{label}</Box>
                      </Badge>
                    ) : (
                      label
                    )
                  }
                  id={`tab-${key}`}
                  aria-controls={`panel-${key}`}
                />
              );
            })}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 3, flexGrow: 1 }}
        role="tabpanel"
        id={`panel-${activePage}`}
        aria-labelledby={`tab-${activePage}`}
      >
        {children}
      </Container>
    </Box>
  );
}

export default AppLayout;
