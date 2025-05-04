import axiosClient from "../../../../axios";
import Lesson from "../../../../types/Lesson";
import NewLessonRequest from "../types/NewLessonRequest";
import UpdateLessonRequest from "../types/UpdateLessonRequest";
import UpdateLessonResponse from "../types/UpdateLessonResponse";

export async function createNewLesson(request: NewLessonRequest) {
  const { vocaSetId, ...data } = request;
  const response = await axiosClient.post<Lesson>(
    "/topic/" + vocaSetId,
    data,
  );

  return response.data;
}

export async function getLessonById(id: string) {
  const response = await axiosClient.get<Lesson>("/topic/" + id);

  return response.data;
}

export async function deleteLesson(id: string) {
  const response = await axiosClient.delete("/topic/" + id);

  return response.data;
}

export async function updateLesson(request: UpdateLessonRequest) {
  const { id, ...data } = request;
  const response = await axiosClient.patch<UpdateLessonResponse>(
    "/topic/" + id,
    data,
  );

  return response.data;
}
