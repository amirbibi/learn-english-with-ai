import React, { createContext, useState, useContext, useMemo } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  PaletteMode,
} from "@mui/material";

interface ThemeContextType {
  mode: PaletteMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    mode: "light",
    primary: { main: "#121212" },
    secondary: { main: "#03DAC6" },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    info: { main: "#64B5F6" },
    success: { main: "#81C784" },
  },
  shape: { borderRadius: 8 },
});

const darkTheme = createTheme({
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

export const ThemeProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
