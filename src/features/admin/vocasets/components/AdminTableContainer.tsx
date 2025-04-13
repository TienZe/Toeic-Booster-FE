import { styled, TableContainer } from "@mui/material";

const AdminTableContainer = styled(TableContainer)(() => ({
  // border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 0 29px rgba(100,100,111,.2)",
  borderRadius: "8px",
  padding: "20px",

  "& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  "& .MuiTableCell-root.MuiTableCell-head": {
    paddingBottom: "16px",
    textAlign: "center",
  },
  "& .MuiTablePagination-root": {
    padding: 0,
    borderBottom: 0,
  },
}));

export default AdminTableContainer;
