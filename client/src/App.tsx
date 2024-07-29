import React from "react";
import { CssBaseline, GlobalStyles, Box, Container } from "@mui/material";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useUserContext } from "./hooks/useUserContext";
import Navbar from "./components/common/Navbar";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { AppRoutes } from "./routes";

const globalStyles = {
  "@import":
    "url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap')",
  body: {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: '"Poppins", sans-serif',
  },
};

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
  <ThemeProvider>
    <CssBaseline />
    <GlobalStyles styles={globalStyles} />
    <UserProvider>
      <AppContent />
    </UserProvider>
  </ThemeProvider>
);

export default App;
