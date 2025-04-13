import { Box, BoxProps, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CuteButtonProps extends BoxProps {
  onClick?: () => void;
  icon?: ReactNode;
  label: string;
  noShadow?: boolean;
  noBorder?: boolean;
  active?: boolean;
  activeStyle?: SxProps;
}

const defaultStyleActive = {
  backgroundColor: "success.main",
  color: "white",
  borderBottom: "5px solid #58A700",
  "&:hover span": {
    color: "white",
  },
};

const CuteButton: React.FC<CuteButtonProps> = (props) => {
  let appliedActiveStyle = {};

  if (props.active) {
    appliedActiveStyle = {
      ...defaultStyleActive,
      ...props.activeStyle,
    };
  }

  return (
    <Box
      sx={{
        px: 1,
        borderRadius: "16px",
        height: "68px",
        border: props.noBorder ? "" : "2px solid #e5e5e5",
        borderBottom: props.noShadow ? "" : "6px solid #e5e5e5",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        ...props.sx,
        ...appliedActiveStyle,
      }}
      onClick={props.onClick}
    >
      {props.icon}
      <Typography
        fontSize={20}
        fontWeight={600}
        component="span"
        variant="inherit"
        sx={{
          marginLeft: props.icon ? "10px" : "0px",
          textTransform: "uppercase",
        }}
      >
        {props.label}
      </Typography>
    </Box>
  );
};

export default CuteButton;
