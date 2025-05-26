import { Box, Button, Container, Grid2, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
import Part5 from "./Part5";
import Part7 from "./Part7";
import Part6 from "./Part6";
import SubMitBox from "./SubmitBox/SubmitBox";
import Content from "../../../components/layout/Content";
import { QuestionProvider } from "./QuestionProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { setNotedQuestion } from "../../../stores/notedQuestionSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NavigationIcon from "@mui/icons-material/Navigation";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import useToeicExam from "../../../hooks/useToeicExam";
import { splitQuestionGroupsToParts } from "../../../utils/toeicExamHelper";
import { Part } from "../../../types/ToeicExam";
import { PARTS as ALL_PARTS } from "../../../utils/toeicExamHelper";

const PartIndex = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const storedSelectedPracticeParts = useSelector(
    (state: RootState) => state.selectedParts.selectedParts,
  );

  const selectedPracticeParts = useMemo(() => {
    if (storedSelectedPracticeParts.length == 0) {
      return ALL_PARTS;
    }
    return storedSelectedPracticeParts;
  }, [storedSelectedPracticeParts]);

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

  const dispatch = useDispatch();
  const [currentPartIndex, setCurrentPartIndex] = useState(0); // current part index
  const notedQuestions = useSelector(
    (state: RootState) => state.notedQuestions.notedQuestions,
  );

  const handleNotedQuestion = (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => {
    dispatch(setNotedQuestion({ part, groupIndex, questionIndex }));
  };

  const isNotedQuestion = (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => {
    const found = notedQuestions.find(
      (item) =>
        item.part === part &&
        item.groupIndex === groupIndex &&
        item.questionIndex === questionIndex,
    );
    return found?.isNoted ?? false;
  };

  const routeParams = useParams<{ examId: string }>();
  const examId = routeParams.examId;

  const { data: toeicExam, isLoading: isLoadingToeicExam } = useToeicExam(
    Number(examId),
    {
      enabled: !!examId,
    },
  );

  const part2QuestionGroups = useMemo(() => {
    return splitQuestionGroupsToParts(
      toeicExam?.questionGroups || [],
      selectedPracticeParts as Part[],
    );
  }, [toeicExam?.questionGroups, selectedPracticeParts]); // object mapping chosen parts to its question groups

  console.log("part2QuestionGroups", part2QuestionGroups);

  const handleNext = () => setCurrentPartIndex((prev) => prev + 1);
  const handlePrevious = () => setCurrentPartIndex((prev) => prev - 1);

  const renderPart = () => {
    const currentPart = selectedPracticeParts[currentPartIndex];

    switch (currentPart) {
      case "part1":
        return (
          <Part1
            questionGroups={part2QuestionGroups.part1}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part2":
        return (
          <Part2
            questionGroups={part2QuestionGroups.part2}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part3":
        return (
          <Part3
            questionGroups={part2QuestionGroups.part3}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part4":
        return (
          <Part4
            questionGroups={part2QuestionGroups.part4}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part5":
        return (
          <Part5
            questionGroups={part2QuestionGroups.part5}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part6":
        return (
          <Part6
            questionGroups={part2QuestionGroups.part6}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
          />
        );
      case "part7":
        return (
          <Part7
            questionGroups={part2QuestionGroups.part7}
            handleNotedQuestion={handleNotedQuestion}
            isNotedQuestion={isNotedQuestion}
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
            {isLoadingToeicExam ? (
              <CustomBackdrop open />
            ) : (
              <Grid2 container spacing={2}>
                <Grid2 size={9.5}>
                  <Stack direction={"column"} gap={1}>
                    {/* Part Navigation */}
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
                        {selectedPracticeParts.map((part, partIndex) => {
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
                        disabled={
                          currentPartIndex === selectedPracticeParts.length - 1
                        }
                        onClick={handleNext}
                        sx={{
                          borderRadius: 3,
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </Button>
                    </Box>

                    {/* Part Content */}
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
                        setCurrentPartIndex(
                          selectedPracticeParts.indexOf(part),
                        );
                      }}
                    />
                  </Box>
                </Grid2>
              </Grid2>
            )}
          </Box>
        </QuestionProvider>
      </Container>

      {/* Scroll to top button */}
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

export default PartIndex;
