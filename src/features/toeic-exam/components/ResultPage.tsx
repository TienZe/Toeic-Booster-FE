import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetNotedQuestion } from "../../../stores/notedQuestionSlice";
import UserToeicInfoLayout from "../../../components/layout/toeic/UserToeicInfoLayout";

const ResultPage = () => {
  const BoxStyle = {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "fit-content",
    padding: "30px",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routeParams = useParams<{ resultId: string }>();
  const resultId = routeParams.resultId;
  //const location = useLocation();
  //const responseResultData: ResponseResultData = location.state?.responseData;
  //const TOTAL_QUESTIONS = location.state?.TOTAL_QUESTIONS;
  const { isPending, data: responseResultData } = useQuery({
    queryKey: ["FetchTestPractice", resultId],
    queryFn: () => fetchPracticeDetailUser(resultId!),
    enabled: !!resultId,
  });
  const TOTAL_QUESTIONS = responseResultData?.testPractice.totalQuestion;

  console.log("Received responseData:", responseResultData?.testPractice);
  console.log("total", TOTAL_QUESTIONS);

  useEffect(() => {
    dispatch(resetNotedQuestion());
  }, []);
  return (
    <UserToeicInfoLayout>
      <Box>
        <Typography variant="h4">
          Exam result: New Economy TOEIC Test 3
        </Typography>
      </Box>
    </UserToeicInfoLayout>
  );
};

export default ResultPage;
