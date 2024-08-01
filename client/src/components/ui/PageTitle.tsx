import { Typography } from "@mui/material";
import React from "react";

interface PageTitleProps {
  title: string;
  align?: "left" | "center" | "right";
}

const PageTitle: React.FC<PageTitleProps> = ({ title, align }) => {
  return (
    <Typography
      component="h1"
      gutterBottom
      align={align || "center"}
      fontWeight="bold"
      sx={{ fontSize: { xs: "1.25rem", sm: "2rem" } }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
