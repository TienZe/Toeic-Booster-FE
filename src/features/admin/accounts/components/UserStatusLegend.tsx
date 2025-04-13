import { Box, Typography } from "@mui/material";
import React from "react";

const UserStatusLegend: React.FC<{ label: string; color: string }> = ({
  label,
  color,
}) => {
  return (
    <Box>
      <Typography variant="body2" component="span">
        {label}
      </Typography>
      <Box
        sx={{
          display: "inline-block",
          width: "10px",
          height: "10px",
          backgroundColor: color,
          borderRadius: "50%",
          marginLeft: "8px",
        }}
      ></Box>
    </Box>
  );
};

export default UserStatusLegend;
