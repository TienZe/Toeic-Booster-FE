import { Box, Divider, Paper, Stack, styled, Typography } from "@mui/material";

import { partData } from "../../admin/new_exams/types/examType";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnswer,
  setActiveAnswer,
  setExplain,
} from "../../../stores/userAnswer";
import { RootState } from "../../../stores";
import PerfectScrollbar from "react-perfect-scrollbar";
import parse from "html-react-parser";
import { setScript } from "../../../stores/selectedScript";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InfoIcon from "@mui/icons-material/Info";
import useScrollToTop from "../hooks/useScrollToTop";
import { useQuestionContext } from "./QuestionProvider";
import { QuestionGroup } from "../../../types/ToeicExam";
import { ABCD, answerIndexToLabel } from "../../../utils/toeicExamHelper";

interface Part7Props {
  questionGroups: QuestionGroup[];
  mode?: string;
  handleNotedQuestion?: (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => void;
  isNotedQuestion?: (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => boolean;
}

const Item = styled(Paper)(
  ({
    isActive,
    isDisabled,
    isCorrect,
    isIncorrect,
    isChosen,
    isExplain,
  }: {
    isActive?: boolean;
    isDisabled?: boolean;
    isCorrect?: boolean;
    isIncorrect?: boolean;
    isChosen?: boolean;
    isExplain?: boolean;
  }) => ({
    backgroundColor: isActive
      ? "#EBF5FF"
      : isCorrect && isChosen
        ? "#F0FDF4"
        : isCorrect
          ? "white"
          : isIncorrect
            ? "#FDF2F3"
            : "#fff",
    padding: "15px",
    border: isActive
      ? "1px solid #0071F9"
      : isCorrect
        ? "1px solid #00B035"
        : isIncorrect
          ? "1px solid #E20D2C"
          : isExplain && isDisabled
            ? "1px solid #0071F9"
            : isDisabled
              ? ""
              : "1px solid #f0f0f0",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: isActive ? "#EBF5FF" : isDisabled ? "" : "",
      border: isDisabled
        ? undefined
        : isActive
          ? "1px solid #0071F9"
          : "1px solid #F9A95A",
      cursor: "pointer",
      "& .innerBox": {
        backgroundColor: isDisabled
          ? undefined
          : isActive
            ? "#0071F9"
            : "#6B7280",
        color: isDisabled ? undefined : "white",
      },
    },
  }),
);
const Part7: React.FC<Part7Props> = ({
  questionGroups,
  mode,
  handleNotedQuestion = () => {},
  isNotedQuestion = () => false,
}) => {
  const { questionRefs } = useQuestionContext();
  const PART = 7;
  useScrollToTop();
  const dispatch = useDispatch();
  const activeAnswers = useSelector(
    (state: RootState) => state.userAnswers.activeAnswers,
  );
  const explainAnswers = useSelector(
    (state: RootState) => state.userAnswers.explainAnswers,
  );
  const expandedScript = useSelector(
    (state: RootState) => state.seletedScript.expandedScript,
  );
  const handleClick = (
    part: number,
    groupIndex: number,
    questionIndex: number,
    answerIndex: number,
    questionId: number,
    answer: string,
  ) => {
    dispatch(
      setActiveAnswer({
        part,
        groupIndex,
        questionIndex,
        answerIndex,
      }),
    );

    dispatch(setAnswer({ idQuestion: questionId, answer }));
  };

  const handleExpandExplain = (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => {
    dispatch(setExplain({ part, groupIndex, questionIndex }));
  };

  const isItemExpanded = (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => {
    const found = explainAnswers.find(
      (item) =>
        item.part === part &&
        item.groupIndex === groupIndex &&
        item.questionIndex === questionIndex,
    );
    return found?.isExpanded ?? false;
  };

  const handleExpandScript = (part: number, groupIndex: number) => {
    dispatch(setScript({ part, groupIndex }));
  };

  const checkScriptExpanded = (part: number, groupIndex: number) => {
    const found = expandedScript.find(
      (item) => item.part === part && item.groupIndex === groupIndex,
    );
    return found?.isExpanded ?? false;
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: "var(--color-primary-main)",
          padding: " 0 20px",
        }}
      >
        Part 7
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 2, fontWeight: "500", padding: "0 20px" }}
      >
        Directions: Read the texts that follow. A word, phrase, or sentence is
        missing in parts of each text. Four answer choices for each question are
        given below the text. Select the best answer to complete the text. Then
        mark the letter (A), (B), (C) or (D) on your answer sheet.
      </Typography>

      {/* Group Questions */}
      {questionGroups.map((group, groupIndexInPart) => {
        const isDisabled = mode === "review";
        const isExplain = mode === "review";
        const isScriptExpanded = checkScriptExpanded(PART, groupIndexInPart);
        return (
          <Box sx={{ display: "flex", gap: "30px" }} mb={2}>
            <Box
              sx={{
                width: "55%",
                height: "600px",
                border: "1px solid #ddd",
                padding: "30px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <PerfectScrollbar
                style={{ flexGrow: 1, maxHeight: "100%", overflow: "auto" }}
              >
                <Typography mb={1}>
                  {group.passage ? parse(group.passage) : ""}
                </Typography>

                <Box>
                  {group.medias
                    .filter((media) => media.fileType === "image")
                    .sort((a, b) => (a.order ?? -1) - (b.order ?? -1))
                    .map((img) => (
                      <img src={img.fileUrl} alt="" key={img.id} />
                    ))}
                </Box>
                {isExplain && (
                  <>
                    <Stack
                      direction="row"
                      gap={0.25}
                      onClick={() => handleExpandScript(PART, groupIndexInPart)}
                      style={{ cursor: "pointer" }}
                    >
                      <Typography color="primary.main" mb={1}>
                        Translate
                      </Typography>
                      <ArrowDropDownIcon color="primary" />
                    </Stack>
                    {isScriptExpanded && (
                      <Box mt={1} onClick={(e) => e.stopPropagation()}>
                        <Typography mt={1}>
                          {group.transcript
                            ? parse(group.transcript)
                            : "No transcript"}
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </PerfectScrollbar>
            </Box>
            {/* Right Side: Scrollable answer options */}
            <Box
              sx={{
                width: "45%",
                height: "600px",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <PerfectScrollbar style={{ flexGrow: 1 }}>
                {group.questions.map((question, questionIndex) => {
                  const isCorrectQuestion = question.userAnswer?.isCorrect;
                  const isExpanded = isItemExpanded(
                    PART,
                    groupIndexInPart,
                    questionIndex,
                  );
                  const isNoted = isNotedQuestion(
                    PART,
                    groupIndexInPart,
                    questionIndex,
                  );
                  return (
                    <Box
                      sx={{
                        mb: 1,
                        padding: "20px",
                      }}
                    >
                      <Box
                        key={`question-${groupIndexInPart}-${questionIndex}`}
                        ref={(el) => {
                          if (el) {
                            if (!questionRefs.current[PART]) {
                              questionRefs.current[PART] = [];
                            }
                            if (!questionRefs.current[PART][groupIndexInPart]) {
                              questionRefs.current[PART][groupIndexInPart] = [];
                            }
                            questionRefs.current[PART][groupIndexInPart][
                              questionIndex
                            ] = el as HTMLDivElement;
                          }
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        <Box
                          sx={{
                            background: isNoted
                              ? "orange"
                              : isCorrectQuestion === true
                                ? "#00B035"
                                : isCorrectQuestion === false
                                  ? "#E20D2C"
                                  : "var(--color-primary-main)",
                            color: "white",
                            fontWeight: "400",
                            borderRadius: "50%",
                            padding: "15px",
                            width: "35px",
                            height: "35px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleNotedQuestion(
                              PART,
                              groupIndexInPart,
                              questionIndex,
                            )
                          }
                        >
                          {question.questionNumber}
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {question.question}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <Stack spacing={1}>
                          {ABCD.map((answerLabel) => question[answerLabel]).map(
                            (answer, answerIndex) => {
                              const answerLabel =
                                answerIndexToLabel(answerIndex);

                              const isActive =
                                activeAnswers[PART]?.[groupIndexInPart]?.[
                                  questionIndex
                                ] === answerIndex;
                              const isCorrect =
                                answerLabel === question.correctAnswer &&
                                mode === "review";
                              const isIncorrect =
                                answerLabel ===
                                  question.userAnswer?.userAnswer &&
                                answerLabel !== question.correctAnswer;
                              const isChosen =
                                answerLabel === question.userAnswer?.userAnswer;

                              return (
                                <Item
                                  key={answerIndex}
                                  isActive={isActive}
                                  isDisabled={isDisabled}
                                  isCorrect={isCorrect}
                                  isIncorrect={isIncorrect}
                                  isChosen={isChosen}
                                  onClick={() =>
                                    !isDisabled &&
                                    handleClick(
                                      PART,
                                      groupIndexInPart,
                                      questionIndex,
                                      answerIndex,
                                      question.id,
                                      answer,
                                    )
                                  }
                                  sx={{
                                    display: "flex",
                                    gap: "15px",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box
                                    className="innerBox"
                                    sx={{
                                      background: isActive
                                        ? "#0071F9"
                                        : isCorrect
                                          ? "#00B035"
                                          : isIncorrect
                                            ? "#E20D2C"
                                            : "#F3F4F6",
                                      color: isActive
                                        ? "white"
                                        : isCorrect
                                          ? "#F0FDF4"
                                          : isIncorrect
                                            ? "#FDF2F3"
                                            : "",
                                      fontWeight: "500",
                                      borderRadius: "50%",
                                      padding: "15px",
                                      width: "35px",
                                      height: "35px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    {String.fromCharCode(65 + answerIndex)}
                                  </Box>
                                  <Typography sx={{ fontWeight: "500" }}>
                                    {answer}
                                  </Typography>
                                </Item>
                              );
                            },
                          )}
                          {isExplain && (
                            <Item
                              isDisabled={isDisabled}
                              isExplain={isExplain}
                              onClick={() =>
                                handleExpandExplain(
                                  PART,
                                  groupIndexInPart,
                                  questionIndex,
                                )
                              }
                              sx={{
                                display: "flex",
                                gap: "15px",
                                alignItems: "center",
                              }}
                            >
                              <Stack direction="column">
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Stack direction="row" gap={1}>
                                    <InfoIcon color="primary" />
                                    <Typography
                                      sx={{
                                        fontWeight: "500",
                                        color: "primary.main",
                                      }}
                                    >
                                      Explain
                                    </Typography>
                                  </Stack>
                                  <Box>
                                    <ArrowDropDownIcon />
                                  </Box>
                                </Box>

                                {isExpanded && (
                                  <Box
                                    mt={1}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Divider />
                                    <Typography mt={1}>
                                      {question.explanation
                                        ? parse(question.explanation)
                                        : "No explain"}
                                    </Typography>
                                  </Box>
                                )}
                              </Stack>
                            </Item>
                          )}
                        </Stack>
                      </Box>
                    </Box>
                  );
                })}
              </PerfectScrollbar>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Part7;
