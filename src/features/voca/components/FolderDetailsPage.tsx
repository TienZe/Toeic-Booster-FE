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
import { ArrowBackIos, Edit } from "@mui/icons-material";
import ListWords from "./ListWords";
import { VocabularyCardState } from "../../../components/VocabularyCard";
import Link from "../../../components/UI/Link";
import UpdateFolderModal from "./UpdateFolderModal";
import { useCallback, useState } from "react";
import BoldStrokeButton from "./BoldStrokeButton";
import VocaSearching from "./VocaSearching";
import { toast } from "react-toastify";
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
import { PostWordItem } from "../../shared-apis/types/BulkStoreLessonVocabulary";
import { LessonVocabulary } from "../../../types/LessonVocabulary";

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
  const [editedLessonVocaId, setEditedLessonVocaId] = useState<number | null>(
    null,
  );

  const invalidateFolderDetails = useCallback(() => {
    queryClient.invalidateQueries({
      predicate: (query) => {
        const [key, params] = query.queryKey as [string, { id: string }];
        return key == "lesson" && params.id == folderId;
      },
    });
  }, [queryClient, folderId]);

  const attachWordToFolderMutation = useMutation({
    mutationFn: attachNewWordsToLesson,
    onSuccess: () => {
      toast.success("Pin new word successfully!");
      invalidateFolderDetails();
    },
    onSettled: () => {
      toast.error("Pin new word failed!");
      attachWordToFolderMutation.reset();
    },
  });

  const detachSystemWordMutation = useMutation({
    mutationFn: removeLessonVocabularyById,
    onSuccess: () => {
      toast.success("Unpin word successfully!");
      invalidateFolderDetails();
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
      attachWordToFolderMutation.mutate({
        lessonId: +folderId,
        words: [{ vocabularyId: wordItem.id }],
      });
    } else {
      wordItem = wordItem as WordItem;

      // Add custom word to the folder, don't create the related system word, just create new lesson vocabulary
      const lessonVocaData: PostWordItem = {
        word: wordItem.word,
        pronunciation: wordItem.pronunciation || "",
        pronunciationAudio: wordItem.pronunciationAudio,
        meaning: wordItem.meaning || "",
        partOfSpeech: vocaWordClassAbrr2FullName(wordItem.partOfSpeech),
        example: wordItem.example,
        definition: wordItem.definition,
      };

      console.log("lessonVocaData", lessonVocaData);

      attachWordToFolderMutation.mutate({
        lessonId: +folderId,
        words: [lessonVocaData],
      });
    }
  };

  const handleUnpinWord = () => {
    if (!folderId || !deletedFolderWordId) {
      return;
    }

    detachSystemWordMutation.mutate(deletedFolderWordId);
  };

  const handleUpdatedFlashCard = () => {
    // Refetch the folder details (including its words)
    invalidateFolderDetails();

    // Then close the modal
    setEditedLessonVocaId(null);
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
          <Link
            to="/personal-word-folder"
            sx={{
              color: "primary.main",
              lineHeight: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 1.5,
            }}
          >
            <ArrowBackIos sx={{ fontSize: "14px" }} />
            All folders
          </Link>
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

            <Button
              sx={{
                marginLeft: "auto !important",
                backgroundColor: "primary.extraLight",
              }}
            >
              <Link
                to={`/personal-word-folder/${folderId}/practice-result`}
                sx={{
                  color: "primary.main",
                  lineHeight: 1.5,
                }}
              >
                Practice Result
              </Link>
            </Button>
          </Stack>
          <Typography>{folder?.description}</Typography>
        </Box>

        <VocaSearching
          containerSx={{ marginTop: 1.5 }}
          onClickWord={handleClickOnWordItem}
          searchMode="hybrid"
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
            onEditWordCard={(lessonVocaId: number) =>
              setEditedLessonVocaId(lessonVocaId)
            }
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
          folderId={folder.id}
          initialName={folder.name}
          initialDescription={folder.description || ""}
          onUpdated={() => invalidateFolderDetails()}
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

      {editedLessonVocaId && folder && (
        <EditFlashCardModal
          key={editedLessonVocaId}
          open={editedLessonVocaId != null}
          onClose={() => setEditedLessonVocaId(null)}
          onFlashCardUpdated={handleUpdatedFlashCard}
          lessonVocabulary={
            folder?.words?.find(
              (v) => v.id === editedLessonVocaId,
            ) as LessonVocabulary
          }
        />
      )}
    </Content>
  );
};

export default FolderDetailsPage;
