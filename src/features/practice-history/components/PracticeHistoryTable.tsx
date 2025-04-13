import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PracticeHistory } from "../types/PracticeHistory";
import { toHHMMSS } from "../../toeic-exam/utils/helper";
import { Link } from "react-router-dom";

const HeadRowStyle = {
  fontWeight: "bold",
  fontSize: 18,
  width: "25%",
  whiteSpace: "normal",
  wordWrap: "break-word",
};

const RowStyle = {
  fontSize: 16,
  wordWrap: "break-word",
};

const chipStyle = {
  backgroundColor: "#ff6f00",
  color: "white",
  marginBottom: "5px",
};

interface PracticeHistoryTableProps {
  practiceHistory: { id: string; name: string; value: PracticeHistory[] };
}

const PracticeHistoryTable: React.FC<PracticeHistoryTableProps> = ({
  practiceHistory,
}) => {
  console.log("table", practiceHistory);
  return (
    <>
      <Box mb={2.5}>
        <Typography variant="h6" sx={{ fontWeight: "600" }} mb={1}>
          {practiceHistory.name}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...HeadRowStyle }}>Date</TableCell>
                <TableCell sx={{ ...HeadRowStyle }}>Part</TableCell>
                <TableCell sx={{ ...HeadRowStyle }}>Result</TableCell>
                <TableCell sx={{ ...HeadRowStyle }}>Time</TableCell>
                <TableCell sx={{ ...HeadRowStyle }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {practiceHistory.value.map((historyRow: PracticeHistory) => {
                return (
                  <TableRow
                    key={historyRow.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Stack direction="column" spacing={0.5}>
                        <Typography>
                          {historyRow.createdAt.slice(0, 10)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={0.25}
                        sx={{ flexWrap: "wrap" }}
                      >
                        {historyRow.isFullTest ? (
                          <Chip
                            label="Fulltest"
                            sx={{
                              ...chipStyle,
                              backgroundColor: "success.main",
                            }}
                          />
                        ) : (
                          <>
                            <Box sx={{ mb: 1 }}>
                              <Chip label="Practice" sx={{ ...chipStyle }} />
                            </Box>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{ ...RowStyle }}
                    >{`${historyRow.numCorrect}/${historyRow.totalQuestion}`}</TableCell>
                    <TableCell sx={{ ...RowStyle }}>
                      {toHHMMSS(historyRow.time)}
                    </TableCell>
                    <TableCell sx={{ ...RowStyle }}>
                      <Link
                        to={`/exams/result/${historyRow.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: "#0071F9",
                            cursor: "pointer",
                            ":hover": "main.primary",
                          }}
                        >
                          {`Detail`}
                        </Typography>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default PracticeHistoryTable;
