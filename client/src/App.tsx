import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  Box,
  Container,
} from "@mui/material";
import { UserProvider } from "./contexts/UserContext";
import { useUserContext } from "./hooks/useUserContext";
import Navbar from "./components/common/Navbar";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { AppRoutes } from "./routes";
import { theme, globalStyles } from "./theme";

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
