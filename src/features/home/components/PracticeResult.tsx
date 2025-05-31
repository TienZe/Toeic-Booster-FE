import { Button, Card, Stack, Typography } from "@mui/material";
import CardTitle from "./CardTitle";
import { getDisplayedPart } from "../../../utils/toeicExamHelper";
import { Part } from "../../../types/ToeicExam";
import Badge from "../../../components/UI/Badge";

interface PracticeResultProps {
  testTitle: string;
  selectedParts?: Part[];
  fullTest?: boolean;
  dateTaken: string;
  completionTime: string;
  result: string;
  score?: number;
  id: string;
}

const PracticeResult: React.FC<PracticeResultProps> = ({
  testTitle,
  selectedParts = [],
  fullTest = false,
  dateTaken,
  completionTime,
  result,
  score,
  id,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "260px",
        minHeight: "250px",
        boxShadow: "0px 4px 0px rgba(143, 156, 173, 0.2)",
        padding: 1,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={0.5}>
        <CardTitle sx={{ marginBottom: 0.5 }}>{testTitle}</CardTitle>
        <Stack direction="row" gap={0.25} flexWrap="wrap">
          <Stack direction="row" gap={0.25} sx={{ flexWrap: "wrap" }}>
            {fullTest ? (
              <Badge color="success" label="Full test" />
            ) : (
              <>
                <Badge color="warning" label="Practice" />

                {selectedParts.map((part) => {
                  return <Badge color="info" label={getDisplayedPart(part)} />;
                })}
              </>
            )}
          </Stack>
        </Stack>
        <Stack>
          <Typography>Date Taken: {dateTaken}</Typography>
          <Typography>Completion Time: {completionTime}</Typography>
          <Typography>Result: {result}</Typography>
          {score !== undefined && <Typography>Score: {score}</Typography>}
        </Stack>
      </Stack>
      <Button
        sx={{ alignSelf: "start" }}
        onClick={() => (window.location.href = `/exams/result/${id}`)}
      >
        <Typography color="primary.main">[View Details]</Typography>
      </Button>
    </Card>
  );
};

export default PracticeResult;
