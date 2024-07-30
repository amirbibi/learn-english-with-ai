import { Button } from "@mui/material";
import { getGoogleUrl } from "../../../utils/getGoogleUrl";
import GoogleIcon from "@mui/icons-material/Google";

const ContinueWithGoogleButton = () => {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      href={getGoogleUrl()}
      sx={{ mb: 2 }}
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;
