import axiosClient from "../../axios";
import Lesson from "../../types/Lesson";
import PaginatedData from "../../types/PaginatedData";
import VocaSetModel from "../../types/VocaSetModel";
import { GetVocaSetsRequest } from "./types/GetVocaSetsRequest";

export async function getAllVocaSets(request: GetVocaSetsRequest) {
  const response = await axiosClient.get<PaginatedData<VocaSetModel>>(
    "/collections",
    {
      params: request,
    },
  );

  return response.data;
}

export async function getVocaSetLessons(vocaSetId: string|number) {
  const response = await axiosClient.get<Lesson[]>(
    `/collections/${vocaSetId}/lessons`,
  );

  return response.data;
}
