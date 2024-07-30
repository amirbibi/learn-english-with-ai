import { Typography } from "@mui/material";
import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Typography
      component="h1"
      gutterBottom
      align="center"
      fontWeight="bold"
      sx={{ fontSize: { xs: "1.25rem", sm: "2rem" } }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
