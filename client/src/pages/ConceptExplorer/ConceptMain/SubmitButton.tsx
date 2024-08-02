import { Button, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";

interface SubmitButtonProps {
  isSubmitted: boolean;
  isLoading: boolean;
  disabled: boolean;
  category: string;
  difficulty: string;
  onClick: (category?: string, difficulty?: string) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitted,
  isLoading,
  disabled,
  onClick,
  category,
  difficulty,
}) => {
  const handleClick = () => {
    if (isSubmitted) {
      onClick(category, difficulty);
    } else {
      onClick();
    }
  };
  return (
    <Button
      variant="contained"
      onClick={handleClick}
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
        backgroundColor: (theme) =>
          isSubmitted
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
      }}
    >
      {isLoading && isSubmitted
        ? "Processing..."
        : isSubmitted
        ? "New Concept"
        : "Submit"}
    </Button>
  );
};

export default SubmitButton;
