import { Box, Stack, Typography } from "@mui/material";
import {
  fileList2Base64,
  hasFileData,
  vocaWordClassAbrr2FullName,
} from "../../../../utils/helper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { VocabularyWordClass } from "../../../../types/VocabularyModel";
import VocabularyForm, { VocaFormData } from "./VocabularyForm";
import { LessonVocabulary } from "../../../../types/LessonVocabulary";
import { updateLessonVocabulary } from "../../../shared-apis/lesson-vocabulary-api";
import { UpdateLessonVocabularyRequest } from "../../../shared-apis/types/UpdateLessonVocabularyRequest";
import { useState } from "react";

interface LessonVocaDetailsProps {
  lessonVocabulary: LessonVocabulary;
  onWordUpdatedSuccess?: (lessonVocabularyId: number) => void;
}

const LessonVocaDetails: React.FC<LessonVocaDetailsProps> = ({
  lessonVocabulary,
  onWordUpdatedSuccess,
}) => {
  const [internalLessonVocabulary, setInternalLessonVocabulary] =
    useState<LessonVocabulary>(lessonVocabulary);

  // Update lesson own vocabulary mutation
  const updateMutation = useMutation({
    mutationFn: updateLessonVocabulary,
    onSuccess: (responseData: LessonVocabulary) => {
      toast.success("Saved!");
      onWordUpdatedSuccess?.(responseData.id);
      setInternalLessonVocabulary(responseData);
    },
    onError: (error: { message: string | string[] }) => {
      let errorMessage = "Update lesson vocabulary failed";
      if (error.message instanceof Array) {
        errorMessage = error.message[0];
      }
      toast.error(errorMessage);
    },
  });

  const handleSaveForm = async (data: VocaFormData) => {
    console.log("Form data:", data);

    const request: UpdateLessonVocabularyRequest = {
      lessonVocabularyId: lessonVocabulary.id,
      pronunciation: data.phonetic,
      meaning: data.meaning,
      partOfSpeech: vocaWordClassAbrr2FullName(data.type),
      definition: data.definition,
      example: data.example || undefined,
      exampleMeaning: data.exampleMeaning || undefined,
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
  };

  return (
    <Box>
      <Box sx={{ padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Lesson Vocabulary Details
          </Typography>
        </Stack>

        <VocabularyForm
          onSubmit={handleSaveForm}
          defaultWordData={{
            word: internalLessonVocabulary?.word || "",
            pronunciation: internalLessonVocabulary?.pronunciation || "",
            definition: internalLessonVocabulary?.definition || "",
            partOfSpeech:
              internalLessonVocabulary?.partOfSpeech ||
              VocabularyWordClass.NOUN,
            meaning: internalLessonVocabulary?.meaning || "",
            example: internalLessonVocabulary?.example || "",
            exampleMeaning: internalLessonVocabulary?.exampleMeaning || "",
            pronunciationAudio:
              internalLessonVocabulary?.pronunciationAudio || "",
            exampleAudio: internalLessonVocabulary?.exampleAudio || "",
            thumbnail: internalLessonVocabulary?.thumbnail || null,
          }}
        />
      </Box>
    </Box>
  );
};

export default LessonVocaDetails;
