import axiosClient from "../../../axios";
import { VocaSetWithUserProgress } from "../../../types/VocaSetModel";
import { VocaSetRating } from "../types/VocaSetRating";
import { PostVocaSetRatingRequest } from "../types/VocaSetRequest";

export async function getVocaSetWithUserProgress(vocaSetId: string) {
  const response = await axiosClient.get<VocaSetWithUserProgress>(
    `group-topic/${vocaSetId}/user`,
  );

  return response.data;
}

export async function postVocaSetRating(request: PostVocaSetRatingRequest) {
  const { vocaSetId, ...data } = request;
  const response = await axiosClient.post(
    `rating/groupTopic/${vocaSetId}`,
    data,
  );

  return response.data;
}

export async function getVocaSetRating(vocaSetId: string) {
  const response = await axiosClient.get<VocaSetRating[]>(
    `rating/groupTopic/${vocaSetId}`,
  );

  return response.data;
}
