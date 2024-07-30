import React from "react";
import { Box, Paper, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useConceptExplorer } from "../../hooks/useConceptExplorer";
import ConceptDisplay from "./ConceptDisplay";
import DescriptionInput from "./DescriptionInput";
import EvaluationDisplay from "./EvaluationDisplay";
import QuoteDisplay from "./QuoteDisplay";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "../../components/ui/ErrorMessage";

const ConceptExplorer: React.FC = () => {
  const { state, actions, error } = useConceptExplorer();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: { xs: 2, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: { xs: 2, sm: 4 } }}
          >
            {!state.isSubmitted && <QuoteDisplay />}
            <ConceptDisplay
              concept={state.concept}
              isSubmitted={state.isSubmitted}
              isLoading={state.isLoading}
              onRefresh={actions.handleNewConcept}
            />
            <DescriptionInput
              value={state.userDescription}
              onChange={actions.handleDescriptionChange}
              isLoading={state.isLoading}
              isSubmitted={state.isSubmitted}
            />
            <SubmitButton
              isSubmitted={state.isSubmitted}
              isLoading={state.isLoading}
              disabled={!state.isSubmitted && !state.userDescription.trim()}
              onClick={
                state.isSubmitted
                  ? actions.handleNewConcept
                  : actions.handleSubmit
              }
            />
            {error && <ErrorMessage message={error} />}
            <EvaluationDisplay
              evaluation={state.evaluation}
              goodDescription={state.goodDescription}
              isSubmitted={state.isSubmitted}
            />
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default ConceptExplorer;
