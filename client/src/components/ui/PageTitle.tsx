import { Typography } from "@mui/material";
import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      align="center"
      fontWeight="bold"
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
