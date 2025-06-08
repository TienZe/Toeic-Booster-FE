import { Box, Stack, Typography } from "@mui/material";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import {
  fileList2Base64,
  hasFileData,
  vocaWordClassAbrr2FullName,
} from "../../../../utils/helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewWord, getVocaById, updateVoca } from "../api/vocabulary-api";
import CreateVocabularyRequest from "../types/CreateVocabularyRequest";
import { toast } from "react-toastify";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import UpdateVocabularyRequest from "../types/UpdateVocabularyRequest";
import VocabularyModel, {
  VocabularyWordClass,
} from "../../../../types/VocabularyModel";
import VocabularyForm, { VocaFormData } from "../components/VocabularyForm";

export type VocabularyDetailsPageMode = "create" | "update";

interface VocabularyDetailsPageProps {
  onClose?: () => void;
  mode?: VocabularyDetailsPageMode;
  wordId?: string | number;
  lessonId?: string | number;
  onWordUpdatedSuccess?: (wordId: string | number) => void;
}

const VocabularyDetailsPage: React.FC<VocabularyDetailsPageProps> = ({
  onClose,
  mode,
  wordId,
  onWordUpdatedSuccess,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const createMode = mode == "create" || pathname.includes("create");

  const [searchParams] = useSearchParams();
  const vocaId = wordId ?? searchParams.get("wordId");

  const queryClient = useQueryClient();

  const { data: voca, isLoading: isLoadingVoca } = useQuery({
    queryKey: ["word", { id: vocaId }],
    queryFn: () => getVocaById(vocaId!),
    enabled: !!vocaId,
  });

  // Create system word mutation
  const createMutation = useMutation({
    mutationFn: createNewWord,
    onSuccess: (responseData: VocabularyModel) => {
      toast.success("Create vocabulary successfully");
      navigate("/admin/voca?wordId=" + responseData.id);
    },
    onError: (error) => {
      toast.error(error.message || "Create vocabulary failed");
    },
    onSettled: () => {
      createMutation.reset();
    },
  });

  // Update system word mutation
  const updateMutation = useMutation({
    mutationFn: updateVoca,
    onSuccess: (responseData: VocabularyModel) => {
      toast.success("Update vocabulary successfully");
      queryClient.setQueryData(["word", { id: vocaId }], responseData);
      onWordUpdatedSuccess?.(responseData.id);
    },
    onError: (error: { message: string | string[] }) => {
      let errorMessage = "Update vocabulary failed";
      if (error.message instanceof Array) {
        errorMessage = error.message[0];
      }
      toast.error(errorMessage);
    },
  });

  const handleSaveForm = async (data: VocaFormData) => {
    console.log("Form data:", data);

    if (createMode) {
      const request: CreateVocabularyRequest = {
        meaning: data.meaning,
        pronunciation: data.phonetic,
        partOfSpeech: vocaWordClassAbrr2FullName(data.type),
        word: data.word,
        definition: data.definition,
        example: data.example,
        exampleMeaning: data.exampleMeaning,
      };

      if (hasFileData(data.thumbnail)) {
        request.thumbnail = await fileList2Base64(data.thumbnail as FileList);
      }

      if (hasFileData(data.phoneticAudio)) {
        request.pronunciationAudio = await fileList2Base64(
          data.phoneticAudio as FileList,
        );
      }

      if (hasFileData(data.exampleAudio)) {
        request.exampleAudio = await fileList2Base64(
          data.exampleAudio as FileList,
        );
      }

      console.log("CreateVocaRequest: ", request);

      createMutation.mutate(request);
    } else {
      console.log("update mode");

      const request: UpdateVocabularyRequest = {
        id: vocaId!,
        word: data.word,
        pronunciation: data.phonetic,
        meaning: data.meaning,
        partOfSpeech: vocaWordClassAbrr2FullName(data.type),
        definition: data.definition,
        example: data.example,
        exampleMeaning: data.exampleMeaning,
      };

      if (hasFileData(data.thumbnail)) {
        request.thumbnail = await fileList2Base64(data.thumbnail as FileList);
      }

      if (hasFileData(data.phoneticAudio)) {
        request.pronunciationAudio = await fileList2Base64(
          data.phoneticAudio as FileList,
        );
      }

      if (hasFileData(data.exampleAudio)) {
        request.exampleAudio = await fileList2Base64(
          data.exampleAudio as FileList,
        );
      }

      console.log("UpdateVocaRequest: ", request);
      updateMutation.mutate(request);
    }
  };

  if (!createMode && !vocaId) {
    return <Navigate to="/admin" />;
  }

  return (
    <Box>
      {(isLoadingVoca ||
        updateMutation.isPending ||
        createMutation.isPending) && <CustomBackdrop open />}
      <Box sx={{ padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            {createMode ? "New Vocabulary" : "Vocabulary Details"}
          </Typography>
          <GoBackButton onClick={onClose} />
        </Stack>

        <VocabularyForm
          onSubmit={handleSaveForm}
          createMode={createMode}
          defaultWordData={{
            word: voca?.word || "",
            pronunciation: voca?.pronunciation || "",
            definition: voca?.definition || "",
            partOfSpeech: voca?.partOfSpeech || VocabularyWordClass.NOUN,
            meaning: voca?.meaning || "",
            example: voca?.example || "",
            exampleMeaning: voca?.exampleMeaning || "",
            pronunciationAudio: voca?.pronunciationAudio || "",
            exampleAudio: voca?.exampleAudio || "",
            thumbnail: voca?.thumbnail || null,
          }}
        />
      </Box>
    </Box>
  );
};

export default VocabularyDetailsPage;
