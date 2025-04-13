import { Box, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

const VocaSetTextList: React.FC<{ children: ReactNode; sx?: SxProps }> = ({
  children,
  sx,
}) => {
  return (
    <Box
      component="ul"
      sx={{
        color: "#777777",
        lineHeight: "1.42857143",
        "& li": { position: "relative", paddingLeft: 1, marginBottom: "10px" },
        "& li::before": {
          display: "inline-block",
          content: '""',
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: "#DDDDDD",
          position: "absolute",
          left: 0,
          top: 8,
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default VocaSetTextList;
