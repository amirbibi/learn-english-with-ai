import { Button, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";

interface tryAgainButtonProps {
  isSubmitted: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const TryAgainButton: React.FC<tryAgainButtonProps> = ({
  isSubmitted,
  isLoading,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={isLoading}
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
        backgroundColor: (theme) => theme.palette.success.main,
        display: isLoading ? "none" : "inline-flex",
      }}
    >
      Try Again (Same Concept)
    </Button>
  );
};

export default TryAgainButton;
