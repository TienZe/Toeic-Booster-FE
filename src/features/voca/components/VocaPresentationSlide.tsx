import React from "react";
import FlashCard from "./FlashCard";
import { Stack, Typography } from "@mui/material";

import AudioIconButton from "./AudioIconButton";
import { getWordThumbnail } from "../../../utils/helper";
import { LessonVocabulary } from "../../../types/LessonVocabulary";

interface VocaPresentationSlideProps {
  onClick?: () => void;
  voca: LessonVocabulary;
}

const VocaPresentationSlide: React.FC<VocaPresentationSlideProps> = ({
  onClick,
  voca,
}) => {
  return (
    <FlashCard onClick={onClick} vocaImage={getWordThumbnail(voca)}>
      <Typography
        color="primary.main"
        fontSize={24}
        fontWeight={600}
        sx={{ marginTop: "5px", marginBottom: "10px" }}
      >
        {voca.word}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <AudioIconButton iconSize={60} audioUrl={voca.pronunciationAudio} />
        <Typography component="span" color="#777777" sx={{ fontSize: "24px" }}>
          {voca.pronunciation}
        </Typography>
      </Stack>
    </FlashCard>
  );
};

export default VocaPresentationSlide;
