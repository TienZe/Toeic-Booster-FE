import { Box, Stack, Typography } from "@mui/material";
import PracticeSlideCard from "./PracticeSlideCard";
import { Image } from "../../../components/UI/Image";
import { QuestionSlideProps } from "../types/component-props";
import { vocaWordClassFullName2Abbr } from "../../../utils/helper";
import DefaultVocaThumbnail from "../../../assets/images/voca/default-voca-image.jpg";

const WordQuestionSlide: React.FC<QuestionSlideProps> = ({ voca }) => {
  return (
    <PracticeSlideCard>
      <Stack spacing="35px" direction="row">
        <Image
          src={voca.thumbnail || DefaultVocaThumbnail}
          sx={{ width: "210px", height: "210px" }}
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
            {voca.translate}
          </Typography>
          <Typography color="777" sx={{ fontSize: "24px" }}>
            {`(${vocaWordClassFullName2Abbr(voca.wordClass)})`}
          </Typography>
        </Box>
      </Stack>
    </PracticeSlideCard>
  );
};

export default WordQuestionSlide;
