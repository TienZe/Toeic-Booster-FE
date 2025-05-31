import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Stack, TableFooter, TablePagination, Typography } from "@mui/material";

import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import { format } from "date-fns";
import { getDisplayedPart } from "../../../../utils/toeicExamHelper";
import Link from "../../../../components/UI/Link";
import { secondToHHMMSS } from "../../../../utils/helper";
import TableContainer from "../../../../components/UI/TableContainer";
import Badge from "../../../../components/UI/Badge";
import { useAttempts } from "../../../../hooks/useAttempts";
import { useState } from "react";

interface ResultTableProps {
  examId?: number;
}

const RowStyle = {
  wordWrap: "break-word",
};

const ROW_PER_PAGE = 5;

const ResultTable: React.FC<ResultTableProps> = ({ examId }) => {
  const [page, setPage] = useState(0);

  const { data: paginatedAttempts, isLoading: isLoadingAttempts } = useAttempts(
    {
      enabled: !!examId,
    },
    {
      toeicTestId: examId || "",
      page,
      limit: ROW_PER_PAGE,
    },
  );

  return (
    <>
      {isLoadingAttempts ? (
        <CustomBackdrop open />
      ) : (
        <TableContainer sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell width={150}>Result</TableCell>
                <TableCell width={150}>Time</TableCell>
                <TableCell width={150}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAttempts?.items.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack direction="column" spacing={0.5}>
                      <Typography>
                        {format(new Date(row.createdAt), "dd/MM/yyyy")}
                      </Typography>
                      <Stack
                        direction="row"
                        gap={0.25}
                        sx={{ flexWrap: "wrap" }}
                      >
                        {row.isFullTest ? (
                          <Badge color="success" label="Full test" />
                        ) : (
                          <>
                            <Badge color="warning" label="Practice" />

                            {row.selectedParts.map((part) => {
                              return (
                                <Badge
                                  color="info"
                                  label={getDisplayedPart(part)}
                                />
                              );
                            })}
                          </>
                        )}
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ ...RowStyle }}>
                    {row.numOfCorrectAnswers}/{row.totalQuestions}
                  </TableCell>
                  <TableCell sx={{ ...RowStyle }}>
                    {secondToHHMMSS(row.takenTime)}
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
                  rowsPerPageOptions={[ROW_PER_PAGE]}
                  count={paginatedAttempts?.total || 0}
                  rowsPerPage={ROW_PER_PAGE}
                  page={page}
                  onPageChange={(_, page) => setPage(page)}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ResultTable;
