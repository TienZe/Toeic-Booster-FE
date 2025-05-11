import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import LessonLearning from "../../../types/LessonLearning";
// import { PostLearningResultRequest } from "../types/LearningResultRequest";
// import { LearningResultResponse } from "../types/LearningResultResponse";
import { SaveLessonLearningRequest } from "../types/SaveLessonLearningRequest";

// export async function createLearningResult(request: PostLearningResultRequest) {
//   const response = await axiosClient.post("topic-history", request);

//   return response.data;
// }

// export async function getLessonLearningResult(lessonId: string) {
//   const response = await axiosClient.get<LearningResultResponse>(
//     "topic-history/statistic/topic/" + lessonId,
//   );

//   return response.data;
// }

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
