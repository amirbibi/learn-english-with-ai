import React from "react";
import { Box, Typography, IconButton, Tooltip, Zoom } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";

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
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      mb: 3,
      position: "relative",
      minHeight: "40px",
    }}
  >
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "secondary.main",
          pr: isSubmitted ? 0 : 6,
          fontWeight: "medium",
          wordBreak: "break-word",
        }}
      >
        Concept: {concept}
      </Typography>
    </motion.div>
    {!isSubmitted && (
      <Tooltip
        title="Get new concept"
        placement="top"
        TransitionComponent={Zoom}
      >
        <IconButton
          onClick={onRefresh}
          size="large"
          aria-label="refresh concept"
          sx={{
            color: "primary.main",
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          disabled={isLoading}
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);

export default ConceptDisplay;
