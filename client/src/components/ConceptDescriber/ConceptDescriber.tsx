import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useConceptAPI } from "../../hooks/useConceptAPI";
import ConceptDisplay from "./ConceptDisplay";
import DescriptionInput from "./DescriptionInput";
import SubmitButton from "./SubmitButton";
import EvaluationDisplay from "./EvaluationDisplay";
import ErrorMessage from "../common/ErrorMessage";

const ConceptDescriber: React.FC = () => {
  const [userDescription, setUserDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: isMobile ? "100%" : isTablet ? "600px" : "1000px",
        height: isMobile ? "auto" : "600px",
        display: "flex",
        flexDirection: "column",
        m: "auto",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "primary.main", fontSize: isMobile ? "1.5rem" : "2rem" }}
        >
          Concepts
        </Typography>
        <ConceptDisplay
          concept={concept}
          isSubmitted={isSubmitted}
          isLoading={isLoading}
          onRefresh={getRandomConcept}
        />
        {!isSubmitted && (
          <DescriptionInput
            value={userDescription}
            onChange={setUserDescription}
            isLoading={isLoading}
            isMobile={isMobile}
          />
        )}
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
        />
      </Paper>
    </Box>
  );
};

export default ConceptDescriber;
