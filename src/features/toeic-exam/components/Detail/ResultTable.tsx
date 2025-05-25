import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Chip,
  Stack,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { getAttempts } from "../../api/api";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import useResultTable from "../../hooks/useResultTable";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import AdminTableContainer from "../../../admin/vocasets/components/AdminTableContainer";
import { format } from "date-fns";
import { getDisplayedPart } from "../../../../utils/toeicExamHelper";
import { ToeicTestAttempt } from "../../../../types/ToeicExam";
import Link from "../../../../components/UI/Link";

interface ResultTableProps {
  examId?: number;
}

const RowStyle = {
  wordWrap: "break-word",
};

const chipStyle = {
  backgroundColor: "#ff6f00",
  color: "white",
  marginBottom: "5px",
};

const toHHMMSS = (secs: number) => {
  //const sec_num = parseInt(secs, 10);
  const sec_num = secs;
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

const ROW_per_PAGE = 5;

const ResultTable: React.FC<ResultTableProps> = ({ examId }) => {
  const { data: attempts, isLoading: isLoadingAttempts } = useQuery({
    queryKey: ["toeicTestAttempts", { toeicTestId: examId }],
    queryFn: () => getAttempts({ toeicTestId: examId || "" }),
    enabled: !!examId,
  });

  const {
    page,
    pageData: attemptPageData,
    handleChangePage,
  } = useResultTable<ToeicTestAttempt>(attempts || [], ROW_per_PAGE);

  return (
    <>
      {isLoadingAttempts ? (
        <CustomBackdrop open />
      ) : (
        <AdminTableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width={200}>Date</TableCell>
                <TableCell width={200}>Part</TableCell>
                <TableCell width={200}>Result</TableCell>
                <TableCell width={200}>Time</TableCell>
                <TableCell width={200}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attemptPageData?.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack direction="column" spacing={0.5}>
                      <Typography>
                        {format(new Date(row.createdAt), "dd/MM/yyyy")}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ ...RowStyle }}>
                    <Stack
                      direction="row"
                      spacing={0.25}
                      sx={{ flexWrap: "wrap" }}
                    >
                      {row.isFullTest ? (
                        <Chip
                          label="Full test"
                          sx={{ ...chipStyle, backgroundColor: "success.main" }}
                        />
                      ) : (
                        <>
                          <Box sx={{ mb: 1 }}>
                            <Chip label="Practice" sx={{ ...chipStyle }} />
                          </Box>

                          {row.selectedParts.map((part) => {
                            return (
                              <Box sx={{ mb: 1 }}>
                                <Chip
                                  label={getDisplayedPart(part)}
                                  sx={{ ...chipStyle }}
                                />
                              </Box>
                            );
                          })}
                        </>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ ...RowStyle }}>
                    {row.numberOfCorrectQuestions}/{row.totalQuestions}
                  </TableCell>
                  <TableCell sx={{ ...RowStyle }}>
                    {toHHMMSS(row.takenTime)}
                  </TableCell>
                  <TableCell sx={{ ...RowStyle }} align="center">
                    <Link
                      to={`/exams/result/${row.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{
                          cursor: "pointer",
                          color: "primary.main",
                        }}
                      >
                        {`Detail`}
                      </Typography>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[ROW_per_PAGE]}
                  count={attempts?.length || 0}
                  rowsPerPage={ROW_per_PAGE}
                  page={page}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </AdminTableContainer>
      )}
    </>
  );
};

export default ResultTable;
