import { TableCell, TableRow } from "@mui/material";
import VocaSetModel from "../../../../types/VocaSetModel";
import { Image } from "../../../../components/UI/Image";
import ActionDropdown, {
  ActionDropdownAction,
} from "../../../../components/UI/ActionDropdown";
import { DeleteOutline, Tune } from "@mui/icons-material";

import DefaultVocaSetThumbnail from "../../../../assets/images/voca/default.png";

const VocaSetRow: React.FC<{
  vocaSet: VocaSetModel;
  onDelete: (vocaSetId: string) => void;
}> = ({ vocaSet, onDelete }) => {
  const actions: ActionDropdownAction[] = [
    {
      label: "Manage",
      icon: <Tune />,
      link: `details?id=${vocaSet.id}`,
    },
    {
      label: "Delete",
      icon: <DeleteOutline />,
      onClick: () => onDelete(vocaSet.id),
    },
  ];

  return (
    <TableRow>
      <TableCell
        sx={{
          maxWidth: "50px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {vocaSet.id}
      </TableCell>
      <TableCell align="center">
        <Image
          src={vocaSet.thumbnail || DefaultVocaSetThumbnail}
          sx={{
            width: "auto",
            height: "84px",
          }}
        />
      </TableCell>
      <TableCell>{vocaSet.name}</TableCell>
      <TableCell align="center">{0}</TableCell>
      <TableCell align="center">{vocaSet?.lessonsCount || 0}</TableCell>
      <TableCell align="center">
        <ActionDropdown actions={actions} />
      </TableCell>
    </TableRow>
  );
};

export default VocaSetRow;
