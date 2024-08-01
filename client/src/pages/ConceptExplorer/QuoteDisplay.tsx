import { useEffect } from "react";
import {
  Typography,
  Box,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useQuoteAPI } from "../../hooks/api/useQuoteAPI";

const QuoteDisplay: React.FC = () => {
  const { quote, isLoading, error, fetchRandomQuote } = useQuoteAPI();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchQuote = async () => {
      await fetchRandomQuote();
    };
    fetchQuote();
  }, [fetchRandomQuote]);

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
      }}
    >
      {isLoading ? (
        <Skeleton variant="text" height={60} />
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
              fontSize: { xs: "0.65rem", sm: "1rem" },
            }}
          >
            {quote.text}
          </Typography>
          {!isMobile && (
            <Typography
              variant="body2"
              align="center"
              sx={{
                color: "text.secondary",
                "&::before": { content: '"— "' },
                fontSize: "0.85rem",
              }}
            >
              {quote.author}
            </Typography>
          )}
        </>
      ) : null}
    </Box>
  );
};

export default QuoteDisplay;
