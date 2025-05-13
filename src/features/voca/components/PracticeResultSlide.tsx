import { Box, Stack, Typography } from "@mui/material";
import PracticeSlideCard from "./PracticeSlideCard";
import { Image } from "../../../components/UI/Image";
import AudioIconButton from "./AudioIconButton";
import React, { useEffect, useRef } from "react";

interface PracticeResultSlideProps {
  word: string;
  audio: string | null;
  phonetic: string;
  meaning: string;
  thumbnail: string;
  playAudio?: boolean;
  audioDelay?: number;
  partOfSpeech?: string;
}
const PracticeResultSlide: React.FC<PracticeResultSlideProps> = ({
  word,
  audio,
  phonetic,
  meaning,
  thumbnail,
  playAudio = false,
  audioDelay = 0,
  partOfSpeech = "n",
}) => {
  const phoneticAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (playAudio) {
      timeout = setTimeout(() => {
        phoneticAudioRef.current?.play();
      }, audioDelay);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [playAudio, audioDelay]);
  return (
    <PracticeSlideCard>
      <Stack spacing="35px" direction="row">
        <Image
          src={thumbnail}
          sx={{ width: "210px", height: "210px", objectFit: "cover" }}
        />
        <Box>
          <Typography
            color="#58CC02"
            fontSize={35}
            sx={{ marginTop: "-10px", fontWeight: "600" }}
          >
            {word}
            <Typography component="span" color="#B4B4B4" sx={{ fontSize: 20 }}>
              {" "}
              {`(${partOfSpeech})`}
            </Typography>
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{ my: "10px" }}
          >
            <AudioIconButton
              iconSize={41}
              audioUrl={audio}
              script={word}
              audioRef={phoneticAudioRef}
            />
            <Typography
              component="span"
              color="#777777"
              sx={{ fontSize: "22px" }}
            >
              {phonetic}
            </Typography>
          </Stack>
          <Typography
            sx={{ fontSize: "25px", color: "#777777", marginTop: "15px" }}
          >
            {meaning}
          </Typography>
        </Box>
      </Stack>
    </PracticeSlideCard>
  );
};

export default PracticeResultSlide;
