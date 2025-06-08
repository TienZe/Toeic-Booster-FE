import { Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import RoundedInput from "../../../../components/UI/RoundedInput";
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import RoundedFileInput from "./RoundedFileInput";
import VocabularyCardWrapper from "../../../../components/VocabularyCardWrapper";
import VocabularyFrontSide from "../../../../components/VocabularyFrontSide";
import VocabularyBackSide from "../../../../components/VocabularyBackSide";
import { VocabularyWordClass } from "../../../../types/VocabularyModel";
import {
  getPlaceholderImage,
  isValidVocaWordClass,
  mustBeAudioIfExistValue,
  mustBeImageIfExistValue,
} from "../../../../utils/helper";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface WordData {
  word: string;
  thumbnail?: string | null;

  partOfSpeech: VocabularyWordClass;
  meaning: string;
  definition: string;
  pronunciation: string;

  pronunciationAudio: string | null;

  example: string | null;
  exampleMeaning: string | null;
  exampleAudio: string | null;
}

interface VocabularyFormProps {
  onSubmit: (data: VocaFormData) => void;
  createMode?: boolean;
  defaultWordData: WordData;
}

export interface VocaFormData {
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

type MediaFileSrcs = {
  imageSrc: string;
  phoneticAudioSrc: string;
  exampleAudioSrc: string;
};

const VocabularyForm: React.FC<VocabularyFormProps> = ({
  onSubmit,
  createMode = false,
  defaultWordData,
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset: resetVocaForm,
    formState: { errors },
  } = useForm<VocaFormData>({
    defaultValues: {
      word: defaultWordData.word,
      phonetic: defaultWordData.pronunciation,
      definition: "",
      type: VocabularyWordClass.NOUN,
      meaning: "",
      example: "",
      exampleMeaning: "",
    },
  });

  const [wordInput, typeInput, phoneticInput, meaningInput] = watch([
    "word",
    "type",
    "phonetic",
    "meaning",
  ]);

  const [mediaInput, setMediaInput] = useState<MediaFileSrcs>({
    imageSrc: defaultWordData?.thumbnail || getPlaceholderImage(150, 150),
    phoneticAudioSrc: defaultWordData?.pronunciationAudio || "",
    exampleAudioSrc: defaultWordData?.exampleAudio || "",
  });

  const handleChangeMediaInput = (type: keyof MediaFileSrcs, src: string) => {
    setMediaInput((prev) => ({ ...prev, [type]: src }));
  };

  useEffect(() => {
    resetVocaForm({
      word: defaultWordData.word,
      phonetic: defaultWordData.pronunciation,
      definition: defaultWordData.definition,
      type: defaultWordData.partOfSpeech,
      meaning: defaultWordData.meaning,
      example: defaultWordData.example,
      exampleMeaning: defaultWordData.exampleMeaning,
    });

    setMediaInput({
      imageSrc: defaultWordData?.thumbnail || getPlaceholderImage(150, 150),
      phoneticAudioSrc: defaultWordData?.pronunciationAudio || "",
      exampleAudioSrc: defaultWordData?.exampleAudio || "",
    });
  }, [defaultWordData, resetVocaForm]);

  return (
    <Stack direction="row" spacing={4}>
      <form style={{ marginBottom: "2rem" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2} alignItems="start">
          <Grid2 spacing={1} container sx={{ maxWidth: "600px" }}>
            <Grid2 size={12}>
              <RoundedInput
                label="Word"
                padding="16.5px 14px"
                borderRadius={4}
                gap={0.5}
                requiredSign
                value={defaultWordData.word}
                validationError={errors.word?.message}
                readOnly
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
                defaultFileSrc={(defaultWordData?.thumbnail as string) || ""} // update/create voca at admin cannot be null
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
                defaultFileSrc={defaultWordData?.pronunciationAudio || ""}
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
                defaultFileSrc={defaultWordData?.exampleAudio || ""}
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
                  sx={{
                    float: "right",
                    px: "24px",
                    minWidth: "110px",
                    boxShadow: "none",
                  }}
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
  );
};

export default VocabularyForm;
