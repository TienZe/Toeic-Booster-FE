import { Box, Button, Stack, Typography } from "@mui/material";
import VocaSearching from "../../../voca/components/VocaSearching";
import SideDrawer, {
  SideDrawerProps,
} from "../../../../components/UI/SideDrawer";
import { VocabularyCardState } from "../../../../components/VocabularyCard";
import ListWords from "../../../voca/components/ListWords";
import VocabularyModel from "../../../../types/VocabularyModel";
import { useEffect, useState } from "react";
import { WordItem } from "../../../../types/voca-search";
import { toast } from "react-toastify";

interface AttachingLessonVocabularyDrawerProps
  extends Omit<SideDrawerProps, "children"> {
  onSubmit?: (words: VocabularyModel[]) => void;
  exceptedVocabularyIds?: number[];
}

const AttachingLessonVocabularyDrawer: React.FC<
  AttachingLessonVocabularyDrawerProps
> = ({ open, onClose, onSubmit, exceptedVocabularyIds }) => {
  const [selectedVocabularies, setSelectedVocabularies] = useState<
    VocabularyModel[]
  >([]);
  const handleSelectWord = (selectedWord: VocabularyModel | WordItem) => {
    if ("id" in selectedWord) {
      if (exceptedVocabularyIds?.includes(selectedWord.id)) {
        toast.info("This word is already attached to the lesson");
        return;
      }

      setSelectedVocabularies((prev) => {
        return [
          ...prev.filter((word) => word.id !== selectedWord.id),
          selectedWord as VocabularyModel,
        ];
      });
    }
  };

  const handleDeselectWord = (vocabularyId: number) => {
    setSelectedVocabularies((prev) => {
      return prev.filter((word) => word.id !== vocabularyId);
    });
  };

  const handleClickAttach = () => {
    onSubmit?.(selectedVocabularies);
    onClose?.();
  };

  useEffect(() => {
    setSelectedVocabularies([]);
  }, [open]);

  return (
    <SideDrawer open={open} onClose={onClose}>
      <Box sx={{ padding: 2, minWidth: "800px" }}>
        {/* Title */}
        <Typography variant="h4" sx={{ marginBottom: 1.5 }}>
          Attach Vocabulary
        </Typography>

        <VocaSearching
          title="Search for the word you want to attach"
          searchMode="system"
          onClickWord={handleSelectWord}
          highlightVocabularyIds={exceptedVocabularyIds}
        />

        {/* Action buttons */}
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="flex-end"
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            sx={{ width: "80px", boxShadow: "none" }}
            onClick={handleClickAttach}
            disabled={selectedVocabularies.length === 0}
          >
            Attach
          </Button>
        </Stack>

        {/* List of selected vocabularies */}
        <ListWords
          title="Selected vocabularies"
          vocabularies={selectedVocabularies}
          status={VocabularyCardState.DEFAULT}
          onCloseWordCard={handleDeselectWord}
        />
      </Box>
    </SideDrawer>
  );
};

export default AttachingLessonVocabularyDrawer;
