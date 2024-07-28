import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuoteAPI } from "../../hooks/useQuoteAPI";

const QuoteDisplay: React.FC = () => {
  // Get quote data and functions from custom hook
  const { quote, isLoading, error, fetchRandomQuote } = useQuoteAPI();

  // Get theme and media query functions
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Fetch a random quote on component mount
  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  // Display error message if quote fetch fails
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
        px: isMobile ? 1 : isTablet ? 2 : 3,
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
              fontSize: isMobile ? "0.9rem" : isTablet ? "1rem" : "1.1rem",
              mb: 1,
              // Add quotation marks before and after the quote
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
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              // Add an em dash before the author
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
