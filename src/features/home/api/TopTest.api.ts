import axiosClient from "../../../axios";
import { TopTestTakenResponse } from "../type/topTestTakent.type";

export const getTopTestTaken = async () => {
  const response =
    await axiosClient.get<TopTestTakenResponse[]>(`test/top-test`);
  return response.data;
};
