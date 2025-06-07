import { Radio, Stack, Typography } from "@mui/material";

interface FolderSelectItemProps {
  name: string;
  selected?: boolean;
  onSelect?: () => void;
  totalWords?: number;
}

const FolderSelectItem: React.FC<FolderSelectItemProps> = ({
  name,
  selected = false,
  onSelect,
  totalWords,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        border: "2px solid #E5E5E5",
        height: "74px",
        px: "20px",
        borderBottom: "5px solid #E5E5E5",
        borderRadius: "15px",
        cursor: "pointer",
        ...(selected && {
          borderColor: "primary.main",
          backgroundColor: "var(--color---color-primary-main-alpha-1)",
        }),
      }}
      onClick={onSelect}
    >
      <Typography
        sx={{ fontSize: "19px", color: selected ? "primary.main" : "#777777" }}
      >
        {name}
      </Typography>
      <Stack direction="row" alignItems="center">
        <Typography sx={{ fontSize: "15px", color: "#B4B4B4" }}>
          {totalWords} words
        </Typography>
        <Radio checked={selected} />
      </Stack>
    </Stack>
  );
};

export default FolderSelectItem;
