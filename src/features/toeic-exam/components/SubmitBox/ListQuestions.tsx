import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { useQuestionContext } from "../QuestionProvider";
import { Part, PartData } from "../../../../types/ToeicExam";

interface ListQuestionProps {
  partDataChosen: PartData;
  setCurrentPart: (part: Part) => void;
}
const ListQuestion: React.FC<ListQuestionProps> = ({
  partDataChosen,
  setCurrentPart,
}) => {
  const activeAnswers = useSelector(
    (state: RootState) => state.userAnswers.activeAnswers,
  );
  const notedQuestions = useSelector(
    (state: RootState) => state.notedQuestions.notedQuestions,
  );

  const { scrollToQuestion } = useQuestionContext();

  console.log("partDataChosen", partDataChosen);
  console.log("Object.keys(partDataChosen)", Object.keys(partDataChosen));

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
  return (
    <>
      {Object.keys(partDataChosen).map((partChosen) => {
        const part = +partChosen[partChosen.length - 1]; // part number
        const questionGroupsOfChosenParts = partDataChosen[partChosen];
        return (
          <Box key={part}>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                margin: "8px 0",
              }}
            >
              {`Part ${part}`}
            </Typography>
            <Box>
              {questionGroupsOfChosenParts.map((group, groupIndex) => {
                return group.questions.map((question, questionIndex) => {
                  const isNoted = isNotedQuestion(
                    part,
                    groupIndex,
                    questionIndex,
                  );
                  const isActive =
                    activeAnswers[part]?.[groupIndex]?.[questionIndex] !==
                    undefined;
                  const isCorrect = question.userAnswer?.isCorrect === true;
                  const isInCorrect = question.userAnswer?.isCorrect === false;
                  return (
                    <Button
                      key={`btn-${groupIndex}-${questionIndex}`}
                      onClick={() => {
                        setCurrentPart(partChosen as Part);
                        scrollToQuestion(part, groupIndex, questionIndex);
                      }}
                      sx={{
                        minWidth: "24px",
                        width: "24px",
                        height: "24px",
                        border: isNoted
                          ? "orange"
                          : isActive
                            ? "1px solid white"
                            : isCorrect
                              ? "1px solid #00B035"
                              : isInCorrect
                                ? "1px solid #E20D2C"
                                : "1px solid var(--color-primary-main)",
                        marginRight: "4px",
                        marginBottom: "4px",
                        "&:hover": {
                          border: isActive ? "" : "1px solid #F9A95A",
                          color: isNoted ? "" : isActive ? "" : "#F9A95A",
                        },
                        background: isNoted
                          ? "orange"
                          : isActive
                            ? "var(--color-primary-main)"
                            : isCorrect
                              ? "#78D495"
                              : isInCorrect
                                ? "#F8C9D0"
                                : "white",
                        color: isNoted
                          ? "white"
                          : isActive
                            ? "white"
                            : "var(--color-primary-main)",
                      }}
                    >
                      <Typography sx={{ fontSize: "11px" }}>
                        {question.questionNumber}
                      </Typography>
                    </Button>
                  );
                });
              })}
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default ListQuestion;
