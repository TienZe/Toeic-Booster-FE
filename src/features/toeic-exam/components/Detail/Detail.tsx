import { Box } from "@mui/material";
import DetailContent from "./DetailContent";
import Comments from "../../../comment/components/Comments";
import { useParams } from "react-router-dom";
import UserToeicInfoLayout from "../../../../components/layout/toeic/UserToeicInfoLayout";

const Detail = () => {
  const routeParams = useParams<{ examId: string }>();
  const examId = Number(routeParams.examId);
  return (
    <UserToeicInfoLayout>
      <Box
        sx={{
          padding: 3,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          marginBottom: 2,
          backgroundColor: "white",
        }}
      >
        <DetailContent examId={examId} />
      </Box>
      <Box
        sx={{
          padding: 3,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Comments examId={examId} />
      </Box>
    </UserToeicInfoLayout>
  );
};

export default Detail;
