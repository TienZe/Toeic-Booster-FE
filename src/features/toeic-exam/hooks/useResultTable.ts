import { useState } from "react";

export default function useResultTable<T>(data: T[], rowsPerPage: number) {
  const [page, setPage] = useState(0);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const pageData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  return {
    setPage,
    page,
    emptyRows,
    pageData,
    handleChangePage,
  };
}
