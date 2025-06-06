import { Stack, Typography } from "@mui/material";
import React from "react";
import { Image } from "../../../components/UI/Image";

interface ResultItemProps {
  title: string;
  value: string;
  icon: string;
  iconSize?: number;
  withBorder?: boolean;
  iconPosition?: "left" | "right";
}
const ResultItem: React.FC<ResultItemProps> = ({
  title,
  value,
  icon,
  iconSize = 31,
  withBorder = false,
  iconPosition = "left",
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        padding: "20px 15px",
        backgroundColor: "white",
        fontSize: "18px",
        color: "#777777",
        border: withBorder ? "2px solid #E5E5E5" : "none",
        borderRadius: withBorder ? "12px" : "none",
      }}
    >
      {iconPosition === "left" && (
        <Image src={icon} sx={{ width: iconSize + "px" }} />
      )}
      <Typography variant="inherit" sx={{ marginLeft: "20px" }}>
        {title}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        sx={{ marginLeft: "auto" }}
        spacing={1}
      >
        {iconPosition === "right" && (
          <Image src={icon} sx={{ width: iconSize + "px" }} />
        )}
        <Typography variant="inherit" sx={{ fontWeight: "600" }}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ResultItem;
