import { Box, Stack } from "@mui/material";
import PracticeSlideCard from "./PracticeSlideCard";
import AudioIconButton from "./AudioIconButton";
import { QuestionSlideProps } from "../types/component-props";
import QuestionMarkIcon from "../assets/question-mark.svg";
import { Image } from "../../../components/UI/Image";
import { useEffect, useRef } from "react";

const PhoneticAudioQuestionSlide: React.FC<QuestionSlideProps> = ({ voca }) => {
  const phoneticAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      phoneticAudioRef.current?.play();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <PracticeSlideCard>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ my: "10px" }}
        >
          <AudioIconButton
            iconSize={95}
            audioUrl={voca.audio}
            audioRef={phoneticAudioRef}
          />
          <Stack
            direction="row"
            alignItems="end"
            spacing={0.25}
            sx={{
              "& img": {
                width: "11px",
                height: "18px",
              },
            }}
          >
            <Image
              src={QuestionMarkIcon}
              sx={{ transform: "rotate(180deg)" }}
            />
            <Box
              sx={{ height: "2px", width: "143px", backgroundColor: "#B4B4B4" }}
            ></Box>
            <Image src={QuestionMarkIcon} />
          </Stack>
        </Stack>
      </Stack>
    </PracticeSlideCard>
  );
};

export default PhoneticAudioQuestionSlide;
