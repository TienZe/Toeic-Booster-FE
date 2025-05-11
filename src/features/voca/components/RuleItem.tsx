import { Stack, Typography } from "@mui/material";
import React from "react";
import { Image } from "../../../components/UI/Image";

interface RuleItemProps {
  heading?: string;
  rule: string;
  icon: string;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule, icon, heading }) => {
  return (
    <Stack direction="row" spacing="20px" alignItems="start">
      <Image src={icon} sx={{ width: "50px" }} />
      <Stack>
        {heading && (
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "500",
              mb: 0.5,
              color: "primary.main",
            }}
          >
            {heading}
          </Typography>
        )}
        <Typography>{rule}</Typography>
      </Stack>
    </Stack>
  );
};

export default RuleItem;
