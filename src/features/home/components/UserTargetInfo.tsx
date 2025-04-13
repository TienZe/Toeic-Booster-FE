import { IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "../../../components/UI/EditIcon";

interface UserTargetInfoProps {
  label: string;
  onEdit?: () => void;
  figure: string;
  icon?: React.ReactNode;
}

const UserTargetInfo: React.FC<UserTargetInfoProps> = ({
  label,
  figure,
  icon,
  onEdit,
}) => {
  return (
    <Stack spacing={0.5} sx={{ display: "inline-flex", minWidth: "120px" }}>
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={0.5}
        alignItems="center"
        useFlexGap
        sx={{ minHeight: "32px", position: "relative" }}
      >
        {icon}
        <Typography sx={{ fontWeight: "medium" }}>{label}</Typography>
        {onEdit && (
          <IconButton
            sx={{
              marginLeft: "-4px",
              position: { xs: "absolute", md: "static" },
              right: 0,
              top: 0,
            }}
            onClick={onEdit}
          >
            <EditIcon sx={{ fontSize: 16, color: "primary.main" }} />
          </IconButton>
        )}
      </Stack>
      <Typography variant="h5" sx={{ fontSize: "22.4px" }} align="center">
        {figure}
      </Typography>
    </Stack>
  );
};

export default UserTargetInfo;
