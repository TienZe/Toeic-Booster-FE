import { Box, Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import RoundedInput from "../../../../components/UI/RoundedInput";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import { AddPhotoAlternate } from "@mui/icons-material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RoundedFileInput from "../components/RoundedFileInput";
import VocabularyCardWrapper from "../../../../components/VocabularyCardWrapper";
import VocabularyFrontSide from "../../../../components/VocabularyFrontSide";
import { useEffect, useState } from "react";
import VocabularyBackSide from "../../../../components/VocabularyBackSide";
import {
  fileList2Base64,
  getPlaceholderImage,
  getWordThumbnail,
  hasFileData,
  isValidVocaWordClass,
  mustBeAudioIfExistValue,
  mustBeImageIfExistValue,
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
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";

interface VocaFormData {
  word: string;
  phonetic: string;
  phoneticAudio?: FileList;
  definition: string;
  type: VocabularyWordClass;
  meaning: string;

  thumbnail?: FileList;
  exampleAudio?: FileList;
  example?: string | null;
  exampleMeaning?: string | null;
}

type MediaFileSrcs = {
  imageSrc: string;
  phoneticAudioSrc: string;
  exampleAudioSrc: string;
};

const validationRules = {
  word: {
    required: "Word is required",
  },
  type: {
    required: "Type is required",
    validate: (value: string) =>
      isValidVocaWordClass(value) || "Invalid vocabulary type",
  },
  phonetic: {
    required: "Phonetic is required",
  },
  definition: {
    required: "Definition is required",
  },
  meaning: {
    required: "Meaning is required",
  },
};

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
  lessonId,
  onWordUpdatedSuccess,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const createMode = mode == "create" || pathname.includes("create");

  const [searchParams] = useSearchParams();
  lessonId = lessonId ?? searchParams.get("lessonId");
  const vocaId = wordId ?? searchParams.get("id");

  const queryClient = useQueryClient();

  const { data: voca, isLoading: isLoadingVoca } = useQuery({
    queryKey: ["word", { id: vocaId }],
    queryFn: () => getVocaById(vocaId!),
    enabled: !!vocaId,
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset: resetVocaForm,
    formState: { errors },
  } = useForm<VocaFormData>({
    defaultValues: {
      word: "",
      phonetic: "",
      definition: "",
      type: VocabularyWordClass.NOUN,
      meaning: "",
      example: "",
      exampleMeaning: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createNewWord,
    onSuccess: (responseData: VocabularyModel) => {
      toast.success("Create vocabulary successfully");
      navigate("/admin/voca?id=" + responseData.id);
    },
    onError: (error) => {
      toast.error(error.message || "Create vocabulary failed");
    },
    onSettled: () => {
      createMutation.reset();
    },
  });

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

  const [wordInput, typeInput, phoneticInput, meaningInput] = watch([
    "word",
    "type",
    "phonetic",
    "meaning",
  ]);

  const [mediaInput, setMediaInput] = useState<MediaFileSrcs>({
    imageSrc: voca?.thumbnail || getPlaceholderImage(150, 150),
    phoneticAudioSrc: voca?.pronunciationAudio || "",
    exampleAudioSrc: voca?.exampleAudio || "",
  });

  const handleSaveForm: SubmitHandler<VocaFormData> = async (data) => {
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

  const handleChangeMediaInput = (type: keyof MediaFileSrcs, src: string) => {
    setMediaInput((prev) => ({ ...prev, [type]: src }));
  };

  useEffect(() => {
    if (voca) {
      console.log("Voca changes, reset form");
      resetVocaForm({
        word: voca.word,
        phonetic: voca.pronunciation,
        definition: voca.definition,
        type: voca.partOfSpeech,
        meaning: voca.meaning,
        example: voca.example,
        exampleMeaning: voca.exampleMeaning,
      });

      setMediaInput({
        imageSrc: getWordThumbnail(voca),
        phoneticAudioSrc: voca.pronunciationAudio || "",
        exampleAudioSrc: voca.exampleAudio || "",
      });
    }
  }, [voca, resetVocaForm]);

  // if (createMode && !lessonId) {
  //   return <Navigate to="/admin/voca-set" />;
  // }

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

        <Stack direction="row" spacing={4}>
          <form
            id="details-voca-form"
            style={{ marginBottom: "2rem" }}
            onSubmit={handleSubmit(handleSaveForm)}
          >
            <Stack direction="row" spacing={2} alignItems="start">
              <Grid2 spacing={1} container sx={{ maxWidth: "600px" }}>
                <Grid2 size={12}>
                  <Controller
                    name="word"
                    control={control}
                    rules={validationRules.word}
                    render={({ field }) => (
                      <RoundedInput
                        {...field}
                        label="Word"
                        placeholder="Enter the lesson name"
                        padding="16.5px 14px"
                        borderRadius={4}
                        gap={0.5}
                        requiredSign
                        validationError={errors.word?.message}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Controller
                    name="type"
                    control={control}
                    rules={validationRules.type}
                    render={({ field }) => (
                      <BootstrapSelect
                        {...field}
                        defaultValue={VocabularyWordClass.NOUN}
                        label="Type"
                        gap={0.5}
                        requiredSign
                        validationError={errors.type?.message}
                        itemLabels={Object.values(VocabularyWordClass)}
                        itemValues={Object.values(VocabularyWordClass)}
                      />
                    )}
                  />
                </Grid2>

                <Grid2 size={8}>
                  <RoundedFileInput
                    register={register("thumbnail", {
                      required: {
                        value: createMode,
                        message: "Vocabulary Thumbnail is required",
                      },
                      validate: (value) =>
                        mustBeImageIfExistValue(value) ||
                        "Please choose an image file",
                    })}
                    requiredSign
                    validationError={errors.thumbnail?.message}
                    label="Image"
                    borderRadius={4}
                    gap={0.5}
                    padding="16.5px 14px"
                    iconButton={<AddPhotoAlternate />}
                    defaultFileSrc={voca?.thumbnail as string} // update/create voca at admin cannot be null
                    onChangeFile={(newFileSrc) =>
                      handleChangeMediaInput("imageSrc", newFileSrc)
                    }
                  />
                </Grid2>

                <Grid2 size={12}>
                  <Controller
                    name="meaning"
                    control={control}
                    rules={validationRules.meaning}
                    render={({ field }) => (
                      <RoundedInput
                        {...field}
                        label="Meaning"
                        borderRadius={4}
                        gap={0.5}
                        padding="16.5px 14px"
                        requiredSign
                        validationError={errors.meaning?.message}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Controller
                    name="phonetic"
                    control={control}
                    rules={validationRules.phonetic}
                    render={({ field }) => (
                      <RoundedInput
                        {...field}
                        label="Phonetic"
                        borderRadius={4}
                        gap={0.5}
                        padding="16.5px 14px"
                        requiredSign
                        validationError={errors.phonetic?.message}
                      />
                    )}
                  />
                </Grid2>

                <Grid2 size={8}>
                  <RoundedFileInput
                    register={register("phoneticAudio", {
                      validate: (value) =>
                        mustBeAudioIfExistValue(value) ||
                        "Please choose an audio file",
                    })}
                    requiredSign
                    validationError={errors.phoneticAudio?.message}
                    label="Phonetic Audio"
                    borderRadius={4}
                    gap={0.5}
                    padding="16.5px 14px"
                    defaultFileSrc={voca?.pronunciationAudio || ""}
                    onChangeFile={(newFileSrc) =>
                      handleChangeMediaInput("phoneticAudioSrc", newFileSrc)
                    }
                  />
                </Grid2>

                <Grid2 size={12}>
                  <Controller
                    name="definition"
                    control={control}
                    rules={validationRules.definition}
                    render={({ field }) => (
                      <RoundedInput
                        {...field}
                        label="Definition"
                        borderRadius={4}
                        gap={0.5}
                        padding="16.5px 14px"
                        multiline
                        rows={2}
                        requiredSign
                        validationError={errors.definition?.message}
                      />
                    )}
                  />
                </Grid2>

                <Grid2 size={12}>
                  <Controller
                    name="example"
                    control={control}
                    render={({ field }) => (
                      <RoundedInput
                        {...field}
                        label="Example"
                        borderRadius={4}
                        gap={0.5}
                        padding="16.5px 14px"
                        multiline
                        rows={2}
                        validationError={errors.example?.message}
                      />
                    )}
                  />
                </Grid2>

                <Grid2 size={12}>
                  <RoundedFileInput
                    register={register("exampleAudio", {
                      validate: (value) =>
                        mustBeAudioIfExistValue(value) ||
                        "Please choose an audio file",
                    })}
                    label="Example Audio"
                    borderRadius={4}
                    gap={0.5}
                    padding="16.5px 14px"
                    validationError={errors.exampleAudio?.message}
                    defaultFileSrc={voca?.exampleAudio || ""}
                    onChangeFile={(newFileSrc) =>
                      handleChangeMediaInput("exampleAudioSrc", newFileSrc)
                    }
                  />
                </Grid2>

                <Grid2 size={12}>
                  <Controller
                    name="exampleMeaning"
                    control={control}
                    render={({ field }) => (
                      <RoundedInput
                        {...field}
                        label="Example Meaning"
                        borderRadius={4}
                        gap={0.5}
                        padding="16.5px 14px"
                        multiline
                        rows={2}
                        validationError={errors.exampleMeaning?.message}
                      />
                    )}
                  />
                </Grid2>

                <Grid2 size={12}>
                  <Stack direction="row" spacing={0.5} justifyContent="end">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ float: "right", px: "24px", minWidth: "110px" }}
                    >
                      {createMode ? "Create" : "Save"}
                    </Button>
                  </Stack>
                </Grid2>
              </Grid2>
            </Stack>
          </form>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Stack spacing={2}>
            <Stack direction="row" spacing={3}>
              <VocabularyCardWrapper>
                <VocabularyFrontSide
                  word={wordInput || "word"}
                  phonetic={phoneticInput || "/phonetic/"}
                  image={mediaInput.imageSrc}
                />
              </VocabularyCardWrapper>
              <VocabularyCardWrapper>
                <VocabularyBackSide
                  type={typeInput || "type"}
                  meaning={meaningInput || "meaning"}
                />
              </VocabularyCardWrapper>
            </Stack>

            <Stack spacing={0.5}>
              <Typography>Phonetic Audio Preview</Typography>
              <audio src={mediaInput.phoneticAudioSrc} controls />
            </Stack>
            <Stack spacing={0.5}>
              <Typography>Example Audio Preview</Typography>
              <audio src={mediaInput.exampleAudioSrc} controls />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default VocabularyDetailsPage;
