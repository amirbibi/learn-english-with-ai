import { Paper, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useSignup } from "../../hooks/useSignup";
import PageTitle from "../../components/ui/PageTitle";
import SignupForm from "./SignupForm";

const Signup: React.FC = () => {
  const theme = useTheme();
  const {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    validationErrors,
  } = useSignup();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        py: { xs: 2, sm: 4 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Paper
          elevation={5}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: theme.shadows[10],
          }}
        >
          <PageTitle title="Sign Up" />
          <SignupForm
            formData={formData}
            isLoading={isLoading}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            validationErrors={validationErrors}
          />
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Signup;
