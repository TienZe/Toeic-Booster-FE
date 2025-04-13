import { Stack } from "@mui/material";
import { LessonCard } from "../../../components/LessonCard";
import LearningLessonProgress from "./LearningLessonProgress";
import LessonPopup from "./LessonPopup";
import { useRef, useState } from "react";

interface LessonCourseProps {
  id: string; // lesson id
  name: string;
  thumbnail: string;
  totalWords: number;
  retainedWords: number;
  reviewable: boolean;
  vocaSetId?: string;
}

const LessonCourse: React.FC<LessonCourseProps> = ({
  id,
  name,
  thumbnail,
  totalWords,
  retainedWords,
  reviewable,
  vocaSetId,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClickCard = () => {
    setOpenPopup(!openPopup);

    // onClick?.();
  };

  return (
    <Stack
      spacing={1.25}
      justifyContent="space-between"
      sx={{ width: "205px", position: "relative" }}
    >
      <LessonCard
        name={name}
        image={thumbnail}
        onClickCard={handleClickCard}
        cardRef={cardRef}
      />
      <LearningLessonProgress
        sx={{ width: "173px" }}
        totalWords={totalWords}
        retainedWords={retainedWords}
      />
      <LessonPopup
        reviewable={reviewable}
        anchorEle={cardRef.current}
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        lessonId={id}
        lessonName={name}
        retainedWords={retainedWords}
        totalWords={totalWords}
        vocaSetId={vocaSetId}
      />
    </Stack>
  );
};

export default LessonCourse;
