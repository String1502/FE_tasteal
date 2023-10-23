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

export const MainShadow =
  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px";
export const HoverShadow =
  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px";
