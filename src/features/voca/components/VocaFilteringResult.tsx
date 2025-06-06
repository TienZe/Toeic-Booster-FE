import { Box, Stack, Typography } from "@mui/material";
import LessonMainContent from "./LessonMainContent";
import FilterResultGif from "../assets/filter-result-animate.gif";
import { Image } from "../../../components/UI/Image";
import ResultItem from "./ResultItem";
import TwoCardIcon from "../assets/course-progress-learned-1.svg";
import TwoRedCardIcon from "../assets/course-progress-not-learn-1.svg";
import BoldStrokeButton from "./BoldStrokeButton";
import { useQuery } from "@tanstack/react-query";
import { getLessonFilteringResult } from "../api/voca-learning";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";
import VocaChoosingModal from "./VocaChoosingModal";
import { useState } from "react";

interface VocaFilteringResultProps {
  lessonId: number;
}

const VocaFilteringResult: React.FC<VocaFilteringResultProps> = ({
  lessonId,
}) => {
  const { data: lessonFilteringResult, isLoading } = useQuery({
    queryKey: ["lesson-filtering-result", { lessonId: lessonId }],
    queryFn: () => getLessonFilteringResult(lessonId),
  });

  const [openVocaChoosingModal, setOpenVocaChoosingModal] = useState(false);

  let percentage = 0;
  if (lessonFilteringResult) {
    percentage = Math.round(
      (lessonFilteringResult.knownCount / lessonFilteringResult.totalCount) *
        100,
    );
  }

  return (
    <Stack sx={{ flex: 1 }}>
      {isLoading ? (
        <Stack justifyContent="center" sx={{ flex: 1 }}>
          <DotLoadingProgress />
        </Stack>
      ) : (
        <LessonMainContent>
          <Typography
            variant="h3"
            sx={{ my: 2, color: "primary.main", textAlign: "center" }}
          >
            Filtering Result!
          </Typography>
          <Stack direction="row" spacing={4} justifyContent="center">
            {/* Vertical Progress Bar */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: 300 }}
            >
              {/* Vertical Bar */}
              <Box
                sx={{
                  position: "relative",
                  height: 342,
                  width: 28,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "#e0e0e0",
                    borderRadius: 2,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: `${percentage}%`,
                    bgcolor: "success.main",
                    borderRadius: 2,
                    transition: "height 0.5s",
                  }}
                  aria-label={`Progress: ${percentage}%`}
                  tabIndex={0}
                />
                {/* Percentage Speech Bubble */}
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                    border: "1px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    minWidth: 60,
                    justifyContent: "center",
                    position: "absolute",
                    left: 36,
                    bottom: `${percentage}%`,
                    transform: "translateY(50%)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: "success.main", fontWeight: 700 }}
                  >
                    {percentage}%
                  </Typography>
                </Box>
              </Box>
            </Stack>

            <Image
              src={FilterResultGif}
              alt="filter-result"
              sx={{ width: 276 }}
            />
          </Stack>

          <Stack
            spacing="25px"
            direction="row"
            sx={{
              marginTop: 1,
              maxWidth: "735px",
              "& > *": { width: "50%" },
              mx: "auto",
              mt: 4,
            }}
          >
            <ResultItem
              title="Words you know"
              value={`${lessonFilteringResult?.knownCount} words`}
              icon={TwoCardIcon}
              withBorder
              iconPosition="right"
            />
            <ResultItem
              title="Unknown words"
              value={`${lessonFilteringResult?.unknownCount} words`}
              icon={TwoRedCardIcon}
              withBorder
              iconPosition="right"
            />
          </Stack>
        </LessonMainContent>
      )}

      {/* Footer button */}
      <Box
        sx={{
          width: "100%",
          borderTop: "2px solid #E5E5E5",
        }}
      >
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          sx={{ height: "100px", maxWidth: "962px", mx: "auto" }}
        >
          <BoldStrokeButton
            variant="contained"
            sx={{
              width: "254px",
            }}
            onClick={() => setOpenVocaChoosingModal(true)}
          >
            START LEARNING
          </BoldStrokeButton>
        </Stack>
      </Box>

      <VocaChoosingModal
        lessonId={lessonId}
        open={openVocaChoosingModal}
        onClose={() => setOpenVocaChoosingModal(false)}
      />
    </Stack>
  );
};

export default VocaFilteringResult;
