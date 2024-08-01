import { Typography } from "@mui/material";

interface PageSubTitleProps {
  subtitle: string;
  color?: string;
}

const PageSubTitle: React.FC<PageSubTitleProps> = ({ subtitle, color }) => {
  return (
    <Typography
      component="h2"
      fontWeight="500"
      sx={{
        color: color || "secondary.main",
        fontSize: { xs: "0.95rem", sm: "1.2rem" },
      }}
    >
      {subtitle}
    </Typography>
  );
};

export default PageSubTitle;
