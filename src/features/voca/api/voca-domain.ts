import axiosClient from "../../../axios";
import { VocaSetRating } from "../types/VocaSetRating";
import { PostVocaSetRatingRequest } from "../types/VocaSetRequest";

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
