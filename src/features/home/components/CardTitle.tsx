import { Typography, TypographyProps } from "@mui/material";

const CardTitle: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography
      color="secondary.dark"
      fontWeight="bold"
      {...props}
      sx={{ fontSize: 15 }}
    >
      {children}
    </Typography>
  );
};

export default CardTitle;
