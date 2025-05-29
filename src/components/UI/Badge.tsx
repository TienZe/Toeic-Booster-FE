import { Chip, ChipProps } from "@mui/material";
import React from "react";

function getBadgeColor(color: string) {
  switch (color) {
    case "success":
      return {
        backgroundColor: "success.extraLight",
        color: "success.main",
        borderColor: "rgba(34, 197, 94, 0.2)",
      };
    case "warning":
      return {
        backgroundColor: "warning.extraLight",
        color: "warning.main",
        borderColor: "rgba(249, 115, 22, 0.2)",
      };
    case "info":
      return {
        backgroundColor: "info.extraLight",
        color: "info.main",
        border: "1px solid rgba(14, 165, 233, 0.2)",
      };
    default:
      return {
        backgroundColor: "primary.extraLight",
        color: "primary.main",
        borderColor: "rgba(59, 130, 246, 0.2)",
      };
  }
}

const Badge: React.FC<ChipProps> = ({ sx, color, ...props }) => {
  return (
    <Chip
      size="small"
      sx={{
        fontWeight: 500,
        fontSize: "0.7rem",
        borderRadius: "0.375rem",
        border: "1px solid",
        ...getBadgeColor(color || "primary"),
        ...sx,
      }}
      {...props}
    />
  );
};

export default Badge;
