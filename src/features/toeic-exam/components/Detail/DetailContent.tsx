import { Box, Divider, Typography } from "@mui/material";
import ResultTable from "./ResultTable";
import PracticeTabs from "./PracticeTabs";

import TestDetailInfo from "./TestDetailInfo";
import { useToeicExamInfo } from "../../hooks/useToeicExamInfo";

interface DetailProps {
  examId: number;
}
const DetailContent: React.FC<DetailProps> = ({ examId }) => {
  const { data: toeicExamInfo } = useToeicExamInfo(examId);
  return (
    <>
      <Box sx={{ pb: 2 }}>
        <TestDetailInfo
          testName={toeicExamInfo?.name || ""}
          commentCount={toeicExamInfo?.commentCount || 0}
          takenStudents={toeicExamInfo?.takenStudents || 0}
        />
      </Box>

      <Divider />

      <Box
        sx={{
          my: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: "black" }}>
          Your result
        </Typography>
        {/* <ResultTable examId={examId} /> */}
      </Box>

      <Box sx={{ width: "100%", my: 2 }}>
        <PracticeTabs />
      </Box>

      <Box></Box>
    </>
  );
};

export default DetailContent;
