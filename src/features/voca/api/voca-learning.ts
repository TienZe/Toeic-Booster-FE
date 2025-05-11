import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import LessonLearning from "../../../types/LessonLearning";
import { PostLearningResultRequest } from "../types/LearningResultRequest";
import { LearningResultResponse } from "../types/LearningResultResponse";
import { LessonFilteringResult } from "../types/LessonFilteringResult";
import { SaveLessonLearningRequest } from "../types/SaveLessonLearningRequest";

// deprecated
export async function createLearningResult(request: PostLearningResultRequest) {
  const response = await axiosClient.post("topic-history", request);

  return response.data;
}

// deprecated
export async function getLessonLearningResult(lessonId: string) {
  const response = await axiosClient.get<LearningResultResponse>(
    "topic-history/statistic/topic/" + lessonId,
  );

  return response.data;
}

export async function saveLessonLearning(request: SaveLessonLearningRequest) {
  const { lessonId, lessonLearnings } = request;
  const response = await axiosClient.post<ApiResponse<LessonLearning[]>>(
    `lessons/${lessonId}/lesson-learnings`,
    {
      lessonLearnings,
    },
  );

  return response.data.data;
}

export async function getLessonFilteringResult(lessonId: number) {
  const response = await axiosClient.get<ApiResponse<LessonFilteringResult>>(
    `lessons/${lessonId}/filtering-result`,
  );

  return response.data.data;
}
