import { Box, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import ConceptCategories from "./ConceptCategories/ConceptCategories";
import QuoteDisplay from "./QuoteDisplay";

interface ConceptSidebarProps {
  isLoading: boolean;
  currentCategory: string;
  currentDifficulty: string;
  onSelectConcept: (category: string, difficulty: string) => void;
}

const ConceptSidebar: React.FC<ConceptSidebarProps> = ({
  isLoading,
  currentCategory,
  currentDifficulty,
  onSelectConcept,
}) => (
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
            isLoading={isLoading}
            currentCategory={currentCategory}
            currentDifficulty={currentDifficulty}
            onSelectConcept={onSelectConcept}
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
);

export default ConceptSidebar;
