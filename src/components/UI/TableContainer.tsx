import {
  TableContainer as MuiTableContainer,
  Paper,
  styled,
  TableContainerProps,
} from "@mui/material";

const StyledTableContainer = styled(MuiTableContainer)<TableContainerProps>(
  ({ theme }) => ({
    border: "1px solid rgba(0, 0, 0, 0.08)",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",

    "& .MuiTableHead-root .MuiTableRow-root": {
      backgroundColor: "rgba(0, 0, 0, 0.02)",
    },

    "& .MuiTableHead-root .MuiTableCell-root": {
      fontWeight: 600,
      color: theme.palette.secondary.dark,
      borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    },

    "& .MuiTableBody-root .MuiTableRow-root:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.01)",
    },

    "& .MuiTableBody-root .MuiTableRow-root:last-child td": {
      borderBottom: 0,
    },

    "& .MuiTableBody-root .MuiTableCell-root": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
    },

    "& .MuiTableCell-footer": {
      borderBottom: "none",
    },
  }),
);

const TableContainer: React.FC<TableContainerProps> = ({
  children,
  ...rest
}) => {
  return (
    <StyledTableContainer component={Paper} {...rest}>
      {children}
    </StyledTableContainer>
  );
};

export default TableContainer;
