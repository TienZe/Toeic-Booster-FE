import axiosClient from "../../../axios";
import { PostLearningResultRequest } from "../types/LearningResultRequest";
import { LearningResultResponse } from "../types/LearningResultResponse";

export async function createLearningResult(request: PostLearningResultRequest) {
  const response = await axiosClient.post("topic-history", request);

  return response.data;
}

export async function getLessonLearningResult(lessonId: string) {
  const response = await axiosClient.get<LearningResultResponse>(
    "topic-history/statistic/topic/" + lessonId,
  );

  return response.data;
}
