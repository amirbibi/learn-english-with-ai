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
import { motion, AnimatePresence } from "framer-motion";
import { useConceptAPI } from "../../hooks/useConceptAPI";
import ConceptDisplay from "./ConceptDisplay";
import DescriptionInput from "./DescriptionInput";
import SubmitButton from "./SubmitButton";
import EvaluationDisplay from "./EvaluationDisplay";
import ErrorMessage from "../common/ErrorMessage";
import QuoteDisplay from "./QuoteDisplay";

const ConceptExplorer: React.FC = () => {
  // Initialize state variables
  const [userDescription, setUserDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Get theme and media query functions
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Get concept data and functions from custom hook
  const {
    concept,
    evaluation,
    goodDescription,
    isLoading,
    error,
    getRandomConcept,
    submitDescription,
  } = useConceptAPI();

  // Fetch a random concept on component mount
  useEffect(() => {
    getRandomConcept();
  }, [getRandomConcept]);

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitted(true);
    await submitDescription(concept, userDescription);
  };

  // Handle new concept button click
  const handleNewConcept = () => {
    setUserDescription("");
    setIsSubmitted(false);
    getRandomConcept();
  };

  // Handle user description input changes
  const handleDescriptionChange = useCallback((value: string) => {
    setUserDescription(value);
  }, []);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          my: { xs: 2, sm: 4 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%" }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: { xs: 2, sm: 4 },
              bgcolor: "background.paper",
              boxShadow: theme.shadows[10],
            }}
          >
            <AnimatePresence>
              {!isSubmitted && (
                <motion.div
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    gutterBottom
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      mb: { xs: 2, sm: 3, md: 4 },
                      textAlign: "center",
                    }}
                  >
                    Concept Explorer
                  </Typography>
                  <QuoteDisplay />
                </motion.div>
              )}
            </AnimatePresence>
            <ConceptDisplay
              concept={concept}
              isSubmitted={isSubmitted}
              isLoading={isLoading}
              onRefresh={getRandomConcept}
            />
            <Fade in={!isSubmitted} timeout={500}>
              <Box>
                <DescriptionInput
                  value={userDescription}
                  onChange={handleDescriptionChange}
                  isLoading={isLoading}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  isSubmitted={isSubmitted}
                  displayStyle={isSubmitted ? "none" : ""}
                />
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
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default ConceptExplorer;
