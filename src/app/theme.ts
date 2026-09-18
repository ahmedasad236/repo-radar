import { createTheme, alpha, type Theme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

// A shared brand hue so light and dark feel like the same product.
const BRAND = {
  primary: "#5b5bd6", // indigo / iris
  primaryDark: "#7c7cf0",
  secondary: "#e5484d", // used for the "tracked" accent / badges
};

function paletteFor(mode: ThemeMode) {
  if (mode === "light") {
    return {
      mode,
      primary: { main: BRAND.primary },
      secondary: { main: BRAND.secondary },
      background: { default: "#f6f7f9", paper: "#ffffff" },
      divider: "rgba(15, 18, 32, 0.10)",
      text: { primary: "#1b1f2a", secondary: "#5a6272" },
    } as const;
  }
  return {
    mode,
    primary: { main: BRAND.primaryDark },
    secondary: { main: "#ff6369" },
    background: { default: "#0d1017", paper: "#151922" },
    divider: "rgba(240, 246, 255, 0.12)",
    text: { primary: "#e7ebf3", secondary: "#9aa4b6" },
  } as const;
}

export function createAppTheme(mode: ThemeMode): Theme {
  const palette = paletteFor(mode);

  return createTheme({
    palette,
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      h1: { fontWeight: 700 },
      h6: { fontWeight: 700, letterSpacing: "-0.01em" },
      subtitle1: { fontWeight: 600 },
      button: { fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage:
              mode === "light"
                ? `radial-gradient(1200px 600px at 100% -10%, ${alpha(
                    BRAND.primary,
                    0.08,
                  )}, transparent 60%)`
                : `radial-gradient(1200px 600px at 100% -10%, ${alpha(
                    BRAND.primaryDark,
                    0.12,
                  )}, transparent 60%)`,
            backgroundAttachment: "fixed",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: "none", borderRadius: 10 } },
      },
      MuiCard: {
        defaultProps: { variant: "outlined" },
        styleOverrides: {
          root: ({ theme }) => ({
            transition: theme.transitions.create(
              ["border-color", "box-shadow", "transform"],
              { duration: theme.transitions.duration.shorter },
            ),
            "&:hover": {
              borderColor: alpha(theme.palette.primary.main, 0.5),
              boxShadow: `0 6px 24px ${alpha(
                theme.palette.common.black,
                mode === "light" ? 0.08 : 0.4,
              )}`,
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: "none" } },
      },
      MuiTooltip: {
        styleOverrides: { tooltip: { fontSize: "0.75rem" } },
      },
    },
  });
}
