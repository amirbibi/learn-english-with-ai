import React from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { useQuoteAPI } from "../../hooks/api/useQuoteAPI";

const QuoteDisplay: React.FC = () => {
  const { quote, isLoading, error } = useQuoteAPI();

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mb: 3 }}>
        Failed to load quote. Please try again later.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 4,
      }}
    >
      {isLoading ? (
        <Skeleton variant="text" width="80%" height={60} />
      ) : quote ? (
        <>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: "text.secondary",
              mb: 1,
              "&::before": { content: '"\\201C"', marginRight: "0.2em" },
              "&::after": { content: '"\\201D"', marginLeft: "0.2em" },
            }}
          >
            {quote.text}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: "text.secondary",
              "&::before": { content: '"— "' },
            }}
          >
            {quote.author}
          </Typography>
        </>
      ) : null}
    </Box>
  );
};

export default QuoteDisplay;
