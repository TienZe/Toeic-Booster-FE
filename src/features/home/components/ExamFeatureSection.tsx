import { Button, Container, Stack, Typography } from "@mui/material";
import ExamFeatureItem from "./ExamFeatureItem";
import ExamFeatImg1 from "../assets/exam-feat-1.svg";
import ExamFeatImg2 from "../assets/exam-feat-2.svg";
import ExamFeatImg3 from "../assets/exam-feat-3.svg";
import { Link } from "react-router-dom";

const ExamFeatureSection: React.FC = () => {
  return (
    <Container fixed sx={{ py: { xs: 5, lg: 7 } }}>
      <Stack spacing={3.75}>
        <Typography variant="h3" color="primary.main" textAlign="center">
          Master Every Aspect of the TOEIC Exam
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <ExamFeatureItem
            feature="Take Recent Actual TOEIC Tests"
            details="Practice with the most recent actual TOEIC tests to get familiar with the exam format and types of questions you will encounter."
            cardImage={ExamFeatImg1}
          />
          <ExamFeatureItem
            feature="View TOEIC Score and Answer Explanations"
            details="Get instant feedback on your performance with detailed score reports and answer explanations."
            cardImage={ExamFeatImg2}
          />
          <ExamFeatureItem
            feature="Increase Your TOEIC Band Score"
            details="Enhance your overall language skills with targeted practice designed to increase your TOEIC score."
            cardImage={ExamFeatImg3}
          />
        </Stack>
        <Link to="account/login" style={{ alignSelf: "center" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ px: 1.5, py: 0.75 }}
          >
            Start Practicing Now
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default ExamFeatureSection;
