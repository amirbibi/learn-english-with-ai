import { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useConceptExplorer } from "../../hooks/useConceptExplorer";
import ConceptSidebar from "./ConceptSidebar/ConceptSidebar";
import ConceptMain from "./ConceptMain/ConceptMain";
import { DEFAULT_CATEGORIES, DEFAULT_DIFFICULTY } from "../../lib/constants";

const ConceptExplorer: React.FC = () => {
  const { state, actions, error } = useConceptExplorer();

  useEffect(() => {
    if (!state.concept) {
      actions.handleNewConcept(
        state.category || DEFAULT_CATEGORIES[0],
        state.difficulty || DEFAULT_DIFFICULTY
      );
    }
  }, [actions, state.category, state.concept, state.difficulty]);

  return (
    <Container maxWidth="lg" disableGutters sx={{ my: { xs: 2 } }}>
      <Grid container spacing={{ sm: 3 }}>
        {!state.isSubmitted && (
          <ConceptSidebar
            isLoading={state.isLoading}
            currentCategory={state.category}
            currentDifficulty={state.difficulty}
            onSelectConcept={actions.handleNewConcept}
          />
        )}
        <ConceptMain state={state} actions={actions} error={error} />
      </Grid>
    </Container>
  );
};

export default ConceptExplorer;
