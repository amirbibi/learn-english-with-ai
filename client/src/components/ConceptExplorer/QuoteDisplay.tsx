import React, { useEffect } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useQuoteAPI } from "../../hooks/useQuoteAPI";

const QuoteDisplay: React.FC = () => {
  const { quote, isLoading, error, fetchRandomQuote } = useQuoteAPI();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  if (isLoading) return <Typography>Loading quote...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!quote) return null;

  return (
    <Typography
      variant="subtitle1"
      gutterBottom
      sx={{
        fontStyle: "italic",
        mb: 3,
        color: "text.secondary",
        fontSize: isMobile ? "0.9rem" : "1rem",
        textAlign: "center",
      }}
    >
      "{quote.text}" - {quote.author}
    </Typography>
  );
};

export default QuoteDisplay;
