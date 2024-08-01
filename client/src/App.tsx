import React from "react";
import {
  CssBaseline,
  GlobalStyles,
  Box,
  Container,
  Skeleton,
} from "@mui/material";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useUserContext } from "./hooks/useUserContext";
import Navbar from "./components/common/Navbar";
import { AppRoutes } from "./routes";
import { globalStyles } from "./styles/globalStyles";

const AppContent: React.FC = () => {
  const { isLoading } = useUserContext();

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height="100vh" />;
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
  <ThemeProvider>
    <CssBaseline />
    <GlobalStyles styles={globalStyles} />
    <UserProvider>
      <AppContent />
    </UserProvider>
  </ThemeProvider>
);

export default App;
