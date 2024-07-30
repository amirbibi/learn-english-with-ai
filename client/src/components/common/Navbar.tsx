import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useUserContext } from "../../hooks/useUserContext";
import { useThemeContext } from "../../hooks/useThemeContext";

const Navbar: React.FC = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const { mode, toggleMode } = useThemeContext();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Generate menu items based on user state
  const menuItems = [
    { label: "Concept Explorer", to: "/" },
    ...(user
      ? [{ label: "Logout", onClick: handleLogout }]
      : [
          { label: "Login", to: "/login" },
          { label: "Sign Up", to: "/signup" },
        ]),
  ];

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ maxHeight: "1.5rem", mb: 2 }}
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
          <LogoDevIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              whiteSpace: "nowrap",
              display: { xs: "none", sm: "block" },
            }}
          >
            Learn English with AI
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={item.onClick || handleMenuClose}
                  component={item.to ? RouterLink : "li"}
                  to={item.to}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={item.to ? RouterLink : "button"}
                to={item.to}
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
        <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
