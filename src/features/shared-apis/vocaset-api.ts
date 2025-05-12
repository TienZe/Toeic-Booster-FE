import axiosClient from "../../axios";
import Lesson from "../../types/Lesson";
import PaginatedData from "../../types/PaginatedData";
import VocaSetModel from "../../types/VocaSetModel";
import { GetVocaSetsRequest } from "./types/GetVocaSetsRequest";
import ApiResponse from "../../types/ApiResponse";
import { GetCollectionLessonsRequest } from "./types/GetCollectionLessonsRequest";
export async function getAllVocaSets(request: GetVocaSetsRequest) {
  const response = await axiosClient.get<
    ApiResponse<PaginatedData<VocaSetModel>>
  >("/collections", {
    params: request,
  });

  return response.data.data;
}

export async function getVocaSetLessons(
  vocaSetId: string | number,
  request?: GetCollectionLessonsRequest,
) {
  const response = await axiosClient.get<ApiResponse<Lesson[]>>(
    `/collections/${vocaSetId}/lessons`,
    {
      params: request,
    },
  );

  return response.data.data;
}
