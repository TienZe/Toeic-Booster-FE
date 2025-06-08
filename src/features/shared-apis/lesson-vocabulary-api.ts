import axiosClient from "../../axios";
import ApiResponse from "../../types/ApiResponse";
import { LessonVocabulary } from "../../types/LessonVocabulary";
import { BulkStoreLessonVocabularyRequest } from "./types/BulkStoreLessonVocabulary";
import { GetLessonVocabulariesRequest } from "./types/GetLessonVocabulariesRequest";
import { UpdateLessonVocabularyRequest } from "./types/UpdateLessonVocabularyRequest";

export async function getLessonVocabularies(
  lessonId: number,
  request?: GetLessonVocabulariesRequest,
) {
  const response = await axiosClient.get<ApiResponse<LessonVocabulary[]>>(
    `/lessons/${lessonId}/words`,
    {
      params: request,
    },
  );

  return response.data.data;
}

export async function deleteLessonVocabulary(request: {
  lessonId: number;
  vocabularyId: number;
}) {
  const { lessonId, vocabularyId } = request;
  const response = await axiosClient.delete<ApiResponse<unknown>>(
    `/lessons/${lessonId}/words/${vocabularyId}`,
  );

  return response.data.data;
}

export async function removeLessonVocabularyById(lessonVocabularyId: number) {
  const response = await axiosClient.delete<ApiResponse<unknown>>(
    "/lesson-vocabularies/" + lessonVocabularyId,
  );

  return response.data.data;
}

export async function attachNewWordsToLesson(
  request: BulkStoreLessonVocabularyRequest,
) {
  const { lessonId, words } = request;

  const response = await axiosClient.post(`/lessons/${lessonId}/words`, {
    words,
  });

  return response.data;
}

export async function updateLessonVocabulary(
  request: UpdateLessonVocabularyRequest,
) {
  const { lessonVocabularyId, ...data } = request;
  const response = await axiosClient.put<ApiResponse<LessonVocabulary>>(
    `/lesson-vocabularies/${lessonVocabularyId}`,
    data,
  );

  return response.data.data;
}
