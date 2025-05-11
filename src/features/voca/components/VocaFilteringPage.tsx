import CustomBackdrop from "../../../components/UI/CustomBackdrop.tsx";
import LessonHeader from "./LessonHeader.tsx";
import useLesson from "../../../hooks/useLesson.ts";

import VocaFilteringProcess from "./VocaFilteringProcess.tsx";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Stack } from "@mui/material";
import VocaFilteringResult from "./VocaFilteringResult.tsx";
import { useState } from "react";

const VocaFilteringPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  const [finishFiltering, setFinishFiltering] = useState(false);

  const {
    data: lesson,
    isLoading: isLoadingLesson,
    isSuccess,
  } = useLesson(
    lessonId!,
    {
      enabled: !!lessonId,
    },
    {
      withWords: 1,
    },
  );

  if (isSuccess && (!lesson?.words || lesson.words.length === 0)) {
    let redirectLink = "/";
    if (lesson.collectionId) {
      redirectLink = `/voca/${lesson.collectionId}/lessons`;
    }

    return <Navigate to={redirectLink} />;
  }

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      {/*  Header */}
      <LessonHeader
        title="filtering"
        lessonName={lesson?.name}
        onExit={() => navigate(`/voca/${lesson?.collectionId}/lessons`)}
      />

      {isLoadingLesson ? (
        <CustomBackdrop />
      ) : (
        <>
          {finishFiltering ? (
            <VocaFilteringResult lessonId={lesson!.id} />
          ) : (
            <VocaFilteringProcess
              lesson={lesson!}
              onFinish={() => setFinishFiltering(true)}
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default VocaFilteringPage;
