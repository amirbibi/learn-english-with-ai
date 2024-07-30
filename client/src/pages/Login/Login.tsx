import { Paper, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useLogin } from "../../hooks/useLogin";
import LoginForm from "./LoginForm";
import PageTitle from "../../components/ui/PageTitle";

const Login: React.FC = () => {
  const theme = useTheme();
  const { formData, isLoading, error, handleChange, handleSubmit } = useLogin();

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: theme.shadows[10],
          }}
        >
          <PageTitle title="Login" />
          <LoginForm
            formData={formData}
            isLoading={isLoading}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
