import { Box, Grid, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import ConceptDisplay from "./ConceptDisplay/ConceptDisplay";
import DescriptionInput from "./DescriptionInput/DescriptionInput";
import EvaluationDisplay from "./EvaluationDisplay";
import SubmitButton from "./SubmitButton";
import TryAgainButton from "./TryAgainButton";
import ErrorMessage from "../../../components/ui/ErrorMessage";

interface ConceptMainProps {
  state: {
    concept: string;
    category: string;
    difficulty: string;
    isSubmitted: boolean;
    isLoading: boolean;
    userDescription: string;
    evaluation: string;
    goodDescription: string;
  };
  actions: {
    handleNewConcept: (category: string, difficulty: string) => void;
    handleDescriptionChange: (userDescription: string) => void;
    handleSubmit: () => void;
    handleTryAgain: () => void;
  };
  error: string | null;
}

const ConceptMain: React.FC<ConceptMainProps> = ({ state, actions, error }) => {
  return (
    <Grid item xs={12} md={state.isSubmitted ? 12 : 8} order={{ xs: 2, md: 1 }}>
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
            <Stack direction="row" gap={2}>
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
              {state.isSubmitted && (
                <TryAgainButton
                  isSubmitted={state.isSubmitted}
                  isLoading={state.isLoading}
                  onClick={actions.handleTryAgain}
                />
              )}
            </Stack>
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
  );
};

export default ConceptMain;
