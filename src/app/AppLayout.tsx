import type { PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";

import { PAGES, type PageKey } from "../pages/registry";
import { useTrackedRepos } from "../store/trackedRepos";
import { useThemeMode } from "./themeMode";

interface AppLayoutProps extends PropsWithChildren {
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
}

const PAGE_KEYS = Object.keys(PAGES) as PageKey[];

function AppLayout({ activePage, onPageChange, children }: AppLayoutProps) {
  const trackedCount = useTrackedRepos((s) => s.trackedRepos.length);
  const { mode, toggle } = useThemeMode();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        elevation={0}
        color="default"
        sx={{
          backdropFilter: "blur(12px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.72),
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            GitHub Dashboard
          </Typography>

          <Tabs
            value={activePage}
            onChange={(_, value: PageKey) => onPageChange(value)}
            textColor="primary"
            indicatorColor="primary"
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
                  sx={{ minHeight: 64, textTransform: "none" }}
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

          <Tooltip
            title={
              mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <IconButton
              onClick={toggle}
              sx={{ ml: 0.5 }}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
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
