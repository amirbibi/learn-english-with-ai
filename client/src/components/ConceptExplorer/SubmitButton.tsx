import React from "react";
import { Button, CircularProgress } from "@mui/material";

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
      sx={{
        mb: 3,
        borderRadius: 2,
        color: "background.paper",
        backgroundColor: (theme) =>
          isSubmitted ? "yellow" : theme.palette.primary.main,
        fontWeight: isSubmitted ? 700 : 500,
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: (theme) =>
            isSubmitted
              ? theme.palette.primary.light
              : theme.palette.primary.dark,
        },
        "&:disabled": {
          backgroundColor: (theme) => theme.palette.action.disabledBackground,
          color: (theme) => theme.palette.action.disabled,
        },
      }}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <CircularProgress size={24} color="inherit" />
      ) : isSubmitted ? (
        "Generate another concept"
      ) : (
        "Submit Description"
      )}
    </Button>
  );
};

export default SubmitButton;
