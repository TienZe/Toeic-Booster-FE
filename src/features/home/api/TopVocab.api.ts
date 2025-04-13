import axiosClient from "../../../axios";
import { VocabRawResponse } from "../type/top8Vocab.type";

export const getTop8Vocab = async () => {
  const response =
    await axiosClient.get<VocabRawResponse[]>(`group-topic/top8`);
  return response.data;
};
