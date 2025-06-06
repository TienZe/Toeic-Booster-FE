import axiosClient from "../../axios";
import ApiResponse from "../../types/ApiResponse";
import { LessonVocabulary } from "../../types/LessonVocabulary";
import CreateLessonVocabularyRequest from "./types/CreateLessonVocabularyRequest";
import { GetLessonVocabulariesRequest } from "./types/GetLessonVocabulariesRequest";

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

export async function attachNewWordsToLesson(request: {
  lessonId: number | string;
  wordIds: number[] | string[];
}) {
  const { lessonId, wordIds } = request;

  const wordObjects = wordIds.map((wordId) => ({ vocabularyId: wordId }));
  const response = await axiosClient.post(`/lessons/${lessonId}/words`, {
    words: wordObjects,
  });

  return response.data;
}

export async function createLessonVocabulary(
  request: CreateLessonVocabularyRequest,
) {
  const { lessonId, ...wordData } = request;
  const response = await axiosClient.post<ApiResponse<LessonVocabulary[]>>(
    `/lessons/${lessonId}/words`,
    {
      words: [wordData],
    },
  );

  return response.data.data;
}
