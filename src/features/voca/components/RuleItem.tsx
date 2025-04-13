import { Stack, Typography } from "@mui/material";
import React from "react";
import { Image } from "../../../components/UI/Image";

interface RuleItemProps {
  rule: string;
  icon: string;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule, icon }) => {
  return (
    <Stack direction="row" spacing="20px" alignItems="start">
      <Image src={icon} sx={{ width: "50px" }} />
      <Typography>{rule}</Typography>
    </Stack>
  );
};

export default RuleItem;
