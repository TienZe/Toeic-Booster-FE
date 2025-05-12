import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import LessonLearning from "../../../types/LessonLearning";
import { LearningResultResponse } from "../types/LearningResultResponse";
import { PostLessonExamRequest } from "../types/LessonExamRequest";
import { LessonFilteringResult } from "../types/LessonFilteringResult";
import { SaveLessonLearningRequest } from "../types/SaveLessonLearningRequest";

export async function getLessonPracticeStatistics(lessonId: string) {
  const response = await axiosClient.get<ApiResponse<LearningResultResponse>>(
    `lessons/${lessonId}/practice-statistics`,
  );

  return response.data.data;
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

export async function postLessonExam(request: PostLessonExamRequest) {
  const response = await axiosClient.post("lesson-exams", request);

  return response.data.data;
}
