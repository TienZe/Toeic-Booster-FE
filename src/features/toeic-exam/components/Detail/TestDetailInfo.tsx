import { Button, Stack, Typography } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PersonIcon from "@mui/icons-material/Person";
import { useQuery } from "@tanstack/react-query";
import { fetchTestDetailWithPractice } from "../../api/api";

interface TestDetailInfoProps {
  examId?: string;
}
const TestDetailInfo: React.FC<TestDetailInfoProps> = ({ examId }) => {
  const { data: testDetailPractice } = useQuery({
    queryKey: ["fetchExam", examId],
    queryFn: () => fetchTestDetailWithPractice(examId || ""),
    enabled: !!examId,
  });
  return (
    <>
      <Typography variant="h4" color="primary.main">
        {testDetailPractice?.test?.name}
      </Typography>
      <Button
        variant="contained"
        sx={{
          my: 2,
          px: 1,
          py: 0.25,
          borderRadius: 3,
        }}
      >
        Test information
      </Button>
      <Stack direction="row" spacing={0.5}>
        <AccessAlarmIcon />
        <Typography variant="subtitle1">
          Time: 120 minutes | 7 parts | 200 questions |{" "}
          {testDetailPractice?.test.commentCount} comment
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5}>
        <PersonIcon />
        <Typography variant="subtitle1">
          {testDetailPractice?.test.taken} users have practiced this test
        </Typography>
      </Stack>
    </>
  );
};

export default TestDetailInfo;
