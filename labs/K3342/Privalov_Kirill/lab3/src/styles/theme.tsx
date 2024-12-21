import { createTheme } from "@mui/material";

export interface ThemeType {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    white: string;
    gray: string;
  };
  shadows: {
    default: string;
    soft: string;
  };
  borderRadius: {
    default: string;
    small: string;
  };
}

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2c3e50",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#3498db",
    },
    secondary: {
      main: "#2ecc71",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
  },
});

export default theme;
