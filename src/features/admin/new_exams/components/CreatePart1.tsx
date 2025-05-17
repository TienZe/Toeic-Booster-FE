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
import { useEffect, useState } from "react";
import {
  groupQuestionData,
  TOEIC_PARTS,
  validateState,
} from "../types/examType";
import Grid from "@mui/material/Grid2";
import _ from "lodash";
import { convertExamData } from "../utils/helper";
import { UpdateExamReq } from "../types/UpdateExamReq";
import Editor from "../../../../components/UI/Editor";
import { useForm } from "react-hook-form";
import { answerIndexToLabel, QuestionGroup } from "../../../../types/ToeicExam";
import { file2Base64 } from "../../../../utils/helper";
import { Image } from "../../../../components/UI/Image";
interface CrPartProps1 {
  updateExamData?: (data: groupQuestionData[], part: string) => void;
  isUpdate: boolean;
  examData: groupQuestionData[];
  onUpdate: (v: UpdateExamReq | null) => void;
}

interface QuestionGroupsForm {
  questionGroups: QuestionGroup[];
}

const part1Group = Array.from({
  length: TOEIC_PARTS.Part1.groupQuestion,
});

const getChipStyle = (state: validateState = validateState.blank) => {
  switch (state) {
    case validateState.blank:
      return {};
    case validateState.pending:
      return { backgroundColor: "orange", color: "white" };
    case validateState.fulfilled:
      return {
        backgroundColor: "green",
        color: "white",
        "&:hover": { backgroundColor: "green", color: "white" },
      };
    default:
      return {};
  }
};

const DEFAULT_QUESTION_GROUPS: QuestionGroup[] = Array.from(
  { length: TOEIC_PARTS.Part1.groupQuestion },
  (_, groupIndex) => ({
    id: "",
    part: "part1",
    transcript: "",

    questions: Array.from(
      { length: TOEIC_PARTS.Part1.questionPerGroup },
      (_, questionIndex) => ({
        id: 0,
        question: "",
        explanation: "",
        questionNumber:
          groupIndex * TOEIC_PARTS.Part1.questionPerGroup + questionIndex + 1,
        A: "",
        B: "",
        C: "",
        D: "",
        correctAnswer: "",
      }),
    ),

    medias: [],
  }),
);

const CreatePart1: React.FC<CrPartProps1> = ({
  updateExamData,
  isUpdate,
  examData,
  onUpdate,
}) => {
  const {
    // formState: { errors: validationErrors },
    setValue,
    watch,
  } = useForm<QuestionGroupsForm>({
    defaultValues: {
      questionGroups: DEFAULT_QUESTION_GROUPS,
    },
  });

  const questionGroupsFormData = watch("questionGroups");
  console.log("questionGroupsFormData", questionGroupsFormData);

  console.log("isUpdate", isUpdate, examData);
  const [group, setGroup] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);

  const [part1Data, setPart1Data] = useState<groupQuestionData[]>(
    Array.from(
      { length: TOEIC_PARTS.Part1.groupQuestion },
      (_, groupIndex) => ({
        validate: validateState.blank,
        audioUrl: null,
        audioPreview: "",
        image: [],
        imagePreview: [],
        transcript: "",
        questionData: Array.from(
          { length: TOEIC_PARTS.Part1.questionPerGroup },
          (_, questionIndex) => ({
            questionNumber:
              groupIndex * TOEIC_PARTS.Part1.questionPerGroup +
              questionIndex +
              1,
            question: "",
            explain: "",
            answer: Array.from(
              { length: TOEIC_PARTS.Part1.answerCount },
              (_, index) => `Statement ${String.fromCharCode(65 + index)}`,
            ),
            correctAnswer: "",
          }),
        ),
      }),
    ),
  );

  useEffect(() => {
    if (isUpdate) {
      console.log("kkk");
      const convertedExamData = convertExamData(examData);
      if (convertedExamData.length > 0) {
        setPart1Data(convertedExamData);
      }
    }
  }, [examData]);

  const handleGroupQuestion = (groupQuestion: number) => {
    // if (!show) {
    setGroup(groupQuestion);
    setShow(true);
    // }
  };

  const handleCloseButton = (groupPara: number) => {
    if (show) {
      if (isUpdate) {
        console.log("dataupdate", part1Data[groupPara]);

        const questionData = part1Data[groupPara].questionData.map(
          ({ questionId, ...rest }) => {
            return {
              id: questionId,
              ...rest,
            };
          },
        );

        const updateData: any = {
          id: part1Data[groupPara]?.id ?? "",
          detail: part1Data[groupPara]?.detail ?? "",
          transcript: part1Data[groupPara]?.transcript ?? "",
          questionData: questionData ?? [],
          audioUrl: part1Data[groupPara]?.audioUrl ?? "",
          image: part1Data[groupPara]?.image ?? [],
        };
        console.log("newdataupdate", updateData);
        onUpdate(updateData);
      }
      setShow(false);
    }

    //validate question
    let isValidQuestion = true;
    let indexQ = -1;
    for (let i = 0; i < part1Data[groupPara].questionData.length; i++) {
      if (!part1Data[groupPara].questionData[i].question) {
        isValidQuestion = false;
        indexQ = i;
        break;
      }
    }

    //validate answer
    let isValidAnswer = true;
    let indexA = -1;
    for (let i = 0; i < part1Data[groupPara].questionData.length; i++) {
      for (
        let j = 0;
        j < part1Data[groupPara].questionData[i].answer.length;
        j++
      ) {
        if (!part1Data[groupPara].questionData[i].answer[j]) {
          isValidAnswer = false;
          indexA = j;
          break;
        } else {
          break;
          // isFullBlank = false;
        }
      }
      indexQ = i;
      if (!isValidAnswer) {
        break;
      }
    }

    if (isValidAnswer && isValidQuestion) {
      const updateData = [...part1Data];
      updateData[groupPara].validate = validateState.fulfilled;
      setPart1Data(updateData);
    } else if (indexQ < 0 && indexA < 0) {
      const updateData = [...part1Data];
      updateData[groupPara].validate = validateState.blank;
      setPart1Data(updateData);
    } else if (indexQ >= 0 && indexA >= 0) {
      const updateData = [...part1Data];
      updateData[groupPara].validate = validateState.pending;
      setPart1Data(updateData);
    }

    const part1DataUpdate = part1Data.map((item) =>
      _.omit(item, ["validate", "audioPreview", "imagePreview"]),
    );
    if (updateExamData) {
      updateExamData(part1DataUpdate, "part1");
    }
  };

  const handleCloseGroup = () => {
    if (show) {
      setShow(false);
    }
  };

  const handleAudioChange = async (
    groupIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const audioFile = event.target.files[0];

      const audioBase64Url = await file2Base64(audioFile);

      const groupMedias = questionGroupsFormData[groupIndex].medias.filter(
        (media) => media.fileType !== "audio",
      );

      setValue(`questionGroups.${groupIndex}.medias`, [
        ...groupMedias,
        {
          id: 0,
          fileUrl: audioBase64Url,
          fileType: "audio",
        },
      ]);
    }
  };

  const handleClearImage = (groupIndex: number) => {
    const groupMedias = questionGroupsFormData[groupIndex].medias.filter(
      (media) => media.fileType !== "image",
    );

    setValue(`questionGroups.${groupIndex}.medias`, groupMedias);
  };

  const handleImageChange = async (
    groupIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      for (const file of filesArray) {
        const imageBase64Url = await file2Base64(file);

        const groupMedias = questionGroupsFormData[groupIndex].medias.filter(
          (media) => media.fileType !== "image",
        );

        setValue(`questionGroups.${groupIndex}.medias`, [
          ...groupMedias,
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
                ...getChipStyle(part1Data[groupIndex]?.validate),
              }}
              label={`Question ${TOEIC_PARTS.Part1.start + groupIndex}`}
              onClick={() => handleGroupQuestion(groupIndex)}
            />
          );
        })}
      </Box>

      {show && (
        <Box
          sx={{
            py: 1,
            px: 3,
          }}
        >
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
                    onChange={(event) => handleAudioChange(group, event)}
                    style={{ display: "none" }}
                    id={`audio-upload-${group}`}
                  />
                  <label htmlFor={`audio-upload-${group}`}>
                    <Button variant="contained" component="span">
                      Upload Audio
                    </Button>
                  </label>

                  {questionGroupsFormData[group].medias
                    ?.filter((media) => media.fileType == "audio")
                    .map((audio) => (
                      <Box
                        key={audio.id}
                        sx={{ marginTop: "15px", width: "250px" }}
                      >
                        <audio controls src={audio.fileUrl} />
                      </Box>
                    ))}

                  {/* Input upload image */}
                  <input
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={(event) => handleImageChange(group, event)}
                    style={{ display: "none" }}
                    id={`image-upload-${group}`}
                  />
                  <label htmlFor={`image-upload-${group}`}>
                    <Button variant="contained" component="span" sx={{ mt: 1 }}>
                      Upload Image
                    </Button>
                  </label>

                  {_.sortBy(questionGroupsFormData[group].medias, "order")
                    ?.filter((media) => media.fileType == "image")
                    .map((image) => (
                      <Box
                        key={`${group}-${image.id}-${image.order}`}
                        mt={2}
                        textAlign="center"
                      >
                        <Image
                          src={image.fileUrl}
                          sx={{ width: 150, height: "auto", borderRadius: 1 }}
                        />
                      </Box>
                    ))}

                  {questionGroupsFormData[group].medias.filter(
                    (media) => media.fileType == "image",
                  ).length > 0 && (
                    <Button
                      variant="contained"
                      component="span"
                      sx={{ mt: 1 }}
                      onClick={() => handleClearImage(group)}
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
                  value={questionGroupsFormData[group].transcript}
                  onEditorChange={(newContent) =>
                    setValue(`questionGroups.${group}.transcript`, newContent)
                  }
                />
              </Stack>
              {questionGroupsFormData[group].questions.map(
                (question, questionIndex) => {
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
                          {group * TOEIC_PARTS.Part1.questionPerGroup +
                            (questionIndex + 1)}
                        </Box>
                        <TextField
                          label="Question"
                          value={question.question}
                          onChange={(e) =>
                            setValue(
                              `questionGroups.${group}.questions.${questionIndex}.question`,
                              e.target.value,
                            )
                          }
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
                                  setValue(
                                    `questionGroups.${group}.questions.${questionIndex}.correctAnswer`,
                                    checked
                                      ? answerIndexToLabel(answerIndex)
                                      : null,
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
                            // value={
                            //   question[`${answerIndexToLabel(answerIndex)}`] ||
                            //   ""
                            // }
                            // onChange={(e) => {
                            //   setValue(
                            //     `questionGroups.${group}.questions.${questionIndex}.${answerIndexToLabel(answerIndex)}`,
                            //     e.target.value,
                            //   );
                            // }}
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
                            setValue(
                              `questionGroups.${group}.questions.${questionIndex}.explanation`,
                              newContent,
                            )
                          }
                        />
                      </Stack>
                    </Box>
                  );
                },
              )}
              {show && (
                <Stack direction={"row"} gap={1}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleCloseButton(group);
                    }}
                  >
                    Save
                  </Button>
                  {isUpdate && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleCloseGroup();
                      }}
                    >
                      Close
                    </Button>
                  )}
                </Stack>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CreatePart1;
