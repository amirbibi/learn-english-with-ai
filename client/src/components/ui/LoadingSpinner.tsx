import { Box, CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
  size: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingSpinner;
