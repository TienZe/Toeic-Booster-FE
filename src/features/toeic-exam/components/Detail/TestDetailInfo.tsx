import { Button, Stack, Typography } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PersonIcon from "@mui/icons-material/Person";

interface TestDetailInfoProps {
  testName: string;
  commentCount: number;
  takenStudents: number;
}
const TestDetailInfo: React.FC<TestDetailInfoProps> = ({
  testName,
  commentCount,
  takenStudents,
}) => {
  return (
    <>
      <Typography variant="h4" color="primary.main">
        {testName}
      </Typography>
      <Button
        variant="text"
        sx={{
          my: 2,
          px: 1,
          py: 0.25,
          borderRadius: 3,
          backgroundColor: "primary.extraLight",
        }}
      >
        Test information
      </Button>
      <Stack direction="row" spacing={0.5}>
        <AccessAlarmIcon />
        <Typography variant="subtitle1">
          Time: 120 minutes | 7 parts | 200 questions | {commentCount} comment
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5}>
        <PersonIcon />
        <Typography variant="subtitle1">
          {takenStudents} users have practiced this test
        </Typography>
      </Stack>
    </>
  );
};

export default TestDetailInfo;
