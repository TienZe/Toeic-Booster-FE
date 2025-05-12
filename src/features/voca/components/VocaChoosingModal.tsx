import { Box, Grid2, Stack, Typography } from "@mui/material";
import CustomModal from "../../../components/UI/CustomModal";
import VocaSwitch from "../../../components/UI/VocaSwitch";
import { useState } from "react";
import WordSelectItem from "../../../components/WordSelectItem";
import BoldStrokeButton from "./BoldStrokeButton";
import { useLessonVocabularies } from "../../../hooks/useLessonVocabularies";
import { getWordThumbnail } from "../../../utils/helper";
import { LessonVocabulary } from "../../../types/LessonVocabulary";
import { useDispatch } from "react-redux";
import { lessonVocaFilteringActions } from "../../../stores/lessonVocaFilteringSlice";
import { useNavigate } from "react-router-dom";

type ChooseOption = "all" | "unknown_only";

interface VocaChoosingModalProps {
  lessonId: number;
  open: boolean;
  onClose: () => void;
}

const VocaChoosingModal = ({
  lessonId,
  open,
  onClose,
}: VocaChoosingModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chooseOption, setChooseOption] = useState<ChooseOption>();
  const [selectedLessonVocabularies, setSelectedLessonVocabularies] = useState<
    LessonVocabulary[]
  >([]);

  console.log(selectedLessonVocabularies);

  const { data: lessonVocabularies } = useLessonVocabularies(
    lessonId,
    {},
    {
      withUserLessonLearning: 1,
    },
  );

  const handleChangeOption = (newOption: ChooseOption, checked: boolean) => {
    // Uncheck case
    if (chooseOption === newOption && !checked) {
      setChooseOption(undefined);
      setSelectedLessonVocabularies([]);

      return;
    }

    // Update switch state
    setChooseOption(newOption);

    // Update selected words
    if (!lessonVocabularies) {
      return;
    }

    if (newOption === "all") {
      setSelectedLessonVocabularies([...lessonVocabularies]);
    }

    if (newOption === "unknown_only") {
      setSelectedLessonVocabularies(
        lessonVocabularies.filter(
          (word) => !word.userLessonLearning?.alreadyKnown,
        ),
      );
    }
  };

  const handleStartLearning = () => {
    // 1. Save the selected words to the store
    dispatch(
      lessonVocaFilteringActions.setFilteredLessonVocabularies({
        lessonId,
        filteredLessonVocabularies: selectedLessonVocabularies,
      }),
    );
    // 2. Go to the learning step
    navigate(`/lesson/learn?id=${lessonId}`);
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      sx={{ width: "calc(100vw - 40px)", maxWidth: 900, height: "90vh" }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Select the words you want to learn
        </Typography>

        {/* Select option form */}
        <Stack direction="row" spacing={1.5} justifyContent="center">
          <Stack
            sx={{
              width: 128,
              height: 112,
              backgroundColor: "#F7F7F7",
              borderRadius: "15px",
            }}
            justifyContent="center"
            alignItems="center"
          >
            <VocaSwitch
              checked={chooseOption === "all"}
              onChange={(checked) => handleChangeOption("all", checked)}
              sx={{ width: 57 }}
            />
            <Typography color="primary" sx={{ mt: "13px", fontWeight: 500 }}>
              All
            </Typography>
          </Stack>

          <Stack
            sx={{
              width: 128,
              height: 112,
              backgroundColor: "#F7F7F7",
              borderRadius: "15px",
            }}
            justifyContent="center"
            alignItems="center"
          >
            <VocaSwitch
              checked={chooseOption === "unknown_only"}
              onChange={(checked) =>
                handleChangeOption("unknown_only", checked)
              }
              sx={{ width: 57 }}
            />
            <Typography color="error" sx={{ mt: "13px", fontWeight: 500 }}>
              Unknown only
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ overflowY: "scroll" }}>
          <Grid2
            container
            rowSpacing="20px"
            columnSpacing="40px"
            sx={{ mt: 2, height: "calc(90vh - 350px)" }}
          >
            {lessonVocabularies?.map((lessonWord) => (
              <Grid2 size={6}>
                <WordSelectItem
                  word={lessonWord.word}
                  partOfSpeech={lessonWord.partOfSpeech}
                  image={getWordThumbnail(lessonWord)}
                  checked={
                    selectedLessonVocabularies.find(
                      (word) => word.id === lessonWord.id,
                    ) !== undefined
                  }
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedLessonVocabularies([
                        ...selectedLessonVocabularies,
                        lessonWord,
                      ]);
                    } else {
                      setSelectedLessonVocabularies(
                        selectedLessonVocabularies.filter(
                          (word) => word.id !== lessonWord.id,
                        ),
                      );
                    }
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <BoldStrokeButton
            variant="contained"
            onClick={handleStartLearning}
            sx={{ maxWidth: "260px", mx: "auto" }}
          >
            START LEARNING
          </BoldStrokeButton>
        </Stack>
      </Box>
    </CustomModal>
  );
};

export default VocaChoosingModal;
