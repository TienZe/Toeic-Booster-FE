import { Box, IconButton, Stack, SxProps, Typography } from "@mui/material";
import { RxCross2 } from "react-icons/rx";

interface LessonHeader {
  lessonName?: string;
  title?: string;
  onExit?: () => void;
  containerSx?: SxProps;
}

const LessonHeader: React.FC<LessonHeader> = ({
  title,
  onExit,
  lessonName,
  containerSx,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          maxWidth: "980px",
          minHeight: "70px",
          mx: "auto",
          ...containerSx,
        }}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={onExit}>
            <RxCross2 style={{ color: "white", fontSize: "2rem" }} />
          </IconButton>
          <Typography
            sx={{
              color: "white",
              fontSize: "18px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {lessonName}
          </Typography>
        </Stack>
        <Stack alignItems="center">
          <img src="/logo/logo-white.svg" style={{ height: "28px" }} />
          <Typography
            color="white"
            sx={{
              fontFamily: '"Potta One"',
              fontSize: "12px",
            }}
          >
            Learn by heart
          </Typography>
        </Stack>
        <Box
          sx={{
            borderRadius: "12px",
            border: "2px solid white",
            display: "inline-block",
            minWidth: "110px",
            textAlign: "center",
            visibility: title ? "visible" : "hidden",
          }}
        >
          <Typography
            color="white"
            sx={{
              fontSize: 18,
              lineHeight: "52px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default LessonHeader;
