import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import CustomModal, {
  CustomModalProps,
} from "../../../components/UI/CustomModal";
import BoldStrokeButton from "./BoldStrokeButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import FolderSelectItem from "./FolderSelectItem";
import { AddCircle } from "@mui/icons-material";
import { getUserFolders } from "../api/user-folder";
import { useState } from "react";
import { toast } from "react-toastify";
import { attachNewWordsToLesson } from "../../shared-apis/lesson-vocabulary-api";

interface PinWordModalModalProps extends CustomModalProps {
  onClickNewFolderButton?: () => void;
  lessonVocabularyId: number;
}

const PinWordModalModal: React.FC<PinWordModalModalProps> = ({
  open,
  onClose,
  onClickNewFolderButton,
  lessonVocabularyId,
}) => {
  const { data: folders } = useQuery({
    queryKey: ["userFolders"],
    queryFn: getUserFolders,
  });

  const [validateError, setValidateError] = useState<string | null>(null);

  const attachSystemWordsMutation = useMutation({
    mutationFn: attachNewWordsToLesson,
    onSuccess: () => {
      onClose();
      toast.success("Word has been pinned");
    },
    onError: (error: { message: string }) => {
      setValidateError(error.message);
      attachSystemWordsMutation.reset();
    },
  });

  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const handlePinWord = () => {
    if (!selectedFolderId) {
      setValidateError("Please select a folder");
      return;
    }

    attachSystemWordsMutation.mutate({
      lessonId: selectedFolderId,
      words: [{ lessonVocabularyId }],
    });
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      containerSx={{
        borderRadius: "8px",
      }}
    >
      <Box sx={{ padding: 3, minWidth: "578px", py: 2 }}>
        <Typography
          variant="h5"
          sx={{ marginBottom: 1.5, textAlign: "center" }}
        >
          Pin Word
        </Typography>

        {validateError && (
          <Alert
            severity="error"
            onClose={() => setValidateError("")}
            sx={{ marginBottom: "15px" }}
          >
            {validateError}
          </Alert>
        )}

        <Typography sx={{ fontSize: "1rem", marginBottom: 2 }}>
          Select the folder you want to save to
        </Typography>

        {/* Folder List */}
        <Box sx={{ marginBottom: 1, maxHeight: "255px", overflowY: "auto" }}>
          <Stack spacing="15px" sx={{}}>
            {folders?.map((folder) => (
              <FolderSelectItem
                key={folder.id}
                name={folder.name}
                totalWords={folder.numOfWords}
                onSelect={() => setSelectedFolderId(folder.id)}
                selected={folder.id === selectedFolderId}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{ textAlign: "center", marginTop: "25px", marginBottom: "80px" }}
        >
          <Button
            startIcon={<AddCircle />}
            sx={{
              fontSize: "19px",
              mx: "auto",
              "& .MuiSvgIcon-root": {
                fontSize: "48px !important",
              },
            }}
            onClick={onClickNewFolderButton}
          >
            New folder
          </Button>
        </Box>

        <Box sx={{ marginTop: "10px" }}>
          <BoldStrokeButton
            type="submit"
            variant="contained"
            sx={{
              px: 3,
              display: "block",
              marginLeft: "auto",
              borderBottomWidth: "4px",
            }}
            disabled={attachSystemWordsMutation.isPending}
            onClick={handlePinWord}
          >
            {attachSystemWordsMutation.isPending ? (
              <CircularProgress size={20} />
            ) : (
              "Pin"
            )}
          </BoldStrokeButton>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default PinWordModalModal;
