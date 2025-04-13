import axiosClient from "../../../../axios";
import {
  CreateListenLesson,
  GetListenLesson,
  UpdateListenLesson,
} from "../types/ListenLesson.type";

export async function deleteListenLesson(id: string) {
  const response = await axiosClient.delete("/listen-lesson/" + id);

  return response.data;
}

export async function createListenLesson(
  data: CreateListenLesson,
  idGroup: string,
) {
  const response = await axiosClient.post(
    "/listen-lesson/listen-group/" + idGroup,
    data,
  );
  return response.data;
}
export async function getLessonDetailById(id: string) {
  const response = await axiosClient.get<GetListenLesson>(
    `/listen-lesson/${id}`,
  );
  return response.data;
}
export async function updateListenLesson(
  data: UpdateListenLesson,
  idLesson: string,
) {
  const response = await axiosClient.patch("/listen-lesson/" + idLesson, data);
  return response.data;
}
