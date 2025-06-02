import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableContainer from "../../../components/UI/TableContainer";
import Badge from "../../../components/UI/Badge";
import { Part, ToeicTestAttempt } from "../../../types/ToeicExam";
import { getDisplayedPart } from "../../../utils/toeicExamHelper";
import { secondToHHMMSS } from "../../../utils/helper";
import Link from "../../../components/UI/Link";
import { format } from "date-fns";

interface PracticeHistoryTableProps {
  attempts: ToeicTestAttempt[];
  paginateComponent?: React.ReactNode;
}

const PracticeHistoryTable = ({
  attempts,
  paginateComponent,
}: PracticeHistoryTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Test</TableCell>
            <TableCell align="center">Result</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attempts?.map((attempt, index) => (
            <TableRow key={index}>
              <TableCell>
                {format(new Date(attempt.createdAt), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                    {attempt.toeicTest?.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      flexWrap: "wrap",
                    }}
                  >
                    {attempt.isFullTest ? (
                      <Badge label="Full test" color="success" />
                    ) : (
                      <>
                        <Badge label="Practice" color="warning" />
                        {attempt.selectedParts.map((part) => (
                          <Badge
                            key={part}
                            label={getDisplayedPart(part as Part)}
                            color="info"
                          />
                        ))}
                      </>
                    )}
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ mb: 0.5 }}>
                  {attempt.numOfCorrectAnswers}/{attempt.totalQuestions}
                </Typography>

                {attempt.isFullTest && (
                  <Typography variant="body2">
                    Score: {attempt.score}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">
                {secondToHHMMSS(attempt.takenTime)}
              </TableCell>
              <TableCell align="center">
                <Link
                  to={`/exams/result/${attempt.toeicTestId}`}
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  View details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {paginateComponent}
    </TableContainer>
  );
};

export default PracticeHistoryTable;
