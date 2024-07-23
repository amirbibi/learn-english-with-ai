import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { useUserContext } from "../../hooks/useUserContext";

const Navbar: React.FC = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <AppBar
      sx={{ minWidth: "800px" }}
      position="static"
      color="transparent"
      elevation={0}
    >
      <Toolbar>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
              textDecoration: "none",
              color: "inherit",
            },
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <LogoDevIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, whiteSpace: "nowrap" }}
          >
            Learn English with AI
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Concept Explorer
          </Button>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
