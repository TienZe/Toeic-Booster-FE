import { Button, Card, Chip, Stack, Typography } from "@mui/material";
import CardTitle from "./CardTitle";

interface PracticeResultProps {
  testTitle: string;
  tags?: string[];
  fullTest?: boolean;
  dateTaken: string;
  completionTime: string;
  result: string;
  score?: number;
  id: string;
}

const PracticeResult: React.FC<PracticeResultProps> = ({
  testTitle,
  tags = [],
  fullTest = false,
  dateTaken,
  completionTime,
  result,
  score,
  id,
}) => {
  const chipStyle = {
    backgroundColor: "#ff6f00",
    color: "white",
  };
  if (fullTest) {
    tags = ["Full test", ...tags];
    chipStyle.backgroundColor = "success.main";
  } else {
    tags = ["Practice", ...tags];
  }

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: "250px",
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
        <Stack direction="row" spacing={0.25}>
          {tags.map((tag) => (
            <Chip label={tag} sx={{ ...chipStyle }} />
          ))}
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
