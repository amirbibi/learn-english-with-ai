import React from "react";
import { Button, CircularProgress } from "@mui/material";
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
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled || isLoading}
      startIcon={
        isLoading ? (
          <CircularProgress size={16} color="inherit" />
        ) : isSubmitted ? (
          <RefreshIcon />
        ) : (
          <SendIcon />
        )
      }
      sx={{
        mb: 2,
        backgroundColor: (theme) =>
          isSubmitted
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
      }}
    >
      {isLoading ? "Processing..." : isSubmitted ? "New Concept" : "Submit"}
    </Button>
  );
};

export default SubmitButton;
