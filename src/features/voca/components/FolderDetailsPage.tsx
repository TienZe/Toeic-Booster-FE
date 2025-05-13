import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Content from "../../../components/layout/Content";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { pinNewWordToExistingFolder } from "../api/user-folder";
import { Edit } from "@mui/icons-material";
import ListWords from "./ListWords";
import { VocabularyCardState } from "../../../components/VocabularyCard";
import Link from "../../../components/UI/Link";
import UpdateFolderModal from "./UpdateFolderModal";
import { useState } from "react";
import BoldStrokeButton from "./BoldStrokeButton";
import VocaSearching from "./VocaSearching";
import { toast } from "react-toastify";
import PinNewWordToExistingFolderRequest from "../types/PinNewWordToExistingFolderRequest";
import { WordItem } from "../../../types/voca-search";
import { vocaWordClassAbrr2FullName } from "../../../utils/helper";
import CustomModal from "../../../components/UI/CustomModal";
import EditFlashCardModal from "./EditFlashCardModal";
import VocabularyModel from "../../../types/VocabularyModel";
import useLesson from "../../../hooks/useLesson";
import {
  attachNewWordsToLesson,
  removeLessonVocabularyById,
} from "../../shared-apis/lesson-vocabulary-api";

const FolderDetailsPage = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const queryClient = useQueryClient();

  const { data: folder } = useLesson(
    folderId!,
    { enabled: !!folderId },
    { withWords: 1 },
  );

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [deletedFolderWordId, setDeletedFolderWordId] = useState<number | null>(
    null,
  );
  const [editedVocaId, setEditedVocaId] = useState<number | null>(null);

  const pinNewWordMutation = useMutation({
    mutationFn: pinNewWordToExistingFolder,
    onSuccess: () => {
      toast.success("Pin new word successfully!");
      queryClient.invalidateQueries({
        queryKey: ["userFolders", { id: folderId }],
      });
    },
    onError: () => {
      toast.error("Pin new word failed!");
    },
    onSettled: () => {
      pinNewWordMutation.reset();
    },
  });

  const attachSystemWordsMutation = useMutation({
    mutationFn: attachNewWordsToLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const [key, params] = query.queryKey as [string, { id: string }];
          return key == "lesson" && params.id == folderId;
        },
      });
    },
    onSettled: () => {
      attachSystemWordsMutation.reset();
    },
  });

  const detachSystemWordMutation = useMutation({
    mutationFn: removeLessonVocabularyById,
    onSuccess: () => {
      toast.success("Delete word successfully!");

      queryClient.invalidateQueries({
        predicate: (query) => {
          const [key, params] = query.queryKey as [string, { id: string }];
          return key == "lesson" && params.id == folderId;
        },
      });
    },
    onSettled: () => {
      // reset state
      setDeletedFolderWordId(null);
      detachSystemWordMutation.reset();
    },
  });

  const handleClickOnWordItem = (wordItem: WordItem | VocabularyModel) => {
    if (!folderId) {
      return;
    }

    if ("id" in wordItem) {
      // This word is system word, already exists, so just attach it to the lesson
      wordItem = wordItem as VocabularyModel;
      attachSystemWordsMutation.mutate({
        lessonId: folderId,
        wordIds: [wordItem.id],
      });
    } else {
      // Handle pin new word to existing folder
      const request: PinNewWordToExistingFolderRequest = {
        folderId,
        word: wordItem.word,
        pronunciation: wordItem.pronunciation || "",
        pronunciationAudio: wordItem.pronunciationAudio,
        meaning: wordItem.meaning || "",
        partOfSpeech: vocaWordClassAbrr2FullName(wordItem.partOfSpeech),
        example: wordItem.example,
        definition: wordItem.definition,
      };

      console.log("request", request);

      // pinNewWordMutation.mutate(request);
    }
  };

  const handleUnpinWord = () => {
    if (!folderId || !deletedFolderWordId) {
      return;
    }

    detachSystemWordMutation.mutate(deletedFolderWordId);
  };

  const handleUpdatedFlashCard = () => {
    queryClient.invalidateQueries({
      queryKey: ["userFolders", { id: folderId }],
    });
    // Then close the modal
    setEditedVocaId(null);
  };

  if (!folderId) {
    return <Navigate to="/personal-word-folder" />;
  }

  return (
    <Content withoutFooter>
      <Box sx={{ maxWidth: "878px", mx: "auto", padding: "27px 15px 48px" }}>
        {/* help info */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            padding: "20px 20px 20px 25px",
            borderRadius: "14px",
            border: "2px solid #ddd",
          }}
        >
          <div>
            <Typography
              variant="inherit"
              sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
              Learning and Practice
            </Typography>
            <Typography
              variant="inherit"
              sx={{ fontSize: "15px", marginTop: 1 }}
            >
              You can use vocabulary learning feature after you pin at least 4
              words.
            </Typography>
          </div>

          {folder && folder?.words?.length && folder.words.length >= 4 && (
            <BoldStrokeButton
              variant="contained"
              sx={{ maxWidth: "200px", borderBottomWidth: "2px" }}
              onClick={() => navigate("practice")}
            >
              START PRACTICE
            </BoldStrokeButton>
          )}
        </Stack>

        {/*  folder details */}
        <Box sx={{ marginTop: 1.5 }}>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              {folder?.name}
            </Typography>

            <IconButton
              onClick={() => setOpenUpdateModal(true)}
              sx={{ padding: 0, marginTop: "-2px !important" }}
            >
              <Edit />
            </IconButton>

            <Link
              to="/personal-word-folder"
              sx={{
                color: "primary.main",
                lineHeight: 1.5,
                marginLeft: "auto !important",
              }}
            >
              All folders
            </Link>
          </Stack>
          <Typography>{folder?.description}</Typography>
        </Box>

        <VocaSearching
          containerSx={{ marginTop: 1.5 }}
          onClickWord={handleClickOnWordItem}
          searchMode="system"
        />
      </Box>

      {/* List of pinned words */}
      <Box sx={{ backgroundColor: "#F8F8F8" }}>
        <Box sx={{ maxWidth: "878px", mx: "auto", padding: "27px 15px 48px" }}>
          <ListWords
            title="Pinned words"
            vocabularies={folder?.words || []}
            status={VocabularyCardState.DEFAULT}
            onCloseWordCard={(vocaId: number) => setDeletedFolderWordId(vocaId)}
            onEditWordCard={(vocaId: number) => setEditedVocaId(vocaId)}
          />

          {folder?.words?.length == 0 && (
            <Typography>You haven't pinned any word yet</Typography>
          )}
        </Box>
      </Box>

      {folder && (
        <UpdateFolderModal
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          id={folder.id}
          initialName={folder.name}
          initialDescription={folder.description || ""}
          onUpdated={() =>
            queryClient.invalidateQueries({
              queryKey: ["userFolders", { id: folderId }],
            })
          }
        />
      )}

      {/* Confirm deleting word modal */}
      <CustomModal
        open={deletedFolderWordId !== null}
        onClose={() => setDeletedFolderWordId(null)}
      >
        <Box sx={{ py: 1.5, maxWidth: "400px", textAlign: "center" }}>
          <Typography variant="h6" sx={{ mx: 2, fontWeight: "bold" }}>
            Confirm remove word
          </Typography>
          <Divider sx={{ my: 0.5 }} />
          <Typography sx={{ mx: 2 }}>
            Are you sure you want to delete the word from this folder?
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            justifyContent="center"
            sx={{ marginTop: 1 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleUnpinWord}
              sx={{ boxShadow: "none", minWidth: "85px" }}
            >
              {detachSystemWordMutation.isPending ? "Deleting..." : "OK"}
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setDeletedFolderWordId(null)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal>

      {editedVocaId && folder && (
        <EditFlashCardModal
          key={editedVocaId}
          open={editedVocaId != null}
          onClose={() => setEditedVocaId(null)}
          onFlashCardUpdated={handleUpdatedFlashCard}
          voca={
            folder?.words?.find((v) => v.id === editedVocaId) as VocabularyModel
          }
        />
      )}
    </Content>
  );
};

export default FolderDetailsPage;
