import { Box, Divider, Stack, Typography } from "@mui/material";

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
import Item from "./Item";

interface Part6Props {
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

const Part6: React.FC<Part6Props> = ({
  questionGroups,
  mode,
  handleNotedQuestion = () => {},
  isNotedQuestion = () => false,
}) => {
  const { questionRefs } = useQuestionContext();
  const PART = 6;
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
        Part 6
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
                  {/* Part 6 only contains image medias */}
                  {group.medias.map((media) => (
                    <img src={media.fileUrl} alt="" key={media.id} />
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
                      <Typography color="primary.main">Translate</Typography>
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
                            fontSize: "18px",
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
                                answerLabel === question.userAnswer?.choice &&
                                answerLabel !== question.correctAnswer;
                              const isChosen =
                                answerLabel === question.userAnswer?.choice;
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
                                      answerLabel,
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
                                  <Typography>{answer}</Typography>
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

export default Part6;
