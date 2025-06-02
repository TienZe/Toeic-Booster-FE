import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import Content from "../../../components/layout/Content";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
import Part5 from "./Part5";
import Part6 from "./Part6";
import Part7 from "./Part7";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";
import { QuestionProvider } from "./QuestionProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NavigationIcon from "@mui/icons-material/Navigation";
import SubMitBox from "./SubmitBox/SubmitBox";
import { splitQuestionGroupsToParts } from "../../../utils/toeicExamHelper";
import { Part } from "../../../types/ToeicExam";
import { useAttemptDetails } from "../../../hooks/useAttemptDetails";
import { GoBackButton } from "../../../components/UI/GoBackButton";
import TOEICChatbot from "./Chatbot/ToeicChatBot";
import { assistantQuestionActions } from "../../../stores/assistantQuestionSlice";
import { useDispatch } from "react-redux";

const PartResultIndex = () => {
  const dispatch = useDispatch();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const routeParams = useParams<{ attemptId: string }>();
  const attemptId = Number(routeParams.attemptId);

  const { isLoading: isLoadingAttemptDetails, data: attemptDetails } =
    useAttemptDetails(attemptId, {
      enabled: !!attemptId,
    });

  const selectedParts = attemptDetails?.selectedParts || [];

  const part2QuestionGroups = useMemo(() => {
    return splitQuestionGroupsToParts(
      attemptDetails?.toeicTest?.questionGroups || [],
    );
  }, [attemptDetails?.toeicTest?.questionGroups]); // object mapping chosen parts to its question groups

  const handleAssistQuestion = (questionId: number) => {
    dispatch(
      assistantQuestionActions.setQuestion({
        questionId,
        attemptId,
        showChatBox: true,
      }),
    );
  };

  const handleNext = () => setCurrentPartIndex((prev) => prev + 1);
  const handlePrevious = () => setCurrentPartIndex((prev) => prev - 1);

  const renderPart = () => {
    const currentPart = selectedParts[currentPartIndex];

    switch (currentPart) {
      case "part1":
        return (
          <Part1
            questionGroups={part2QuestionGroups.part1}
            mode={"review"}
            onAssistant={handleAssistQuestion}
          />
        );
      case "part2":
        return (
          <Part2
            questionGroups={part2QuestionGroups.part2}
            mode={"review"}
            onAssistant={handleAssistQuestion}
          />
        );
      case "part3":
        return (
          <Part3
            questionGroups={part2QuestionGroups.part3}
            mode={"review"}
            onAssistant={handleAssistQuestion}
          />
        );
      case "part4":
        return (
          <Part4
            questionGroups={part2QuestionGroups.part4}
            mode={"review"}
            onAssistant={handleAssistQuestion}
          />
        );
      case "part5":
        return (
          <Part5
            questionGroups={part2QuestionGroups.part5}
            mode={"review"}
            onAssistant={handleAssistQuestion}
          />
        );
      case "part6":
        return (
          <Part6
            questionGroups={part2QuestionGroups.part6}
            mode={"review"}
            onAssistant={handleAssistQuestion}
          />
        );
      case "part7":
        return (
          <Part7
            questionGroups={part2QuestionGroups.part7}
            mode={"review"}
            onAssistant={handleAssistQuestion}
          />
        );
      default:
        return <div>Cannot find this part</div>;
    }
  };

  return (
    <Content sx={{ backgroundColor: "secondary.extraLight" }}>
      <Container maxWidth="sm">
        <QuestionProvider>
          <Box my={2}>
            <Grid2 container spacing={2}>
              <Grid2 size={12} sx={{ mb: -1 }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography variant="h4">
                    {attemptDetails?.toeicTest?.name}
                  </Typography>
                  <GoBackButton
                    label="Exit"
                    onClick={() => navigate(`/exams/result/${attemptId}`)}
                  />
                </Stack>
              </Grid2>
              <Grid2 size={9.5}>
                {isLoadingAttemptDetails ? (
                  <Box sx={{ marginTop: 2 }}>
                    <DotLoadingProgress />
                  </Box>
                ) : (
                  <Stack direction={"column"} gap={1}>
                    <Box
                      sx={{
                        width: "100%",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: 3,
                        height: 65,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                        padding: "0 20px",
                        backgroundColor: "white",
                      }}
                    >
                      <Stack direction={"row"} gap={0.5}>
                        <Button
                          variant="text"
                          disabled={currentPartIndex === 0}
                          onClick={handlePrevious}
                          sx={{
                            borderRadius: 3,
                          }}
                        >
                          <ArrowBackIosIcon />
                        </Button>
                        {selectedParts.map((part, partIndex) => {
                          return (
                            <Button
                              variant={
                                currentPartIndex === partIndex
                                  ? "contained"
                                  : "outlined"
                              }
                              size="small"
                              sx={{
                                borderRadius: 3,
                                padding: "0 18px",
                              }}
                              onClick={() => setCurrentPartIndex(partIndex)}
                            >
                              {`Part ${part[4]}`}
                            </Button>
                          );
                        })}
                      </Stack>

                      <Button
                        variant="text"
                        disabled={currentPartIndex === selectedParts.length - 1}
                        onClick={handleNext}
                        sx={{
                          borderRadius: 3,
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: 3,
                        backgroundColor: "white",
                      }}
                      padding={3}
                    >
                      {renderPart()}
                    </Box>
                  </Stack>
                )}
              </Grid2>
              <Grid2 size={2.5}>
                <Box
                  padding={2}
                  sx={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: 3,
                    position: "sticky",
                    top: "50px",
                    alignSelf: "flex-start",
                    backgroundColor: "white",
                  }}
                >
                  <SubMitBox
                    partDataChosen={part2QuestionGroups}
                    setCurrentPart={(part: Part) => {
                      setCurrentPartIndex(selectedParts.indexOf(part));
                    }}
                    mode={"review"}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        </QuestionProvider>

        <TOEICChatbot />
      </Container>
      {showScrollToTop && (
        <div
          style={{
            padding: 0,
            position: "sticky",
            bottom: "5px",
            right: "15px",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <NavigationIcon color="primary" />
        </div>
      )}
    </Content>
  );
};

export default PartResultIndex;
