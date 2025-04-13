import axiosClient from "../../../axios";
import { IListenLesson } from "../types/ListenLesson.type";

export async function getListenLessonById(id: string) {
  const response = await axiosClient.get<IListenLesson>("/listen-lesson/" + id);
  return response.data;
}
