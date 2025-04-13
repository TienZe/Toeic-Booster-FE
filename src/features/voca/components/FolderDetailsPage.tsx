import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Content from "../../../components/layout/Content";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getUserFolderById,
  pinNewWordToExistingFolder,
  unpinWordFromFolder,
} from "../api/user-folder";
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

const FolderDetailsPage = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const queryClient = useQueryClient();

  const { data: folder } = useQuery({
    queryKey: ["userFolders", { id: folderId }],
    queryFn: () => getUserFolderById(folderId!),
    enabled: !!folderId,
  });

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [deletedVocaId, setDeletedVocaId] = useState<string | null>(null);
  const [editedVocaId, setEditedVocaId] = useState<string | null>(null);

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

  const unpinWordMutation = useMutation({
    mutationFn: (request: { folderId: string; vocaId: string }) =>
      unpinWordFromFolder(request.folderId, request.vocaId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userFolders", { id: folderId }],
      });
    },
    onError: () => {
      toast.error("Unpin word failed!");
    },
    onSettled: () => {
      unpinWordMutation.reset();
      setDeletedVocaId(null);
    },
  });

  const handleClickOnWordItem = (wordItem: WordItem) => {
    if (!folderId) {
      return;
    }

    const request: PinNewWordToExistingFolderRequest = {
      folderId,
      word: wordItem.word,
      pronunciation: wordItem.phonetic || "",
      audioUrl: wordItem.phoneticAudio,
      translate: wordItem.meaning || "",
      wordClass: vocaWordClassAbrr2FullName(wordItem.partOfSpeech),
      example: wordItem.example,
      definition: wordItem.definition,
    };

    pinNewWordMutation.mutate(request);
  };

  const handleUnpinWord = () => {
    if (!folderId || !deletedVocaId) {
      return;
    }

    unpinWordMutation.mutate({ folderId, vocaId: deletedVocaId });
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

          {folder && folder?.words.length >= 4 && (
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
        />
      </Box>

      {/* List of pinned words */}
      <Box sx={{ backgroundColor: "#F8F8F8" }}>
        <Box sx={{ maxWidth: "878px", mx: "auto", padding: "27px 15px 48px" }}>
          <ListWords
            title="Pinned words"
            vocabularies={folder?.words || []}
            status={VocabularyCardState.DEFAULT}
            onCloseWordCard={(vocaId: string) => setDeletedVocaId(vocaId)}
            onEditWordCard={(vocaId: string) => setEditedVocaId(vocaId)}
          />

          {folder?.words.length == 0 && (
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
          initialDescription={folder.description}
          onUpdated={() =>
            queryClient.invalidateQueries({
              queryKey: ["userFolders", { id: folderId }],
            })
          }
        />
      )}

      {/* Confirm deleting word modal */}
      <CustomModal
        open={deletedVocaId !== null}
        onClose={() => setDeletedVocaId(null)}
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
              {unpinWordMutation.isPending ? "Deleting..." : "OK"}
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setDeletedVocaId(null)}
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
            folder.words.find((v) => v.id === editedVocaId) as VocabularyModel
          }
        />
      )}
    </Content>
  );
};

export default FolderDetailsPage;
