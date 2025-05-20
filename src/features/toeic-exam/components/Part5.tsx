import { Box, Divider, Paper, Stack, styled, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  setAnswer,
  setActiveAnswer,
  setExplain,
} from "../../../stores/userAnswer";
import { RootState } from "../../../stores";
import InfoIcon from "@mui/icons-material/Info";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import parse from "html-react-parser";
import useScrollToTop from "../hooks/useScrollToTop";
import { useQuestionContext } from "./QuestionProvider";
import { QuestionGroup } from "../../../types/ToeicExam";
import { ABCD, answerIndexToLabel } from "../../../utils/toeicExamHelper";

interface Part5Props {
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

const Part5: React.FC<Part5Props> = ({
  questionGroups,
  mode,
  handleNotedQuestion = () => {},
  isNotedQuestion = () => false,
}) => {
  const PART = 5;
  const { questionRefs } = useQuestionContext();
  useScrollToTop();
  const dispatch = useDispatch();
  const activeAnswers = useSelector(
    (state: RootState) => state.userAnswers.activeAnswers,
  );
  const explainAnswers = useSelector(
    (state: RootState) => state.userAnswers.explainAnswers,
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
        Part 5
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 2, fontWeight: "500", padding: "0 20px" }}
      >
        In each question, you will be asked to review a statement that is
        missing a word or phrase. Four answer choices will be provided for each
        statement. Select the best answer and mark the corresponding letter (A),
        (B), (C), or (D).
      </Typography>

      {/* Group Questions */}
      {questionGroups.map((group, groupIndexInPart) => {
        const isDisabled = mode === "review";
        const isExplain = mode === "review";
        return (
          <Box
            sx={{
              mb: 1,
              padding: "20px",
            }}
          >
            {/* Image */}
            <Box sx={{ mb: 2 }}>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                mb={1}
              >
                {group.medias.map((media, mediaIndex) => {
                  if (media.fileType === "image") {
                    return (
                      <img
                        key={mediaIndex}
                        src={media.fileUrl}
                        alt="Test"
                        style={{
                          maxWidth: "80%",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    );
                  }
                })}
              </Stack>
            </Box>

            {/* List of Items */}
            <Box sx={{ width: "100%" }}>
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
                  <Stack spacing={1} marginTop={1}>
                    <Stack direction="row" gap={1} alignItems="center">
                      <Box
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
                      <Typography sx={{ fontWeight: "500" }}>
                        {question.question}
                      </Typography>
                    </Stack>

                    {ABCD.map((answerLabel) => question[answerLabel]).map(
                      (answer, answerIndex) => {
                        const answerLabel = answerIndexToLabel(answerIndex);

                        const isActive =
                          activeAnswers[PART]?.[groupIndexInPart]?.[
                            questionIndex
                          ] === answerIndex;
                        const isCorrect =
                          answerLabel === question.correctAnswer &&
                          mode === "review";
                        const isIncorrect =
                          answerLabel === question.userAnswer?.userAnswer &&
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
                              justifyContent: "flex-start",
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
                            <Box mt={1} onClick={(e) => e.stopPropagation()}>
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
                );
              })}
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Part5;
