import React, { lazy, Suspense } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  GlobalStyles,
  Box,
  Container,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./components/common/PrivateRoute";
import { useUserContext } from "./hooks/useUserContext";
import PublicRoute from "./components/common/PublicRoute";
import ConceptExplorer from "./components/ConceptExplorer/ConceptExplorer";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy load components
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const AuthSuccess = lazy(() => import("./components/auth/AuthSuccess"));
const AuthError = lazy(() => import("./components/auth/AuthError"));

// Create MUI theme
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    mode: "dark",
    primary: { main: "#FFFFFF" },
    secondary: { main: "#03DAC6" },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    info: { main: "#64B5F6" },
    success: { main: "#81C784" },
  },
  shape: { borderRadius: 8 },
});

// Global styles
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

const AppRoutes: React.FC = () => (
  <Suspense fallback={<LoadingSpinner size={60} />}>
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<ConceptExplorer />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/auth-error" element={<AuthError />} />
      </Route>
    </Routes>
  </Suspense>
);

const AppContent: React.FC = () => {
  const { isLoading } = useUserContext();

  if (isLoading) {
    return <LoadingSpinner size={60} />;
  }

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppRoutes />
      </Box>
    </Container>
  );
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles styles={globalStyles} />
    <UserProvider>
      <AppContent />
    </UserProvider>
  </ThemeProvider>
);

export default App;
