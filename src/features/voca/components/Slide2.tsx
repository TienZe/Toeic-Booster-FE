import React from "react";
import FlashCard from "./FlashCard";
import { Stack, Typography } from "@mui/material";

import AudioIconButton from "./AudioIconButton";
import Vocabulary from "../../../types/Vocabulary";

interface Slide2 {
  onClick?: () => void;
  voca: Vocabulary;
}

const Slide2: React.FC<Slide2> = ({ onClick, voca }) => {
  return (
    <FlashCard onClick={onClick} vocaImage={voca.image}>
      <Typography
        color="primary.main"
        fontSize={30}
        fontWeight={600}
        sx={{ marginTop: "5px", marginBottom: "10px" }}
      >
        {voca.meaning}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <AudioIconButton iconSize={60} audioUrl={voca.phoneticAudio} />
        <Typography component="span" color="#777777" sx={{ fontSize: "24px" }}>
          {voca.phonetic}
        </Typography>
      </Stack>
    </FlashCard>
  );
};

export default Slide2;
