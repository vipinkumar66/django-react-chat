import { createTheme, responsiveFontSizes } from "@mui/material";

/**
 * Extends the default MUI Theme interface to include custom theme properties.
 */
declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: number;
    };
    primaryDraw: {
      width: number;
      closed: number;
    };
    secondaryDraw: {
      width: number;
    };
  }
  interface ThemeOptions {
    primaryAppBar: {
      height: number;
    };
    primaryDraw: {
      width: number;
      closed: number;
    };
    secondaryDraw: {
      width: number;
    };
  }
}

/**
 * Creates a custom MUI theme with specified properties.
 * @param {string} mode - The color mode of the theme ("light" or "dark").
 * @returns {Theme} The customized MUI theme.
 */
export const createMuiTheme = (mode: "light" | "dark") => {
  // Create a base MUI theme
  let theme = createTheme({
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
      body1: {
        fontWeight: 500,
        letterSpacing: "-0.5px",
      },
      body2: {
        fontWeight: 500,
        fontSize: "15px",
        letterSpacing: "-0.5px",
      },
    },
    primaryAppBar: {
      height: 50,
    },
    primaryDraw: {
      width: 240,
      closed: 70,
    },
    secondaryDraw: {
      width: 240,
    },
    palette: {
      mode, // Set the color mode of the theme
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
  });

  // Make the font sizes responsive
  theme = responsiveFontSizes(theme);
  return theme;
};

export default createMuiTheme;
