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
import { answerIndexToLabel, QuestionGroup } from "../../../../types/ToeicExam";
import { file2Base64 } from "../../../../utils/helper";
import { SaveToeicTestRequest } from "../types/SaveToeicTestRequest";
import { useFormContext, useWatch } from "react-hook-form";
import { CrPartProps } from "../types/CrPartProps";
import _ from "lodash";
import { Image } from "../../../../components/UI/Image";

const part4Group = Array.from({
  length: TOEIC_PARTS.Part4.groupQuestion,
});

const CreatePart4: React.FC<CrPartProps> = ({ onUpdate }) => {
  const [group, setGroup] = useState<number>(
    TOEIC_PARTS.Part4.startGroupQuestionIndex,
  ); // current actual group index
  const [show, setShow] = useState<boolean>(true);

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
        {part4Group.map((_, internalGroupIndex) => {
          const actualGroupIndex =
            internalGroupIndex + TOEIC_PARTS.Part4.startGroupQuestionIndex;

          const startQuestionNumber =
            TOEIC_PARTS.Part4.start +
            internalGroupIndex * TOEIC_PARTS.Part4.questionPerGroup;
          const endQuestionNumber =
            startQuestionNumber + TOEIC_PARTS.Part4.questionPerGroup - 1;

          return (
            <Chip
              key={actualGroupIndex}
              sx={{
                mr: 0.5,
                py: 1,
                mb: 0.5,
                width: 120,
                backgroundColor:
                  group === actualGroupIndex
                    ? "primary.extraLight"
                    : "rgba(0, 0, 0, 0.05)",
                color: group === actualGroupIndex ? "primary.main" : "inherit",
              }}
              label={`Question ${startQuestionNumber} to ${endQuestionNumber}`}
              onClick={() => handleSwitchGroupQuestion(actualGroupIndex)}
            />
          );
        })}
      </Box>

      {show && (
        <Part4Form
          key={"part4" + group}
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

const Part4Form: React.FC<Part1FormProps> = ({ groupIndex, onClose }) => {
  const form = useFormContext<SaveToeicTestRequest>();

  const questionGroup = useWatch<SaveToeicTestRequest>({
    name: `questionGroups.${groupIndex}`,
  }) as QuestionGroup;

  console.log("INSIDE FORM", questionGroup);

  const handleAudioChange = async (
    groupIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const audioFile = event.target.files[0];
      const audioBase64Url = await file2Base64(audioFile);

      const respectiveMedias = questionGroup.medias;

      form.setValue(`questionGroups.${groupIndex}.medias`, [
        ...respectiveMedias.filter((media) => media.fileType !== "audio"),
        {
          id: 0,
          fileUrl: audioBase64Url,
          fileType: "audio",
        },
      ]);
    }
  };

  const handleClearImage = (groupIndex: number) => {
    const respectiveMedias = questionGroup.medias;

    form.setValue(
      `questionGroups.${groupIndex}.medias`,
      respectiveMedias.filter((media) => media.fileType !== "image"),
    );
  };

  const handleImageChange = async (
    groupIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      for (const file of filesArray) {
        const imageBase64Url = await file2Base64(file);

        const respectiveMedias = questionGroup.medias;

        form.setValue(`questionGroups.${groupIndex}.medias`, [
          ...respectiveMedias.filter((media) => media.fileType !== "image"),
          {
            id: 0,
            fileUrl: imageBase64Url,
            fileType: "image",
            order: 0,
          },
        ]);
      }
    }
  };

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
          >
            {/* Input upload audio */}
            <input
              accept="audio/*"
              type="file"
              onChange={(event) => handleAudioChange(groupIndex, event)}
              style={{ display: "none" }}
              id={`audio-upload-${groupIndex}`}
            />
            <label htmlFor={`audio-upload-${groupIndex}`}>
              <Button variant="outlined" component="span">
                Upload Audio
              </Button>
            </label>

            {questionGroup.medias
              ?.filter((media) => media.fileType == "audio")
              .map((audio) => (
                <Box key={audio.id} sx={{ marginTop: "15px", width: "250px" }}>
                  <audio controls src={audio.fileUrl} />
                </Box>
              ))}

            {/* Input upload image */}
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={(event) => handleImageChange(groupIndex, event)}
              style={{ display: "none" }}
              id={`image-upload-${groupIndex}`}
            />
            <label htmlFor={`image-upload-${groupIndex}`}>
              <Button variant="outlined" component="span" sx={{ mt: 1 }}>
                Upload Image
              </Button>
            </label>

            {_.sortBy(questionGroup.medias, "order")
              ?.filter((media) => media.fileType == "image")
              .map((image) => (
                <Box
                  key={`${groupIndex}-${image.id}-${image.order}`}
                  mt={2}
                  textAlign="center"
                >
                  <Image
                    src={image.fileUrl}
                    sx={{ width: 150, height: "auto", borderRadius: 1 }}
                  />
                </Box>
              ))}

            {questionGroup.medias.filter((media) => media.fileType == "image")
              .length > 0 && (
              <Button
                variant="text"
                component="span"
                sx={{ mt: 1 }}
                onClick={() => handleClearImage(groupIndex)}
              >
                Clear Image
              </Button>
            )}
          </Box>
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
                  {TOEIC_PARTS.Part4.start +
                    (groupIndex - TOEIC_PARTS.Part4.startGroupQuestionIndex) *
                      TOEIC_PARTS.Part4.questionPerGroup +
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
                length: TOEIC_PARTS.Part4.answerCount,
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
                        onChange={(_, checked) =>
                          form.setValue(
                            `questionGroups.${groupIndex}.questions.${questionIndex}.correctAnswer`,
                            checked ? answerIndexToLabel(answerIndex) : null,
                          )
                        }
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

export default CreatePart4;
