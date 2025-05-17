import axiosClient from "../../../axios";
import ApiResponse from "../../../types/ApiResponse";
import { VocaSetRating } from "../types/VocaSetRating";
import { PostVocaSetRatingRequest } from "../types/VocaSetRequest";

export async function postVocaSetRating(request: PostVocaSetRatingRequest) {
  const { collectionId, ...data } = request;
  const response = await axiosClient.post(
    `collections/${collectionId}/ratings`,
    data,
  );

  return response.data;
}

export async function getVocaSetRating(collectionId: string) {
  const response = await axiosClient.get<ApiResponse<VocaSetRating[]>>(
    `collections/${collectionId}/ratings`,
  );

  return response.data.data;
}
