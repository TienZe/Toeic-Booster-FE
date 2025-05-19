import { Button, Stack, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { ToeicExam } from "../../../../types/ToeicExam";

const ExamSetRow: React.FC<{
  examSet: ToeicExam;
  onDelete?: () => void;
}> = ({ examSet, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{examSet.id}</TableCell>
      <TableCell>{examSet.name}</TableCell>
      <TableCell align="center">{examSet?.tagName}</TableCell>
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
