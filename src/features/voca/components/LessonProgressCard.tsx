import { Box, Stack, Typography } from "@mui/material";
import { Image } from "../../../components/UI/Image";

interface LessonProgressCardProps {
  icon: string;
  quantity: number;
  label: string;
}

const LessonProgressCard: React.FC<LessonProgressCardProps> = ({
  label,
  quantity,
  icon,
}) => {
  return (
    <Stack
      spacing="10px"
      direction="row"
      alignItems="start"
      sx={{
        width: "162px",
        height: "68px",
        borderRadius: "19px",
        border: "1px solid #E5E5E5",
        borderBottom: "4px solid #E5E5E5",
        padding: "10px",
      }}
    >
      <Image src={icon} sx={{ width: "24px" }} />
      <Box>
        <Typography
          color="#201F1F"
          sx={{ fontSize: "18px", fontWeight: "medium", lineHeight: "25px" }}
        >
          {quantity}
        </Typography>
        <Typography color="#AFAFAF" fontSize={12}>
          {label}
        </Typography>
      </Box>
    </Stack>
  );
};

export default LessonProgressCard;
