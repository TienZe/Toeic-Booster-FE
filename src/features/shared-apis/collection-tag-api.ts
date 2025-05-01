import axiosClient from "../../axios";
import { CollectionTag } from "../../types/CollectionTag";

export async function getAllCollectionTags() {
    const response = await axiosClient.get<CollectionTag[]>("/collection-tags");

    return response.data;
}