// import { Box, Stack, TextField } from "@mui/material";
// import { Button, Avatar, Typography } from "@mui/material";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { TOEIC_PARTS, groupQuestionData } from "../../new_exams/types/examType";
// import Grid from "@mui/material/Grid2";
// import { debounce } from "lodash";

// interface CrPartProps {
//   updateExamData: (data: groupQuestionData[], part: string) => void;
//   //partIndex: keyof typeof TOEIC_PARTS;
// }
// const CrPart4: React.FC<CrPartProps> = ({ updateExamData }) => {
//   const audioRef = useRef(null);
//   const debouncedUpdateExamData = useCallback(
//     debounce(updateExamData, 500),
//     [],
//   );
//   const [part4Data, setpart4Data] = useState<groupQuestionData[]>(
//     Array.from({ length: TOEIC_PARTS.Part4.groupQuestion }, (_, index) => ({
//       audio: null,
//       audioPreview: "",
//       image: [],
//       imagePreview: [],
//       passage: "",
//       questionData: Array.from(
//         { length: TOEIC_PARTS.Part4.questionPerGroup },
//         (_, index) => ({
//           number: 0,
//           question: "",
//           answer: Array.from(
//             { length: TOEIC_PARTS.Part4.answerCount },
//             (_, index) => "",
//           ),
//         }),
//       ),
//     })),
//   );
//   //console.log(part4Data);

//   useEffect(() => {
//     debouncedUpdateExamData(part4Data, "part4");
//   }, [part4Data]);

//   // useEffect(() => {
//   //   if (audioRef.current) {
//   //     audioRef.current.load(); // Reload the audio element to reflect the new source
//   //   }
//   // }, [part4Data]);

//   const handleQuestionChange = (
//     groupIndex: number,
//     questionDataIndex: number,
//     value: string,
//   ) => {
//     let updatedData = [...part4Data];
//     updatedData[groupIndex].questionData[questionDataIndex].question = value;
//     setpart4Data(updatedData);
//   };

//   const handleAnswerChange = (
//     groupIndex: number,
//     questionDataIndex: number,
//     answerIndex: number,
//     value: string,
//   ) => {
//     let updateData = [...part4Data];
//     updateData[groupIndex].questionData[questionDataIndex].answer[answerIndex] =
//       value;
//     setpart4Data(updateData);
//   };

//   const handleAudioChange = (
//     groupIndex: number,
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     if (event.target.files && event.target.files.length > 0) {
//       let updateData = [...part4Data];
//       const file = event.target.files[0];
//       console.log(file);
//       updateData[groupIndex].audio = file;
//       const previewUrl = URL.createObjectURL(file);
//       updateData[groupIndex].audioPreview = previewUrl;
//       setpart4Data(updateData);
//     }
//   };

//   const handleImageChange = (
//     groupIndex: number,
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     if (event.target.files && event.target.files.length > 0) {
//       console.log(event.target.files);
//       let dataUpdate = [...part4Data];
//       const filesArray = Array.from(event.target.files);
//       //setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
//       dataUpdate[groupIndex].image = [
//         ...(dataUpdate[groupIndex].image || []),
//         ...filesArray,
//       ];

//       const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
//       //setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
//       dataUpdate[groupIndex].imagePreview = [
//         ...(dataUpdate[groupIndex].imagePreview || []),
//         ...previewUrls,
//       ];

//       // const file = event.target.files[0];
//       // setSelectedImage(file);
//       // const previewUrl = URL.createObjectURL(file);
//       // setImagePreview(previewUrl);
//       setpart4Data(dataUpdate);
//     }
//   };

//   const handleClearImage = (groupIndex: number) => {
//     let dataUpdate = [...part4Data];
//     dataUpdate[groupIndex].image = [];
//     dataUpdate[groupIndex].imagePreview = [];
//     setpart4Data(dataUpdate);
//   };

//   const handleEditorChange = (groupIndex: number, newContent: string) => {
//     let updateData = [...part4Data];
//     updateData[groupIndex].passage = newContent;
//     setpart4Data(updateData);
//   };
//   return (
//     <>
//       {part4Data.map((group, groupIndex) => {
//         return (
//           <Box
//             key={groupIndex}
//             sx={{
//               py: 1,
//               px: 3,
//             }}
//           >
//             <Grid container spacing={3}>
//               <Grid size={3}>
//                 <Stack>
//                   <Box
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                   >
//                     <input
//                       accept="audio/*"
//                       type="file"
//                       onChange={(event) => handleAudioChange(groupIndex, event)}
//                       style={{ display: "none" }}
//                       id={`audio-upload-4-${groupIndex}`}
//                     />
//                     <label htmlFor={`audio-upload-4-${groupIndex}`}>
//                       <Button variant="contained" component="span">
//                         Upload Audio
//                       </Button>
//                     </label>
//                     {group.audio && (
//                       <audio
//                         controls
//                         style={{ marginTop: "15px", width: "250px" }}
//                       >
//                         <source
//                           src={group.audioPreview}
//                           type={group.audio.type}
//                         />
//                       </audio>
//                     )}
//                     <Typography variant="body1" my={0.5}>
//                       {group.audio && group.audio?.name}
//                     </Typography>
//                     <input
//                       accept="image/*"
//                       type="file"
//                       multiple
//                       onChange={(event) => handleImageChange(groupIndex, event)}
//                       style={{ display: "none" }}
//                       id={`image-upload-4-${groupIndex}`}
//                     />

//                     {group.image?.length && group.image.length > 0 ? (
//                       <Button
//                         variant="contained"
//                         component="span"
//                         onClick={() => handleClearImage(groupIndex)}
//                       >
//                         Clear Image
//                       </Button>
//                     ) : (
//                       <label htmlFor={`image-upload-4-${groupIndex}`}>
//                         <Button variant="contained" component="span">
//                           Upload Image
//                         </Button>
//                       </label>
//                     )}
//                     {group.imagePreview &&
//                       group.imagePreview.map((previewUrl, index) => (
//                         <Box key={index} mt={2} textAlign="center">
//                           <Avatar
//                             src={previewUrl}
//                             alt={`Image Preview ${index}`}
//                             sx={{ width: 150, height: "auto", borderRadius: 1 }}
//                           />
//                           <Typography variant="body1" mt={1}>
//                             {group.image && group.image[index]?.name}
//                           </Typography>
//                         </Box>
//                       ))}
//                   </Box>
//                 </Stack>
//               </Grid>
//               <Grid size={9}>
//                 <Stack flexDirection="column" flexGrow={1}>
//                   <Editor
//                     apiKey={import.meta.env.VITE_TINY_KEY}
//                     value={group.passage}
//                     init={{
//                       height: 300,
//                       width: "100%",
//                       menubar: false,
//                       plugins: [
//                         "advlist autolink lists link image charmap print preview anchor",
//                         "searchreplace visualblocks code fullscreen",
//                         "insertdatetime media table paste code help wordcount",
//                       ],
//                       toolbar:
//                         "undo redo | formatselect | bold italic backcolor | \
//                alignleft aligncenter alignright alignjustify | \
//                bullist numlist outdent indent | removeformat | help",
//                     }}
//                     onEditorChange={(newContent) =>
//                       handleEditorChange(groupIndex, newContent)
//                     }
//                   />
//                   {group.questionData.map((questionData, questionDataIndex) => (
//                     <Box key={questionDataIndex} mb={1}>
//                       <Stack direction="row" spacing={0.5} sx={{ my: 1 }}>
//                         <Box
//                           sx={{
//                             background: "var(--color-primary-main)",
//                             color: "white",
//                             fontWeight: "400",
//                             borderRadius: "50%",
//                             padding: "15px",
//                             width: "35px",
//                             height: "35px",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                         >
//                           {TOEIC_PARTS.Part4.start -
//                             1 +
//                             groupIndex * TOEIC_PARTS.Part4.questionPerGroup +
//                             (questionDataIndex + 1)}
//                         </Box>
//                         <TextField
//                           label="Question"
//                           value={questionData.question}
//                           onChange={(e) =>
//                             handleQuestionChange(
//                               groupIndex,
//                               questionDataIndex,
//                               e.target.value,
//                             )
//                           }
//                           fullWidth
//                           size="small"
//                         />
//                       </Stack>

//                       <Typography>Answers</Typography>
//                       {questionData.answer.map((answer, answerIndex) => (
//                         <TextField
//                           key={answerIndex}
//                           label={`Answer ${String.fromCharCode(65 + answerIndex)}`} // A, B, C, D
//                           value={answer || ""}
//                           onChange={(e) =>
//                             handleAnswerChange(
//                               groupIndex,
//                               questionDataIndex,
//                               answerIndex,
//                               e.target.value,
//                             )
//                           }
//                           size="small"
//                           fullWidth
//                           margin="dense"
//                         />
//                       ))}
//                     </Box>
//                   ))}
//                 </Stack>
//               </Grid>
//             </Grid>
//           </Box>
//         );
//       })}
//     </>
//   );
// };

// export default CrPart4;
