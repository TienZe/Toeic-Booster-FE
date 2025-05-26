import { Box, Divider, Stack, Typography } from "@mui/material";

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
import { setScript } from "../../../stores/selectedScript";
import { QuestionGroup } from "../../../types/ToeicExam";
import { ABCD, answerIndexToLabel } from "../../../utils/toeicExamHelper";
import Item from "./Item";

interface Part1Props {
  mode?: string;
  questionGroups?: QuestionGroup[];

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

const Part1: React.FC<Part1Props> = ({
  mode,
  questionGroups,
  handleNotedQuestion = () => {},
  isNotedQuestion = () => false,
}) => {
  const { questionRefs } = useQuestionContext();
  const PART = 1;
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

  const handleClickQuestionChoice = (
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

  const checkScriptExpanded = (part: number, groupIndex: number) => {
    const found = expandedScript.find(
      (item) => item.part === part && item.groupIndex === groupIndex,
    );
    return found?.isExpanded ?? false;
  };

  const handleExpandScript = (part: number, groupIndex: number) => {
    dispatch(setScript({ part, groupIndex }));
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
        Part 1
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 2, fontWeight: "500", padding: "0 20px" }}
      >
        Directions: For each question in this part, you will hear four
        statements about a picture in your test book. When you hear the
        statements, you must select the one statement that best describes what
        you see in the picture. Then find the number of the question and mark
        your answer. The statements will not be printed in your test book and
        will be spoken only one time.
      </Typography>

      {/* Group Questions */}
      {questionGroups?.map((group, groupIndexInPart) => {
        const isDisabled = mode === "review";
        const isExplain = mode === "review";
        const isScriptExpanded = checkScriptExpanded(PART, groupIndexInPart);

        const imageUrl = group.medias
          .filter((media) => media.fileType === "image")
          .map((media) => media.fileUrl)
          .pop();

        const audioUrl = group.medias
          .filter((media) => media.fileType === "audio")
          .map((media) => media.fileUrl)
          .pop();

        return (
          <Box
            sx={{
              mb: 1,
              padding: "20px",
            }}
          >
            {/* Media */}
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
                <>
                  <img
                    src={imageUrl}
                    alt="Test"
                    style={{
                      maxWidth: "80%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                  <audio controls>
                    <source src={audioUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </>
              </Stack>
              {isExplain && (
                <Item
                  isDisabled={isDisabled}
                  isExplain={isExplain}
                  onClick={() => handleExpandScript(PART, groupIndexInPart)}
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
                          Transcript
                        </Typography>
                      </Stack>
                      <Box>
                        <ArrowDropDownIcon />
                      </Box>
                    </Box>

                    {isScriptExpanded && (
                      <Box mt={1} onClick={(e) => e.stopPropagation()}>
                        <Divider />
                        <Typography mt={1}>
                          {group.transcript
                            ? parse(group.transcript)
                            : "No transcript"}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Item>
              )}
            </Box>

            {/* List of Questions */}
            <Box sx={{ width: "100%" }}>
              {group.questions.map((question, questionIndex) => {
                const isCorrectQuestion = question.userAnswer?.isCorrect;

                const isExplain = mode === "review";
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
                        backgroundColor: isNoted
                          ? "orange"
                          : isCorrectQuestion === true
                            ? "#00B035"
                            : isCorrectQuestion === false
                              ? "#E20D2C"
                              : "primary.main",
                        color: "white",
                        fontWeight: "400",
                        borderRadius: "50%",
                        padding: "15px",
                        width: "35px",
                        height: "35px",
                        marginBottom: "15px",
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
                    {ABCD.map((answerLabel) => question[answerLabel]).map(
                      (_, answerIndex) => {
                        const isActive =
                          activeAnswers[PART]?.[groupIndexInPart]?.[
                            questionIndex
                          ] === answerIndex;

                        const answerLabel = answerIndexToLabel(answerIndex);
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
                              handleClickQuestionChoice(
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
                                  : "No explanation"}
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

export default Part1;
