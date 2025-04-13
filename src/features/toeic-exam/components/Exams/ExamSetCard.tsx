import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import CustomCard from "../../../home/components/CustomCard";
import CardTitle from "../../../home/components/CardTitle";
import FaClockIcon from "../../../home/components/FaClockIcon";
import FaUserEditIcon from "../../../home/components/FaUserEditIcon";
import FaCommentIcon from "../../../home/components/FaCommentIcon";

interface ExamCardProps {
  title: string;
  duration: string;
  totalParticipants: number;
  totalComments: number;
  numOfParts: number;
  numOfQuestions: number;
  tags?: string[];
}

const ExamSetCard: React.FC<ExamCardProps> = ({
  title,
  duration,
  totalParticipants,
  totalComments,
  numOfParts,
  numOfQuestions,
  tags,
}) => {
  return (
    <CustomCard
      sx={{
        minWidth: "280px",
        backgroundColor: "#f8f9fa",
        padding: 1,
        display: "inline-flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <CardTitle>{title}</CardTitle>
      <div>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.25}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: "secondary.main",
                height: "1rem",
                alignSelf: "center",
              }}
            />
          }
        >
          <Stack direction="row" alignItems="center" spacing={0.25}>
            <FaClockIcon sx={{ fontSize: ".9rem", marginRight: 0.25 }} />
            <Typography variant="caption">{duration}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.25}>
            <FaUserEditIcon sx={{ fontSize: "1rem" }} />
            <Typography variant="caption">{totalParticipants}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.25}>
            <FaCommentIcon sx={{ fontSize: ".9rem" }} />
            <Typography variant="caption">{totalComments}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.25}>
          <Typography variant="caption">
            {numOfParts} part{numOfParts > 1 && "s"}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "secondary.main" }}
          />
          <Typography variant="caption">
            {numOfQuestions} question{numOfQuestions > 1 && "s"}
          </Typography>
        </Stack>
      </div>
      <Stack direction="row" spacing={1} sx={{ minHeight: "22px" }}>
        {tags?.map((tag) => (
          <Chip
            label={`#${tag}`}
            sx={{ color: "primary.main", backgroundColor: "#f0f8ff" }}
          />
        ))}
      </Stack>
      <Button variant="outlined" sx={{ borderRadius: ".35rem", marginTop: 2 }}>
        Details
      </Button>
    </CustomCard>
  );
};

export default ExamSetCard;
