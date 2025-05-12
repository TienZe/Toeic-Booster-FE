import { Stack, Typography } from "@mui/material";
import PracticeSlideCard from "./PracticeSlideCard";
import React from "react";
import { QuestionSlideProps } from "../types/component-props";
import { vocaWordClassFullName2Abbr } from "../../../utils/helper";

const MeaningQuestionSlide: React.FC<QuestionSlideProps> = ({ voca }) => {
  return (
    <PracticeSlideCard>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Stack
          spacing={0.5}
          alignItems="center"
          sx={{ my: "10px", fontSize: "25px" }}
        >
          <Typography
            color="primary"
            variant="inherit"
            sx={{ fontWeight: "medium" }}
          >
            {voca.word}
          </Typography>
          <Typography color="777" sx={{ fontSize: "24px" }}>
            {`(${vocaWordClassFullName2Abbr(voca.partOfSpeech)})`}
          </Typography>
        </Stack>
      </Stack>
    </PracticeSlideCard>
  );
};

export default MeaningQuestionSlide;
