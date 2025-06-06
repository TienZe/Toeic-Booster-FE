import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { TOEIC_PARTS } from "../types/examType";
import Grid from "@mui/material/Grid2";
import Editor from "../../../../components/UI/Editor";
import { QuestionGroup } from "../../../../types/ToeicExam";
import { SaveToeicTestRequest } from "../types/SaveToeicTestRequest";
import { useFormContext, useWatch } from "react-hook-form";
import { CrPartProps } from "../types/CrPartProps";
import { getQuestionGroupChipStyle } from "../utils/helper";
import { answerIndexToLabel } from "../../../../utils/toeicExamHelper";

const part5Group = Array.from({
  length: TOEIC_PARTS.Part5.groupQuestion,
});

const CreatePart5: React.FC<CrPartProps> = ({ onUpdate }) => {
  const [group, setGroup] = useState<number>(
    TOEIC_PARTS.Part5.startGroupQuestionIndex,
  ); // current actual group index
  const [show, setShow] = useState<boolean>(true);

  const form = useFormContext<SaveToeicTestRequest>();

  const questionGroups = form.getValues(`questionGroups`);

  const handleSwitchGroupQuestion = (selectedGroupIndex: number) => {
    // Update the current group question before switching
    onUpdate(group);

    setGroup(selectedGroupIndex);
    setShow(true);
  };

  const handleCloseGroupQuestion = () => {
    if (show) {
      setShow(false);
      onUpdate(group);
    }
  };

  return (
    <>
      <Box
        sx={{
          mx: 5.5,
          mb: 2,
        }}
      >
        {part5Group.map((_, internalGroupIndex) => {
          const actualGroupIndex =
            internalGroupIndex + TOEIC_PARTS.Part5.startGroupQuestionIndex;

          const questionNumber =
            TOEIC_PARTS.Part5.start +
            internalGroupIndex * TOEIC_PARTS.Part5.questionPerGroup;
          return (
            <Chip
              key={actualGroupIndex}
              sx={{
                mr: 0.5,
                py: 1,
                mb: 0.5,
                width: 85,
                ...getQuestionGroupChipStyle(
                  questionGroups[actualGroupIndex],
                  group,
                ),
              }}
              label={`Question ${questionNumber}`}
              onClick={() => handleSwitchGroupQuestion(actualGroupIndex)}
            />
          );
        })}
      </Box>

      {show && (
        <Part5Form
          key={"part5" + group}
          groupIndex={group}
          onClose={handleCloseGroupQuestion}
        />
      )}
    </>
  );
};

interface Part1FormProps {
  groupIndex: number;
  onClose: (groupIndex: number) => void;
}

const Part5Form: React.FC<Part1FormProps> = ({ groupIndex, onClose }) => {
  const form = useFormContext<SaveToeicTestRequest>();

  const questionGroup = useWatch<SaveToeicTestRequest>({
    name: `questionGroups.${groupIndex}`,
  }) as QuestionGroup;

  console.log("INSIDE FORM", questionGroup);

  return (
    <Grid container spacing={3}>
      <Grid size={3}>
        <Stack>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              "& .MuiButton-root": {
                boxShadow: "none",
              },
            }}
          ></Box>
        </Stack>
      </Grid>

      <Grid size={9}>
        <Typography my={0.75}>Transcript</Typography>
        <Stack flexDirection="column" flexGrow={1}>
          <Editor
            value={questionGroup.transcript || ""}
            onEditorChange={(newContent) =>
              form.setValue(
                `questionGroups.${groupIndex}.transcript`,
                newContent,
              )
            }
          />
        </Stack>
        {questionGroup.questions.map((question, questionIndex) => {
          return (
            <Box key={questionIndex} mb={1}>
              <Stack direction="row" spacing={0.5} sx={{ my: 1 }}>
                {/* Question number */}
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "400",
                    borderRadius: "50%",
                    padding: "15px",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {TOEIC_PARTS.Part5.start +
                    (groupIndex - TOEIC_PARTS.Part5.startGroupQuestionIndex) *
                      TOEIC_PARTS.Part5.questionPerGroup +
                    questionIndex}
                </Box>
                <TextField
                  label="Question"
                  value={question.question}
                  onChange={(e) => {
                    form.setValue(
                      `questionGroups.${groupIndex}.questions.${questionIndex}.question`,
                      e.target.value,
                    );
                  }}
                  fullWidth
                  size="small"
                />
              </Stack>

              <Typography>Answers</Typography>
              {Array.from({
                length: TOEIC_PARTS.Part5.answerCount,
              }).map((_, answerIndex) => (
                <Stack direction="row" key={answerIndex}>
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        checked={
                          question.correctAnswer ===
                          answerIndexToLabel(answerIndex)
                        }
                        onChange={(_, checked) => {
                          if (checked) {
                            form.setValue(
                              `questionGroups.${groupIndex}.questions.${questionIndex}.correctAnswer`,
                              answerIndexToLabel(answerIndex),
                            );
                          }
                        }}
                      />
                    }
                    label=""
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  <TextField
                    label={`Answer ${answerIndexToLabel(answerIndex)}`}
                    size="small"
                    fullWidth
                    margin="dense"
                    onChange={(e) => {
                      form.setValue(
                        `questionGroups.${groupIndex}.questions.${questionIndex}.${answerIndexToLabel(answerIndex)}`,
                        e.target.value,
                      );
                    }}
                    value={question[answerIndexToLabel(answerIndex)]}
                  />
                </Stack>
              ))}

              <Typography my={0.75}>Explanation</Typography>
              <Stack flexDirection="column" flexGrow={1}>
                <Editor
                  value={question.explanation}
                  onEditorChange={(newContent) =>
                    form.setValue(
                      `questionGroups.${groupIndex}.questions.${questionIndex}.explanation`,
                      newContent,
                    )
                  }
                />
              </Stack>
            </Box>
          );
        })}
        <Stack direction={"row"} gap={1} justifyContent="end" sx={{ mt: 1 }}>
          <Button
            variant="contained"
            onClick={() => {
              onClose(groupIndex);
            }}
            sx={{ boxShadow: "none" }}
          >
            Save & Close
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CreatePart5;
