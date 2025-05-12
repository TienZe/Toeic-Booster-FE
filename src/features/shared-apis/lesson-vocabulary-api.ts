import axiosClient from "../../axios";
import ApiResponse from "../../types/ApiResponse";
import { LessonVocabulary } from "../../types/LessonVocabulary";
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
