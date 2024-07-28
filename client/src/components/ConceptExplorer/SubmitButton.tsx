import React from "react";
import {
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";

interface SubmitButtonProps {
  isSubmitted: boolean;
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitted,
  isLoading,
  disabled,
  onClick,
}) => {
  // Get theme and media query functions
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled || isLoading}
      startIcon={
        isLoading ? (
          <CircularProgress size={16} color="inherit" />
        ) : isSubmitted ? (
          <RefreshIcon fontSize="small" />
        ) : (
          <SendIcon fontSize="small" />
        )
      }
      sx={(theme) => ({
        mb: 2,
        borderRadius: 1.5,
        color: "background.paper",
        backgroundColor: isSubmitted
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
        fontWeight: isSubmitted ? 600 : 500,
        transition: "all 0.2s ease-in-out",
        padding: isMobile ? theme.spacing(0.75, 1.5) : theme.spacing(1, 2),
        fontSize: isMobile ? "0.8125rem" : "0.875rem",
        minWidth: isMobile ? "120px" : "150px",
        "&:hover": {
          backgroundColor: isSubmitted
            ? theme.palette.secondary.dark
            : theme.palette.primary.dark,
          transform: "translateY(-1px)",
          boxShadow: theme.shadows[2],
        },
        "&:disabled": {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        },
      })}
    >
      {isLoading ? "Processing..." : isSubmitted ? "New Concept" : "Submit"}
    </Button>
  );
};

export default SubmitButton;
