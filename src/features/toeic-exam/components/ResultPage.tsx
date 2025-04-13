import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import InforUserBox from "./InforUserBox";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate, useParams } from "react-router-dom";
import { toHHMMSS } from "../utils/helper";
import Content from "../../../components/layout/Content";
import { fetchPracticeDetailUser } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetNotedQuestion } from "../../../stores/notedQuestionSlice";

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
    <Content>
      <Container maxWidth="sm">
        {isPending ? (
          <CustomBackdrop open />
        ) : (
          <Box my={2}>
            <Grid2 container spacing={2}>
              <Grid2 size={9.5}>
                <Box
                  sx={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    height: "fit-content",
                    padding: "30px",
                  }}
                >
                  <Typography variant="h5" mb={2}>
                    {responseResultData?.test.name}
                  </Typography>
                  <Grid2 container spacing={1.5}>
                    <Grid2 size={3.5}>
                      <Box sx={BoxStyle}>
                        <Stack direction="column" spacing={4}>
                          <Stack direction="row" justifyContent="space-between">
                            <Stack direction="row" spacing={0.25}>
                              <DoneIcon fontSize="small" />
                              <Typography sx={{ fontWeight: 600 }}>
                                Result
                              </Typography>
                            </Stack>
                            <Typography>{`${responseResultData?.testPractice.numCorrect}/${TOTAL_QUESTIONS}`}</Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                          >
                            <Stack direction="row" spacing={0.25}>
                              <TrackChangesIcon fontSize="small" />
                              <Typography sx={{ fontWeight: 600 }}>
                                Accurracy
                              </Typography>
                            </Stack>

                            <Typography>{`${(
                              ((responseResultData?.testPractice?.numCorrect ??
                                0) /
                                (responseResultData?.testPractice
                                  ?.totalQuestion ?? 1)) *
                              100
                            ).toFixed(1)}%`}</Typography>
                          </Stack>
                          <Stack direction="row" justifyContent="space-between">
                            <Stack direction="row" spacing={0.25}>
                              <AccessTimeIcon fontSize="small" />
                              <Typography sx={{ fontWeight: 600 }}>
                                Time
                              </Typography>
                            </Stack>
                            <Typography>
                              {toHHMMSS(
                                responseResultData?.testPractice.time ?? 0,
                              )}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Grid2>
                    <Grid2 size={8.5}>
                      <Grid2 container spacing={1}>
                        <Grid2 size={6}>
                          <Box sx={BoxStyle}>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={0.75}
                            >
                              <Stack direction="row" spacing={0.5}>
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    color: "green",
                                    fontWeight: "500",
                                  }}
                                >
                                  Correct
                                </Typography>
                                <CheckCircleIcon color="success"></CheckCircleIcon>
                              </Stack>

                              <Typography>
                                {responseResultData?.testPractice.numCorrect}
                              </Typography>
                            </Stack>
                          </Box>
                        </Grid2>
                        <Grid2 size={6}>
                          <Box sx={BoxStyle}>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={0.75}
                            >
                              <Stack direction="row" spacing={0.5}>
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    color: "red",
                                    fontWeight: "500",
                                  }}
                                >
                                  Incorrect
                                </Typography>
                                <CancelIcon color="error"></CancelIcon>
                              </Stack>
                              <Typography>
                                {(responseResultData?.testPractice
                                  .totalQuestion ?? 0) -
                                  (responseResultData?.testPractice
                                    .numCorrect ?? 0)}
                              </Typography>
                            </Stack>
                          </Box>
                        </Grid2>
                        {/* <Grid2 size={4}>
                          <Box sx={BoxStyle}>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={0.75}
                            >
                              <Stack direction="row" spacing={0.5}>
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    color: "gray",
                                    fontWeight: "500",
                                  }}
                                >
                                  Skip
                                </Typography>
                                <DoNotDisturbOnIcon color="secondary"></DoNotDisturbOnIcon>
                              </Stack>
                              <Typography>{`${(TOTAL_QUESTIONS ?? 0) - (responseResultData?.testPractice.totalQuestion ?? 0)}`}</Typography>
                            </Stack>
                          </Box>
                        </Grid2> */}
                        <Grid2 size={6}>
                          <Box sx={BoxStyle}>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={0.75}
                            >
                              <Stack direction="row" spacing={0.5}>
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    color: "primary.main",
                                    fontWeight: "500",
                                  }}
                                >
                                  LC Score
                                </Typography>
                                <HeadphonesIcon color="primary" />
                              </Stack>
                              <Typography>{`${responseResultData?.testPractice.LCScore}`}</Typography>
                            </Stack>
                          </Box>
                        </Grid2>
                        <Grid2 size={6}>
                          <Box sx={BoxStyle}>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={0.75}
                            >
                              <Stack direction="row" spacing={0.5}>
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    color: "primary.main",
                                    fontWeight: "500",
                                  }}
                                >
                                  RC Score
                                </Typography>
                                <MenuBookIcon color="primary" />
                              </Stack>
                              <Typography>{`${responseResultData?.testPractice.RCScore}`}</Typography>
                            </Stack>
                          </Box>
                        </Grid2>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2, marginRight: 1 }}
                    onClick={() => navigate("/exams")}
                  >
                    Back to exams library
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate(`/exams/review/${resultId}`)}
                  >
                    Answer details
                  </Button>
                </Box>
              </Grid2>
              <Grid2 size={2.5}>
                {" "}
                <Box
                  sx={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    height: "fit-content",
                    padding: "30px",
                  }}
                >
                  <InforUserBox />
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        )}
      </Container>
    </Content>
  );
};

export default ResultPage;
