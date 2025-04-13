import { Stack, Typography } from "@mui/material";
import React from "react";
import { Image } from "../../../components/UI/Image";

interface ResultItemProps {
  title: string;
  value: string;
  icon: string;
  iconSize?: number;
}
const ResultItem: React.FC<ResultItemProps> = ({
  title,
  value,
  icon,
  iconSize = 31,
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        padding: "20px 15px",
        backgroundColor: "white",
        borderRadius: "16px",
        fontSize: "18px",
        color: "#777777",
      }}
    >
      <Image src={icon} sx={{ width: iconSize + "px" }} />
      <Typography variant="inherit" sx={{ marginLeft: "20px" }}>
        {title}
      </Typography>
      <Typography
        variant="inherit"
        sx={{ marginLeft: "auto", fontWeight: "600" }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default ResultItem;
