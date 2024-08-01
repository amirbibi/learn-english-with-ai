import React, { useEffect } from "react";
import { Box, Paper, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useConceptExplorer } from "../../hooks/useConceptExplorer";
import ConceptDisplay from "./ConceptDisplay/ConceptDisplay";
import DescriptionInput from "./DescriptionInput/DescriptionInput";
import EvaluationDisplay from "./EvaluationDisplay";
import QuoteDisplay from "./QuoteDisplay";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "../../components/ui/ErrorMessage";
import ConceptCategories from "./ConceptCategories/ConceptCategories";

const DEFAULT_CATEGORY = "General";
const DEFAULT_DIFFICULTY = "easy";

const ConceptExplorer: React.FC = () => {
  const { state, actions, error } = useConceptExplorer();

  useEffect(() => {
    actions.handleNewConcept(DEFAULT_CATEGORY, DEFAULT_DIFFICULTY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg" disableGutters sx={{ my: { xs: 2 } }}>
      <Grid container spacing={{ sm: 3 }}>
        {!state.isSubmitted && (
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 0, md: 2 },
              }}
            >
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
                  <ConceptCategories
                    isLoading={state.isLoading}
                    onSelectConcept={actions.handleNewConcept}
                  />
                </Paper>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={5}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: { xs: 2, sm: 4 },
                    display: { xs: "none", md: "block" },
                  }}
                >
                  <QuoteDisplay />
                </Paper>
              </motion.div>
            </Box>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={state.isSubmitted ? 12 : 8}
          order={{ xs: 2, md: 1 }}
        >
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
                <ConceptDisplay
                  concept={state.concept}
                  category={state.category}
                  difficulty={state.difficulty}
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
                  category={state.category}
                  difficulty={state.difficulty}
                  onClick={
                    state.isSubmitted
                      ? () =>
                          actions.handleNewConcept(
                            state.category,
                            state.difficulty
                          )
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
