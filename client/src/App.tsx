import React from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  GlobalStyles,
  Box,
  CircularProgress,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ConceptExplorer from "./components/ConceptExplorer/ConceptExplorer";
import Navbar from "./components/common/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./components/common/PrivateRoute";
import { useUserContext } from "./hooks/useUserContext";
import PublicRoute from "./components/common/PublicRoute";

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
    flexDirection: "column",
    backgroundColor: "#121212",
    fontFamily: '"Poppins", sans-serif',
  },
};

const AppContent: React.FC = () => {
  const { isLoading } = useUserContext();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<ConceptExplorer />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
