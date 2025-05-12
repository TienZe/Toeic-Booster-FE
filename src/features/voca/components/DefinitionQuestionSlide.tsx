import { Stack, Typography } from "@mui/material";
import PracticeSlideCard from "./PracticeSlideCard";
import React from "react";
import { QuestionSlideProps } from "../types/component-props";
import { vocaWordClassFullName2Abbr } from "../../../utils/helper";

const DefinitionQuestionSlide: React.FC<QuestionSlideProps> = ({ voca }) => {
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
          sx={{ mx: 3, fontSize: "24px" }}
        >
          <Typography
            color="#4C4C4C"
            variant="inherit"
            sx={{ textAlign: "center" }}
          >
            <Typography
              color="primary"
              sx={{ fontSize: "24px" }}
              component="span"
            >
              {`(${vocaWordClassFullName2Abbr(voca.partOfSpeech)})`}
            </Typography>{" "}
            {voca.definition}
          </Typography>
        </Stack>
      </Stack>
    </PracticeSlideCard>
  );
};

export default DefinitionQuestionSlide;
