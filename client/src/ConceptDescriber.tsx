import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const ConceptDescriber: React.FC = () => {
  const [concept, setConcept] = useState<string>("");
  const [userDescription, setUserDescription] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");
  const [goodDescription, setGoodDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const formatExplanation = (text: string) => {
    const paragraphs = text.split("\n\n");

    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith("📚")) {
        return (
          <Typography key={index} variant="h6" gutterBottom>
            {paragraph}
          </Typography>
        );
      } else {
        const formattedParagraph = paragraph
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/🧠|🌟|🔍|💡|🔼|❓/g, "<br>$&")
          .replace(/\n/g, "<br>");

        return (
          <Typography
            key={index}
            dangerouslySetInnerHTML={{ __html: formattedParagraph }}
            paragraph
          />
        );
      }
    });
  };

  const getRandomConcept = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/concept`);
      setConcept(response.data.concept);
      setEvaluation("");
      setGoodDescription("");
      setIsSubmitted(false);
      setUserDescription("");
    } catch (err) {
      setError("Failed to fetch a new concept. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRandomConcept();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_BASE_URL}/evaluate`, {
        concept,
        description: userDescription,
      });

      setEvaluation(response.data.evaluation);
      setGoodDescription(response.data.goodDescription);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error details:", err);
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        setError(
          `Failed to submit description. ${
            err.response?.data?.error || err.message
          }`
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: isMobile ? "100%" : isTablet ? "600px" : "1000px",
        height: isMobile ? "auto" : "600px",
        display: "flex",
        flexDirection: "column",
        m: "auto",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "primary.main", fontSize: isMobile ? "1.5rem" : "2rem" }}
        >
          Concepts
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            position: "relative",
            minHeight: "40px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "secondary.main",
              pr: isSubmitted ? 0 : 6,
              fontSize: isMobile ? "1rem" : "1.25rem",
              wordBreak: "break-word",
            }}
          >
            Concept: {concept}
          </Typography>
          {!isSubmitted && (
            <IconButton
              onClick={getRandomConcept}
              size="small"
              aria-label="refresh concept"
              sx={{
                color: "secondary.main",
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
              disabled={isLoading}
            >
              <RefreshIcon />
            </IconButton>
          )}
        </Box>
        {!isSubmitted && (
          <TextField
            fullWidth
            multiline
            rows={isMobile ? 3 : 4}
            variant="outlined"
            label="Your Description"
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            sx={{ mb: 3 }}
            disabled={isLoading}
          />
        )}
        <Button
          variant="contained"
          onClick={isSubmitted ? getRandomConcept : handleSubmit}
          sx={{ mb: 3, borderRadius: 2, color: "background.paper" }}
          disabled={isLoading || (!isSubmitted && !userDescription.trim())}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isSubmitted ? (
            "Generate another concept"
          ) : (
            "Submit"
          )}
        </Button>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          {evaluation && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "info.main",
                  fontSize: isMobile ? "1rem" : "1.25rem",
                }}
              >
                Evaluation:
              </Typography>
              <Box sx={{ pl: 2 }}>{formatExplanation(evaluation)}</Box>
            </Box>
          )}
          {goodDescription && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: "success.main",
                  fontSize: isMobile ? "1rem" : "1.25rem",
                }}
              >
                Good Description:
              </Typography>
              <Box sx={{ pl: 2 }}>{formatExplanation(goodDescription)}</Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ConceptDescriber;
