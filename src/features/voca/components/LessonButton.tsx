import { Button, styled } from "@mui/material";

const LessonButton = styled(Button)(({ theme, variant }) => ({
  boxShadow: "none",
  width: "100%",
  fontSize: "15px",
  borderRadius: "10px",
  minHeight: "53px",
  "&:hover": {
    boxShadow: "none",
  },
  ...(variant === "contained" && {
    backgroundColor: theme.palette.primary.light,
    border: "1px solid var(--color-primary-main)",
    borderBottom: "3px solid var(--color-primary-dark)",
  }),
  ...(variant === "outlined" && {
    borderBottom: "3px solid var(--color-primary-dark)",
  }),
}));

export default LessonButton;
