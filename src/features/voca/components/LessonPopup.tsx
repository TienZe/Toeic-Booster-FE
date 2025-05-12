import { Box, Typography } from "@mui/material";
import Popup, { PopupProps } from "../../../components/UI/Popup";
import LessonButton from "./LessonButton";
import Link from "../../../components/UI/Link";

interface LessonPopupProps extends PopupProps {
  lessonId: number;
  lessonName: string;
  retainedWords: number;
  totalWords: number;
  reviewable?: boolean;
  vocaSetId?: string;
  onStartLearning?: () => void;
}

const LessonPopup: React.FC<LessonPopupProps> = ({
  open = true,
  onClose,
  sx,
  anchorEle,

  lessonId,
  lessonName,
  retainedWords,
  totalWords,
  reviewable = false,
  vocaSetId,
  onStartLearning,
}) => {
  const getStartLearningButton = () => {
    let text = "START LEARNING";
    if (reviewable) {
      text = "CONTINUE LEARNING";
    }

    if (!onStartLearning) {
      return (
        <Link to={`/lesson/learn?id=${lessonId}`}>
          <LessonButton variant="outlined" sx={{ marginTop: "10px" }}>
            {text}
          </LessonButton>
        </Link>
      );
    }

    return (
      <LessonButton
        variant="outlined"
        sx={{ marginTop: "10px" }}
        onClick={onStartLearning}
      >
        {text}
      </LessonButton>
    );
  };

  return (
    <Popup
      anchorEle={anchorEle}
      open={open}
      onClose={onClose}
      sx={{ top: "170px", left: "50%", transform: "translateX(-50%)" }}
    >
      <Box
        sx={{
          width: "300px",
          padding: "25px 15px",
          minHeight: "160px",
          borderRadius: "20px",
          backgroundColor: "#f0f0f0",
          ...sx,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            textTransform: "uppercase",
            fontWeight: "medium",
          }}
        >
          {lessonName}
        </Typography>
        <Typography sx={{ fontSize: "15px", marginTop: 1 }}>
          Acquired words: {`${retainedWords}/${totalWords}`}
        </Typography>

        {reviewable ? (
          <>
            <Link
              to={`/lesson/confirm-start-testing?id=${lessonId}&name=${lessonName}`}
            >
              <LessonButton variant="contained" sx={{ marginTop: "10px" }}>
                REVIEW
              </LessonButton>
            </Link>

            {getStartLearningButton()}

            <Link
              to={`/lesson/learning-result?id=${lessonId}${vocaSetId ? "&vocaSetId=" + vocaSetId : ""}`}
            >
              <LessonButton variant="outlined" sx={{ marginTop: "10px" }}>
                VIEW RESULT
              </LessonButton>
            </Link>
          </>
        ) : (
          getStartLearningButton()
        )}

        <Box
          sx={{
            width: "15px",
            height: "15px",
            position: "absolute",
            backgroundColor: "inherit",
            top: -6,
            left: "calc(50% - 15px)",
            transform: "rotate(45deg)",
          }}
        ></Box>
      </Box>
    </Popup>
  );
};

export default LessonPopup;
