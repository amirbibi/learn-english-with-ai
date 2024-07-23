import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Fade,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { useConceptAPI } from "../../hooks/useConceptAPI";
import ConceptDisplay from "./ConceptDisplay";
import DescriptionInput from "./DescriptionInput";
import SubmitButton from "./SubmitButton";
import EvaluationDisplay from "./EvaluationDisplay";
import ErrorMessage from "../common/ErrorMessage";
import QuoteDisplay from "./QuoteDisplay";

const ConceptExplorer: React.FC = () => {
  const [userDescription, setUserDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    concept,
    evaluation,
    goodDescription,
    isLoading,
    error,
    getRandomConcept,
    submitDescription,
  } = useConceptAPI();

  useEffect(() => {
    getRandomConcept();
  }, [getRandomConcept]);

  const handleSubmit = async () => {
    await submitDescription(concept, userDescription);
    setIsSubmitted(true);
  };

  const handleNewConcept = () => {
    getRandomConcept();
    setUserDescription("");
    setIsSubmitted(false);
  };

  const handleDescriptionChange = useCallback((value: string) => {
    setUserDescription(value);
  }, []);

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          py: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            minWidth: "800px",
            padding: "0 2rem",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 4,
              bgcolor: "background.paper",
              boxShadow: theme.shadows[10],
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                mb: 4,
                textAlign: "center",
              }}
            >
              Concept Explorer
            </Typography>
            <QuoteDisplay />
            <ConceptDisplay
              concept={concept}
              isSubmitted={isSubmitted}
              isLoading={isLoading}
              onRefresh={getRandomConcept}
            />
            <Fade in={!isSubmitted} timeout={500}>
              <Box>
                {!isSubmitted && (
                  <DescriptionInput
                    value={userDescription}
                    onChange={handleDescriptionChange}
                    isLoading={isLoading}
                    isMobile={isMobile}
                  />
                )}
              </Box>
            </Fade>
            <SubmitButton
              isSubmitted={isSubmitted}
              isLoading={isLoading}
              disabled={!isSubmitted && !userDescription.trim()}
              onClick={isSubmitted ? handleNewConcept : handleSubmit}
            />
            {error && <ErrorMessage message={error} />}
            <EvaluationDisplay
              evaluation={evaluation}
              goodDescription={goodDescription}
              {...{ isMobile }}
            />
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default ConceptExplorer;
