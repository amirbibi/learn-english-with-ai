import { Typography } from "@mui/material";

export const formatExplanation = (text: string) => {
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
