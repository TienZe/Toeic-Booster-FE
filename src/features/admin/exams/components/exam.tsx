// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import CrPart1 from "./CrPart1";
// import { useState } from "react";
// import { groupQuestionData, partData } from "../../new_exams/types/examType";
// import { Box, Stack, TextField } from "@mui/material";
// import CrPart2 from "./CrPart2";
// import CrPart3 from "./CrPart3";
// import CrPart4 from "./CrPart4";

// const textFieldStyle = {
//   width: "50px",
//   height: "5px",
//   display: "flex-box",
// };

// export default function Exam() {
//   const initExamData: partData[] = [
//     {
//       part: "part1",
//       groupQuestionData: [],
//     },
//     {
//       part: "part2",
//       groupQuestionData: [],
//     },
//     {
//       part: "part3",
//       groupQuestionData: [],
//     },
//     {
//       part: "part4",
//       groupQuestionData: [],
//     },
//     {
//       part: "part5",
//       groupQuestionData: [],
//     },
//     {
//       part: "part6",
//       groupQuestionData: [],
//     },
//     {
//       part: "part7",
//       groupQuestionData: [],
//     },
//   ];
//   const [examData, setExamData] = useState<partData[]>(initExamData);

//   const updateExamData = (data: groupQuestionData[], part: string) => {
//     //console.log("data", data);
//     let updateExamData = [...examData];
//     const partExamData = updateExamData.find(
//       (partExamDataObj) => partExamDataObj.part === part,
//     );
//     //console.log("part exam data", partExamData);
//     if (
//       partExamData?.groupQuestionData &&
//       partExamData.groupQuestionData.length >= 0
//     ) {
//       partExamData.groupQuestionData = data;
//     }
//     setExamData(updateExamData);
//     console.log("exam data", examData);
//   };
//   return (
//     <Box
//       sx={{
//         padding: 3,
//       }}
//     >
//       <Typography color="primary.main" variant="h5">
//         Create Exam
//       </Typography>

//       <Stack spacing={0.25} sx={{ my: 1 }}>
//         <Typography color="primary.main" variant="caption">
//           Name
//         </Typography>
//         <TextField
//           label="Name"
//           variant="outlined"
//           size="small"
//           sx={{ width: "50%" }}
//         />
//       </Stack>

//       <Stack spacing={0.25} sx={{ my: 1 }}>
//         <Typography color="primary.main" variant="caption">
//           Tag
//         </Typography>
//         <TextField
//           label="Tag"
//           variant="outlined"
//           size="small"
//           sx={{ width: "50%" }}
//         />
//       </Stack>

//       <Stack spacing={0.25} sx={{ my: 1 }}>
//         <Typography color="primary.main" variant="caption">
//           Import Data
//         </Typography>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ArrowDropDownIcon />}
//             aria-controls="panel2-content"
//             id="panel2-header"
//           >
//             <Typography>Part 1</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <CrPart1 updateExamData={updateExamData} />
//           </AccordionDetails>
//         </Accordion>

//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ArrowDropDownIcon />}
//             aria-controls="panel2-content"
//             id="panel2-header"
//           >
//             <Typography>Part 2</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <CrPart2 updateExamData={updateExamData} />
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ArrowDropDownIcon />}
//             aria-controls="panel2-content"
//             id="panel2-header"
//           >
//             <Typography>Part 3</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <CrPart3 updateExamData={updateExamData} />
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ArrowDropDownIcon />}
//             aria-controls="panel2-content"
//             id="panel2-header"
//           >
//             <Typography>Part 4</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <CrPart4 updateExamData={updateExamData} />
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ArrowDropDownIcon />}
//             aria-controls="panel2-content"
//             id="panel2-header"
//           >
//             <Typography>Part 5</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//               eget.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ArrowDropDownIcon />}
//             aria-controls="panel2-content"
//             id="panel2-header"
//           >
//             <Typography>Part 6</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//               eget.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ArrowDropDownIcon />}
//             aria-controls="panel2-content"
//             id="panel2-header"
//           >
//             <Typography>Part 7</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//               eget.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//       </Stack>
//     </Box>
//   );
// }
