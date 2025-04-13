import {
  Avatar,
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
import { Editor } from "@tinymce/tinymce-react";
import { uploadFile } from "../api/examApi";
import _ from "lodash";
import { convertExamData } from "../utils/helper";
import { UpdateExamReq } from "../types/UpdateExamReq";

interface CrPartProps1 {
  updateExamData?: (data: groupQuestionData[], part: string) => void;
  isUpdate: boolean;
  examData: groupQuestionData[];
  onUpdate: (v: UpdateExamReq | null) => void;
}

const CreatePart1: React.FC<CrPartProps1> = ({
  updateExamData,
  isUpdate,
  examData,
  onUpdate,
}) => {
  console.log("isUpdate", isUpdate, examData);
  const [group, setGroup] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const part1Group = Array.from({
    length: TOEIC_PARTS.Part1.groupQuestion,
  });
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

  const handleGroupQuestion = (groupQuestion: number) => {
    if (!show) {
      setGroup(groupQuestion);
      setShow(true);
    }
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
    //let isFullBlank = true;
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

    // if (!isValidAnswer) {
    //   toast.error(
    //     `Answer ${indexA + 1} Question ${indexQ + 1} group ${groupPara + 1}  cannot blank `,
    //   );
    // }

    // if (!isValidQuestion) {
    //   toast.error(
    //     `Question ${indexQ + 1} group ${groupPara + 1}  cannot blank `,
    //   );
    //   let updateData = [...part1Data];
    //   updateData[groupPara].validate = validateState.pending;
    //   setPart1Data(updateData);
    // } else {
    //   let updateData = [...part1Data];
    //   updateData[groupPara].validate = validateState.blank;
    //   setPart1Data(updateData);
    // }

    if (isValidAnswer && isValidQuestion) {
      let updateData = [...part1Data];
      updateData[groupPara].validate = validateState.fulfilled;
      setPart1Data(updateData);
    } else if (indexQ < 0 && indexA < 0) {
      let updateData = [...part1Data];
      updateData[groupPara].validate = validateState.blank;
      setPart1Data(updateData);
    } else if (indexQ >= 0 && indexA >= 0) {
      let updateData = [...part1Data];
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

  const handleQuestionChange = (
    groupIndex: number,
    questionDataIndex: number,
    value: string,
  ) => {
    let updatedData = [...part1Data];
    updatedData[groupIndex].questionData[questionDataIndex].question = value;
    // updatedData[groupIndex].questionData[questionDataIndex].questionNumber =
    //   group * TOEIC_PARTS.Part1.questionPerGroup + (questionDataIndex + 1);
    setPart1Data(updatedData);
  };

  const handleAnswerChange = (
    groupIndex: number,
    questionDataIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    let updateData = [...part1Data];
    updateData[groupIndex].questionData[questionDataIndex].answer[answerIndex] =
      value;
    setPart1Data(updateData);
  };

  const handleChangeCorrectAnswer = (
    groupIndex: number,
    questionDataIndex: number,
    answerIndex: number,
  ) => {
    let updateData = [...part1Data];
    updateData[groupIndex].questionData[questionDataIndex].correctAnswer =
      `${updateData[groupIndex].questionData[questionDataIndex].answer[answerIndex]}`;
    setPart1Data(updateData);
  };

  const handleEditorChange = (
    groupIndex: number,
    questionDataIndex: number,
    newContent: string,
  ) => {
    let updateData = [...part1Data];
    console.log(groupIndex, questionDataIndex, newContent);
    updateData[groupIndex].questionData[questionDataIndex].explain = newContent;
    setPart1Data(updateData);
  };

  const handleEditorChangeScript = (groupIndex: number, newContent: string) => {
    let updateData = [...part1Data];
    updateData[groupIndex].transcript = newContent;
    setPart1Data(updateData);
  };

  // const handleAudioChange = (
  //   groupIndex: number,
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     let updateData = [...part1Data];
  //     const file = event.target.files[0];
  //     console.log(file);
  //     updateData[groupIndex].audio = file;
  //     const previewUrl = URL.createObjectURL(file);
  //     updateData[groupIndex].audioPreview = previewUrl;
  //     setPart1Data(updateData);
  //   }
  // };

  const handleAudioChange = async (
    groupIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      let dataUpdate = [...part1Data];
      const file = event.target.files[0];

      let data = await uploadFile(file);

      const audioUrl = data.secure_url;
      dataUpdate[groupIndex].audioUrl = audioUrl;
      dataUpdate[groupIndex].audioPreview = audioUrl;
      setPart1Data(dataUpdate);
    }
  };

  const handleClearImage = (groupIndex: number) => {
    let dataUpdate = [...part1Data];
    dataUpdate[groupIndex].image = [];
    dataUpdate[groupIndex].imagePreview = [];
    setPart1Data(dataUpdate);
  };

  const handleImageChange = async (
    groupIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      let dataUpdate = [...part1Data];
      const filesArray = Array.from(event.target.files);

      // Upload từng file lên Cloudinary
      for (let file of filesArray) {
        let data = await uploadFile(file);
        const imageUrl = data.secure_url;

        dataUpdate[groupIndex].image = [
          ...(dataUpdate[groupIndex].image || []),
          {
            fileUrl: imageUrl,
            index: dataUpdate[groupIndex].image
              ? dataUpdate[groupIndex].image.length
              : 0,
          },
        ];

        dataUpdate[groupIndex].imagePreview = [
          ...(dataUpdate[groupIndex].imagePreview || []),
          imageUrl,
        ];
      }
      setPart1Data(dataUpdate);
    }
  };

  // const handleImageChange = (
  //   groupIndex: number,
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     console.log(event.target.files);
  //     let dataUpdate = [...part1Data];
  //     const filesArray = Array.from(event.target.files);
  //     //setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
  //     dataUpdate[groupIndex].image = [
  //       ...(dataUpdate[groupIndex].image || []),
  //       ...filesArray,
  //     ];

  //     const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
  //     //setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
  //     dataUpdate[groupIndex].imagePreview = [
  //       ...(dataUpdate[groupIndex].imagePreview || []),
  //       ...previewUrls,
  //     ];

  //     // const file = event.target.files[0];
  //     // setSelectedImage(file);
  //     // const previewUrl = URL.createObjectURL(file);
  //     // setImagePreview(previewUrl);
  //     setPart1Data(dataUpdate);
  //   }
  // };

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
                <Box display="flex" flexDirection="column" alignItems="center">
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
                  {part1Data[group].audioUrl && (
                    <audio
                      controls
                      style={{ marginTop: "15px", width: "250px" }}
                    >
                      <source
                        src={part1Data[group].audioUrl}
                        type="audio/mpeg"
                      />
                    </audio>
                  )}
                  {/* <Typography variant="body1" my={0.5}>
                    {part1Data[group].audioUrl && part1Data[group].audioUrl}
                  </Typography> */}
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
                  {part1Data[group].imagePreview &&
                    part1Data[group].imagePreview.map((previewUrl, index) => (
                      <Box key={index} mt={2} textAlign="center">
                        <Avatar
                          src={previewUrl}
                          alt={`Image Preview ${index}`}
                          sx={{ width: 150, height: "auto", borderRadius: 1 }}
                        />
                        {/* <Typography variant="body1" mt={1}>
                          {part1Data[group].image &&
                            part1Data[group].image[index].imageUrl}
                        </Typography> */}
                      </Box>
                    ))}
                  {part1Data[group].image &&
                    part1Data[group].image?.length > 0 && (
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
                  apiKey={import.meta.env.VITE_TINY_KEY}
                  value={part1Data[group].transcript}
                  init={{
                    height: 200,
                    width: "100%",
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={(newContent) =>
                    handleEditorChangeScript(group, newContent)
                  }
                />
              </Stack>
              {part1Data[group].questionData.map(
                (questionData, questionDataIndex) => {
                  return (
                    <Box key={questionDataIndex} mb={1}>
                      <Stack direction="row" spacing={0.5} sx={{ my: 1 }}>
                        <Box
                          sx={{
                            background: "var(--color-primary-main)",
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
                            (questionDataIndex + 1)}
                        </Box>
                        <TextField
                          label="Question"
                          value={questionData.question}
                          onChange={(e) =>
                            handleQuestionChange(
                              group,
                              questionDataIndex,
                              e.target.value,
                            )
                          }
                          fullWidth
                          size="small"
                        />
                      </Stack>

                      <Typography>Answers</Typography>
                      {questionData.answer.map((answer, answerIndex) => (
                        <Stack direction="row" key={answerIndex}>
                          <FormControlLabel
                            value="female"
                            control={
                              <Radio
                                checked={
                                  answer != "" &&
                                  questionData.correctAnswer === answer
                                }
                                onChange={() =>
                                  handleChangeCorrectAnswer(
                                    group,
                                    questionDataIndex,
                                    answerIndex,
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
                            label={`Answer ${String.fromCharCode(65 + answerIndex)}`}
                            value={answer || ""}
                            onChange={(e) =>
                              handleAnswerChange(
                                group,
                                questionDataIndex,
                                answerIndex,
                                e.target.value,
                              )
                            }
                            size="small"
                            fullWidth
                            margin="dense"
                            disabled
                          />
                        </Stack>
                      ))}
                      <Typography my={0.75}>Explain</Typography>
                      <Stack flexDirection="column" flexGrow={1}>
                        <Editor
                          apiKey={import.meta.env.VITE_TINY_KEY}
                          value={questionData.explain}
                          init={{
                            height: 200,
                            width: "100%",
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help",
                          }}
                          onEditorChange={(newContent) =>
                            handleEditorChange(
                              group,
                              questionDataIndex,
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
