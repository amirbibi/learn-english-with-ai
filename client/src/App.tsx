import React from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  GlobalStyles,
} from "@mui/material";
import ConceptExplorer from "./components/ConceptExplorer/ConceptExplorer.tsx";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#03DAC6",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    info: {
      main: "#64B5F6",
    },
    success: {
      main: "#81C784",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const globalStyles = {
  "@import":
    "url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap')",
  body: {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    fontFamily: '"Poppins", sans-serif',
  },
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <ConceptExplorer />
    </ThemeProvider>
  );
};

export default App;
