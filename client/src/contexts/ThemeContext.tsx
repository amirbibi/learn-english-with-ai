import React, { createContext, useState, useMemo } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  PaletteMode,
  Theme,
} from "@mui/material";

// Define the shape of the context
export interface ThemeContextType {
  mode: PaletteMode;
  toggleMode: () => void;
  theme: Theme;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Define base theme options
const baseThemeOptions = {
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  shape: { borderRadius: 8 },
};

// Create theme function
const createAppTheme = (mode: PaletteMode): Theme =>
  createTheme({
    ...baseThemeOptions,
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#121212" },
            secondary: { main: "#028db3" },
            background: {
              default: "#FFFFFF",
              paper: "#F5F5F5",
            },
          }
        : {
            primary: { main: "#FFFFFF" },
            secondary: { main: "#03DAC6" },
            background: {
              default: "#121212",
              paper: "#1E1E1E",
            },
          }),
      info: { main: "#64B5F6" },
      success: { main: "#81C784" },
    },
  });

// Props type for the ThemeProvider component
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: PaletteMode;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = "dark",
}) => {
  const [mode, setMode] = useState<PaletteMode>(defaultMode);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const contextValue = useMemo(
    () => ({ mode, toggleMode, theme }),
    [mode, theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
