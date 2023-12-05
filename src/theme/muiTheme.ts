import { PaletteMode, ThemeOptions } from '@mui/material';
import '@fontsource/roboto';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/500-italic.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700-italic.css';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/900-italic.css';
const TopicColor = '#00404e';
const SubColor = '#ffe6d4';

export const getMode = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  primary: {
                      main: TopicColor,
                      contrastText: '#fff',
                      light: '#005468',
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
                      default: '#fffaf9',
                      paper: '#fff',
                  },
              }
            : {
                  primary: {
                      main: TopicColor,
                      light: '#005468',
                  },
                  secondary: {
                      main: SubColor,
                  },
                  text: {
                      primary: '#fff',
                  },
                  divider: '#fff',
                  background: {
                      default: '#fffaf9',
                      paper: TopicColor,
                  },
              }),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '40px',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: TopicColor,
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-display: swap;
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
        },
    },
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
});
