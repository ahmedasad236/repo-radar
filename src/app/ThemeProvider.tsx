import { useCallback, useMemo, useState, type ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { createAppTheme, type ThemeMode } from "./theme";
import { ThemeContext } from "./themeMode";

const STORAGE_KEY = "repo-radar:color-mode";

function readStored(): ThemeMode | null {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "light" || value === "dark" ? value : null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  // `null` means "follow the system" until the user makes an explicit choice.
  const [override, setOverride] = useState<ThemeMode | null>(readStored);

  const mode: ThemeMode = override ?? (prefersDark ? "dark" : "light");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggle = useCallback(() => {
    setOverride((current) => {
      const base = current ?? (prefersDark ? "dark" : "light");
      const next: ThemeMode = base === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, [prefersDark]);

  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
