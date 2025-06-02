import { useState } from "react";
import { useAttempts } from "../../../hooks/useAttempts";
import PracticeHistoryTable from "./PracticeHistoryTable";
import { TablePagination } from "@mui/material";
import TablePaginationActions from "../../../components/UI/TablePaginationActions";

const HISTORY_ATTEMPT_PAGE_SIZE = 10;

const PracticeHistory = () => {
  const [page, setPage] = useState<number>(0);
  const { data: paginatedPracticeAttempts } = useAttempts(
    {},
    {
      page,
      limit: HISTORY_ATTEMPT_PAGE_SIZE,
    },
  );

  return (
    <PracticeHistoryTable
      attempts={paginatedPracticeAttempts?.items || []}
      paginateComponent={
        <TablePagination
          component="div"
          rowsPerPageOptions={[HISTORY_ATTEMPT_PAGE_SIZE]}
          count={paginatedPracticeAttempts?.total || 0}
          rowsPerPage={HISTORY_ATTEMPT_PAGE_SIZE}
          page={page}
          onPageChange={(_event, newPage) => setPage(newPage)}
          ActionsComponent={TablePaginationActions}
        />
      }
    />
  );
};

export default PracticeHistory;
