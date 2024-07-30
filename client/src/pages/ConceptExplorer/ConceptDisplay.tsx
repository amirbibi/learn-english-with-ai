import React from "react";
import { Box, IconButton, Skeleton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PageSubTitle from "../../components/ui/PageSubTitle";

interface ConceptDisplayProps {
  concept: string;
  isSubmitted: boolean;
  isLoading: boolean;
  onRefresh: () => void;
}

const ConceptDisplay: React.FC<ConceptDisplayProps> = ({
  concept,
  isSubmitted,
  isLoading,
  onRefresh,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
      }}
    >
      {isLoading ? (
        <Skeleton variant="text" width="100%" height={40} />
      ) : (
        <PageSubTitle subtitle={`Concept: ${concept}`} />
      )}
      {!isSubmitted && (
        <IconButton onClick={onRefresh} disabled={isLoading}>
          <RefreshIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ConceptDisplay;
