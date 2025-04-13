import { useCallback, useState } from "react";

export default function useAdminTablePagination<T>(
  data: T[],
  rowsPerPage: number,
) {
  const [page, setPage_] = useState(0);

  const totalRows = data.length;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const pageData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const setPage = useCallback(
    (newPage: number) => {
      const lastPage = Math.ceil(totalRows / rowsPerPage) - 1;
      if (newPage < 0) {
        newPage = 0;
      }
      if (newPage > lastPage) {
        newPage = lastPage;
      }

      setPage_(newPage);
    },
    [totalRows, rowsPerPage],
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const invalidatePage = (newDataLength: number) => {
    const newLastPage = Math.ceil(newDataLength / rowsPerPage) - 1;
    if (page < 0) {
      setPage_(0);
    }
    if (page > newLastPage) {
      setPage_(newLastPage);
    }
  };

  return {
    setPage,
    page,
    emptyRows,
    pageData,
    handleChangePage,
    invalidatePage,
  };
}
