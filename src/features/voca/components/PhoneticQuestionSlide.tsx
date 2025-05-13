import { Stack, Typography } from "@mui/material";
import PracticeSlideCard from "./PracticeSlideCard";
import AudioIconButton from "./AudioIconButton";
import { QuestionSlideProps } from "../types/component-props";

const PhoneticQuestionSlide: React.FC<QuestionSlideProps> = ({ voca }) => {
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
            audioUrl={voca.pronunciationAudio}
            script={voca.word}
          />
          <Typography
            component="span"
            color="#777777"
            sx={{ fontSize: "25px" }}
          >
            {voca.pronunciation}
          </Typography>
        </Stack>
      </Stack>
    </PracticeSlideCard>
  );
};

export default PhoneticQuestionSlide;
