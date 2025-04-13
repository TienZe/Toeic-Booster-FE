import { Button, ButtonProps, Typography } from "@mui/material";

const ViewMoreButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button sx={{ marginTop: 1 }} {...props}>
      <Typography color="primary.main">
        {children}
        <Typography
          color="primary.main"
          component="span"
          sx={{ letterSpacing: "-2.15px", marginLeft: 0.25 }}
        >
          {">>"}
        </Typography>
      </Typography>
    </Button>
  );
};

export default ViewMoreButton;
