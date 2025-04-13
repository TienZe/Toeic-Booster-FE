import { Clear } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

interface DeletableListItemProps {
  children: React.ReactNode;
  onDelete?: () => void;
}

const DeletableListItem: React.FC<DeletableListItemProps> = ({
  children,
  onDelete,
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      sx={{ borderBottom: "1px solid #ddd", py: 0.5 }}
    >
      <li>{children}</li>
      <IconButton onClick={onDelete} sx={{ padding: 0 }}>
        <Clear />
      </IconButton>
    </Stack>
  );
};

export default DeletableListItem;
