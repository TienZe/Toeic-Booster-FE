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
import _ from "lodash";
import { useState } from "react";
import { TOEIC_PARTS } from "../types/examType";
import Grid from "@mui/material/Grid2";
import Editor from "../../../../components/UI/Editor";
import { QuestionGroup } from "../../../../types/ToeicExam";
import { file2Base64 } from "../../../../utils/helper";
import { Image } from "../../../../components/UI/Image";
import { SaveToeicTestRequest } from "../types/SaveToeicTestRequest";
import { useFormContext, useWatch } from "react-hook-form";
import { CrPartProps } from "../types/CrPartProps";
import { getQuestionGroupChipStyle } from "../utils/helper";
import { answerIndexToLabel } from "../../../../utils/toeicExamHelper";

const part1Group = Array.from({
  length: TOEIC_PARTS.Part1.groupQuestion,
});

const CreatePart1: React.FC<CrPartProps> = ({ onUpdate }) => {
  const [group, setGroup] = useState<number>(
    TOEIC_PARTS.Part1.startGroupQuestionIndex,
  );

  const form = useFormContext<SaveToeicTestRequest>();

  const questionGroups = form.getValues(`questionGroups`);

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
        {part1Group.map((_, groupIndex) => {
          return (
            <Chip
              key={groupIndex}
              sx={{
                mr: 0.5,
                py: 1,
                mb: 0.5,
                width: 85,
                ...getQuestionGroupChipStyle(questionGroups[groupIndex], group),
              }}
              label={`Question ${TOEIC_PARTS.Part1.start + groupIndex}`}
              onClick={() => handleSwitchGroupQuestion(groupIndex)}
            />
          );
        })}
      </Box>

      {show && (
        <Part1Form
          key={"part1" + group}
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

const Part1Form: React.FC<Part1FormProps> = ({ groupIndex, onClose }) => {
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

        // const currentImageOrder = Math.max(
        //   ...groupMedias
        //     .filter((media) => media.fileType == "image")
        //     .map((media) => media.order || -1),
        //   0,
        // );

        // setValue(
        //   `questionGroups.${groupIndex}.medias`,
        //   [
        //     ...groupMedias,
        //     {
        //       id: 0,
        //       fileUrl: imageBase64Url,
        //       fileType: "image",
        //       order: currentImageOrder + 1,
        //     },
        //   ],
        //   {
        //     shouldDirty: true,
        //   },
        // );
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
                  {groupIndex * TOEIC_PARTS.Part1.questionPerGroup +
                    (questionIndex + 1)}
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
                length: TOEIC_PARTS.Part1.answerCount,
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
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                      },
                    }}
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

export default CreatePart1;
