import { Button, Stack, TableCell, TableRow } from "@mui/material";
import { IExamModel } from "../types/Exam";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";

const ExamSetRow: React.FC<{
  examSet: IExamModel;
  onDelete?: () => void;
}> = ({ examSet, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{examSet.id}</TableCell>
      <TableCell>{examSet.name}</TableCell>
      <TableCell align="center">{examSet.time}</TableCell>
      {/* <TableCell align="center">{0}</TableCell> */}
      <TableCell align="center">{examSet?.tags[0]?.name}</TableCell>
      <TableCell align="center">
        <Stack direction="row" spacing={0.5} justifyContent="center">
          <Link to={`/admin/exam-set/${examSet.id}`}>
            <Button startIcon={<Edit />}>Edit</Button>
          </Link>
          <Button startIcon={<Delete />} color="error" onClick={onDelete}>
            Delete
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default ExamSetRow;
