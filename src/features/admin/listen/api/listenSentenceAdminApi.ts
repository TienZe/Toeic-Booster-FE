import axiosClient from "../../../../axios";
import { GetListenLesson } from "../types/ListenLesson.type";
import { ListenSentenceModel } from "../types/ListListenGroup.type";

export async function getSentenceById(id: string) {
  const response = await axiosClient.get<ListenSentenceModel>(
    "listen-sentence/" + id,
  );

  return response.data;
}
export async function getLessonDetailById(id: string) {
  const response = await axiosClient.get<GetListenLesson>(
    `/listen-lesson/${id}`,
  );

  return response.data;
}

export async function deleteListenSentence(id: string) {
  const response = await axiosClient.delete("/listen-sentence/" + id);
  return response.data;
}
