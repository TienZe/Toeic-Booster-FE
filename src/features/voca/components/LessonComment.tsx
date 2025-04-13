import { Avatar, Box, Stack, Typography } from "@mui/material";
import StarIcon from "./StarIcon";
import React from "react";

interface LessonCommentProps {
  reviewer: string;
  reviewerAvatar: string;
  rating: number; // [1,5]
  ratingContent: string;
  rateDate: string; // dd/MM/yyyy
}

const LessonComment: React.FC<LessonCommentProps> = ({
  reviewer,
  reviewerAvatar,
  rating,
  ratingContent,
  rateDate,
}) => {
  return (
    <Box sx={{ px: "15px", py: "20px", borderBottom: "1px solid #e5e5e5" }}>
      {/* Rate header */}
      <Stack direction="row" spacing="10px">
        <Avatar src={reviewerAvatar} sx={{ width: "60px", height: "60px" }} />
        <Box>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "medium", marginTop: "10px" }}
          >
            {reviewer}
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              color: "var(--text-light)",
              marginTop: "5px",
            }}
          >
            Rating at {rateDate}
          </Typography>
        </Box>
      </Stack>

      {/* rate star */}
      <Stack direction="row" spacing={0.25} sx={{ marginTop: "15px" }}>
        {[1, 1, 1, 1, 1].map((_, index) => (
          <StarIcon
            key={index}
            active={index < rating}
            sx={{ width: "17px" }}
          />
        ))}
      </Stack>

      {/* rate comment */}
      <Box sx={{ marginTop: "10px" }}>
        <Typography fontSize={13}>{ratingContent}</Typography>
      </Box>
    </Box>
  );
};
export default LessonComment;
