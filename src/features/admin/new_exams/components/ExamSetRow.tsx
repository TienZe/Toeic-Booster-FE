import { TableCell, TableRow } from "@mui/material";
import {
  Publish,
  ToggleOff,
  ToggleOn,
  DeleteOutline,
  Edit,
} from "@mui/icons-material";
import { ToeicExam } from "../../../../types/ToeicExam";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";
import ActionDropdown, {
  ActionDropdownAction,
} from "../../../../components/UI/ActionDropdown";

const ExamSetRow: React.FC<{
  examSet: ToeicExam;
  onDelete?: () => void;
  onChangeStatus?: (newStatus: string) => void;
}> = ({ examSet, onDelete, onChangeStatus }) => {
  const actions: ActionDropdownAction[] = [
    {
      label: "Edit",
      icon: <Edit />,
      link: `/admin/exam-set/${examSet.id}`,
    },
    {
      label: "Delete",
      icon: <DeleteOutline />,
      onClick: onDelete,
    },
  ];

  if (examSet.status == "pending") {
    actions.push({
      label: "Publish",
      icon: <Publish />,
      onClick: () => onChangeStatus?.("active"),
    });
  } else if (examSet.status == "inactive") {
    actions.push({
      label: "Activate",
      icon: <ToggleOn />,
      onClick: () => onChangeStatus?.("active"),
    });
  } else {
    actions.push({
      label: "Deactivate",
      icon: <ToggleOff />,
      onClick: () => onChangeStatus?.("inactive"),
    });
  }

  return (
    <TableRow>
      <TableCell align="center">{examSet.id}</TableCell>
      <TableCell>{examSet.name}</TableCell>
      <TableCell>{examSet.category?.category || "N/A"}</TableCell>
      <TableCell align="center">
        {capitalizeFirstLetter(examSet.status)}
      </TableCell>
      <TableCell align="center">
        <ActionDropdown actions={actions} />
      </TableCell>
    </TableRow>
  );
};

export default ExamSetRow;
