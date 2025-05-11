import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

import TurnIcon from "../../../components/TurnIcon";
import CuteButton from "./CuteButton";

interface FlashCardProps {
  children: ReactNode;
  onClick?: () => void;
  vocaImage?: string;
}

const FlashCard: React.FC<FlashCardProps> = ({
  children,
  onClick,
  vocaImage,
}) => {
  return (
    <Stack
      sx={{
        padding: "40px 25px",
        height: "338px",
        border: "2px solid #e5e5e5",
        borderRadius: "30px",
        borderBottom: "7px solid #e5e5e5",
        backgroundColor: "white",
      }}
      spacing={2}
      direction="row"
    >
      <img src={vocaImage} style={{ width: "238px", height: "238px" }} />
      <Box sx={{ flex: 1 }}>{children}</Box>

      {onClick && (
        <CuteButton
          label="flip"
          icon={<TurnIcon color="primary" sx={{ fontSize: "27px" }} />}
          sx={{
            position: "absolute",
            right: 25,
            bottom: 30,
            "& span": { color: "primary.main" },
          }}
          onClick={onClick}
        />
      )}
    </Stack>
  );
};

export default FlashCard;
