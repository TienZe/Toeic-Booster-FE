import { Box, Stack, Typography } from "@mui/material";
import PracticeSlideCard from "./PracticeSlideCard";
import { Image } from "../../../components/UI/Image";
import { QuestionSlideProps } from "../types/component-props";
import {
  getWordThumbnail,
  vocaWordClassFullName2Abbr,
} from "../../../utils/helper";

const WordQuestionSlide: React.FC<QuestionSlideProps> = ({ voca }) => {
  return (
    <PracticeSlideCard>
      <Stack spacing="35px" direction="row">
        <Image
          src={getWordThumbnail(voca)}
          sx={{ width: "210px", height: "210px", objectFit: "cover" }}
        />
        <Box sx={{ fontSize: "25px" }}>
          <Typography
            color="primary"
            variant="inherit"
            sx={{
              fontWeight: "medium",
              marginTop: "60px",
              marginBottom: "8px",
            }}
          >
            {voca.meaning}
          </Typography>
          <Typography color="777" sx={{ fontSize: "24px" }}>
            {`(${vocaWordClassFullName2Abbr(voca.partOfSpeech)})`}
          </Typography>
        </Box>
      </Stack>
    </PracticeSlideCard>
  );
};

export default WordQuestionSlide;
