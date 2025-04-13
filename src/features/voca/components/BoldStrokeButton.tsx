import { Button, styled } from "@mui/material";

const BoldStrokeButton = styled(Button)(({ theme, variant, disabled }) => ({
  boxShadow: "none",
  width: "100%",
  fontSize: "15px",
  borderRadius: "11px",
  height: "53px",
  "&:hover": {
    boxShadow: "none",
  },

  ...(variant === "outlined" && {
    border: "2px solid #e5e5e5",
    borderBottom: "5px solid #e5e5e5",
  }),

  ...(variant === "contained" && {
    backgroundColor: theme.palette.primary.main,
    borderBottom: `5px solid ${theme.palette.primary.dark}`,
    ...(disabled && { borderBottomColor: "inherit" }),
  }),
}));

export default BoldStrokeButton;
