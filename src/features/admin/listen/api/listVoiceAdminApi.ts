import axiosClient from "../../../../axios";
import { Voice } from "../types/ListVoice.type";

export async function getListVoice() {
  const response = await axiosClient.get<Voice[]>(`/translate/voice`);

  return response.data;
}

export async function createListVoice(
  data: { text: string; voiceId: string }[],
) {
  // const response = await axiosClient.post<{ url: string }>(
  //   "/translate/text2speech",
  //   data,
  // );
  const createPromise = data.map((it) => {
    return axiosClient.post<{ url: string }>("/translate/text2speech", it);
  });
  const res = await Promise.all(createPromise);
  return res.map((it) => it.data);
}
