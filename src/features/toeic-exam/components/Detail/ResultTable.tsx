import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Chip,
  Stack,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { fetchTestDetailWithPractice } from "../../api/api";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import useResultTable from "../../hooks/useResultTable";
import { TestPractice } from "../../types/TestDetailWithPractice";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ResultTableProps {
  examId?: number;
}

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

const ResultTable: React.FC<ResultTableProps> = ({ examId }) => {
  const ROW_per_PAGE = 5;
  const [testPractice, setTestPractice] = useState<TestPractice[]>();
  const { data: testDetailPractice, isPending: isPendingTestDetail } = useQuery(
    {
      queryKey: ["fetchExam", examId],
      queryFn: () => fetchTestDetailWithPractice(examId || ""),
      enabled: !!examId,
    },
  );

  console.log(testDetailPractice);
  useEffect(() => {
    setTestPractice(testDetailPractice?.testPractice);
  }, [testDetailPractice]);

  const { page, emptyRows, pageData, handleChangePage } =
    useResultTable<TestPractice>(testPractice || [], ROW_per_PAGE);

  const rows = pageData.map((testPractice) => {
    return {
      id: testPractice.id,
      dateTest: {
        date: testPractice.createdAt,
        tags: testPractice.listPart,
        fulltest: testPractice.isFullTest,
      },
      result: `${testPractice.numCorrect}/${testPractice.totalQuestion}`,
      time: testPractice.time,
    };
  });
  return (
    <>
      {isPendingTestDetail ? (
        <CustomBackdrop open />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...HeadRowStyle, width: "25%" }}>
                  Date
                </TableCell>
                <TableCell sx={{ ...HeadRowStyle, width: "35%" }}>
                  Part
                </TableCell>
                <TableCell sx={{ ...HeadRowStyle }}>Result</TableCell>
                <TableCell sx={{ ...HeadRowStyle }}>Time</TableCell>
                <TableCell sx={{ ...HeadRowStyle }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack direction="column" spacing={0.5}>
                      <Typography>{row.dateTest.date.slice(0, 10)}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ ...RowStyle }}>
                    <Stack
                      direction="row"
                      spacing={0.25}
                      sx={{ flexWrap: "wrap" }}
                    >
                      {row.dateTest.fulltest ? (
                        <Chip
                          label="Fulltest"
                          sx={{ ...chipStyle, backgroundColor: "success.main" }}
                        />
                      ) : (
                        <>
                          <Box sx={{ mb: 1 }}>
                            <Chip label="Practice" sx={{ ...chipStyle }} />
                          </Box>

                          {row.dateTest.tags.map((tag) => {
                            return (
                              <Box sx={{ mb: 1 }}>
                                <Chip label={tag} sx={{ ...chipStyle }} />
                              </Box>
                            );
                          })}
                        </>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ ...RowStyle }}>{row.result}</TableCell>
                  <TableCell sx={{ ...RowStyle }}>
                    {toHHMMSS(row.time)}
                  </TableCell>
                  <TableCell sx={{ ...RowStyle }}>
                    <Link
                      to={`/exams/result/${row.id}`}
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
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                    backgroundColor: "white",
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[ROW_per_PAGE]}
                  count={testDetailPractice?.testPractice?.length || 0}
                  rowsPerPage={ROW_per_PAGE}
                  page={page}
                  onPageChange={handleChangePage}
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
