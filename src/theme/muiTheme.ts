import { PaletteMode, ThemeOptions } from "@mui/material";

const TopicColor = "#00404e";
const SubColor = "#ffe6d4";

export const getMode = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: TopicColor,
            contrastText: "#fff",
            light: "#005468",
          },
          secondary: {
            main: SubColor,
            contrastText: TopicColor,
          },
          text: {
            primary: TopicColor,
          },
          divider: TopicColor,
          background: {
            default: "#fff",
            paper: "#fff",
          },
        }
      : {
          primary: {
            main: TopicColor,
            light: "#005468",
          },
          secondary: {
            main: SubColor,
          },
          text: {
            primary: "#fff",
          },
          divider: "#fff",
          background: {
            default: TopicColor,
            paper: TopicColor,
          },
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "40px",
        },
      },
    },
  },
});
