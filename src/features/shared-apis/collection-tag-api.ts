import axiosClient from "../../axios";
import { CollectionTag } from "../../types/CollectionTag";
import ApiResponse from "../../types/ApiResponse";
export async function getAllCollectionTags() {
  const response = await axiosClient.get<ApiResponse<CollectionTag[]>>(
    "/collection-tags",
  );

  return response.data.data;
}