import React, { useState, useEffect } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { Quote } from "../../types/quote";

const API_BASE_URL = "http://localhost:5000/api";

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get<Quote>(`${API_BASE_URL}/quote`);
        setQuote(response.data);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      }
    };

    fetchQuote();
  }, []);

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
