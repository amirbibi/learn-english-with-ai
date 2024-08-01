import React from "react";
import { Box, Paper, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useConceptExplorer } from "../../hooks/useConceptExplorer";
import ConceptDisplay from "./ConceptDisplay";
import DescriptionInput from "./DescriptionInput/DescriptionInput";
import EvaluationDisplay from "./EvaluationDisplay";
import QuoteDisplay from "./QuoteDisplay";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "../../components/ui/ErrorMessage";
import PageTitle from "../../components/ui/PageTitle";
import ConceptCategories from "./ConceptCategories/ConceptCategories";

const ConceptExplorer: React.FC = () => {
  const { state, actions, error } = useConceptExplorer();

  return (
    <Container maxWidth="lg" disableGutters sx={{ my: { xs: 2, sm: 4 } }}>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={5}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: { xs: 2, sm: 4 },
                }}
              >
                <ConceptCategories isLoading={state.isLoading} />
              </Paper>
            </motion.div>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={5}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: { xs: 2, sm: 4 },
                }}
              >
                <PageTitle title="Concept Explorer" />
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
                {state.isSubmitted && (
                  <EvaluationDisplay
                    evaluation={state.evaluation}
                    goodDescription={state.goodDescription}
                    isSubmitted={state.isSubmitted}
                  />
                )}
              </Paper>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConceptExplorer;
