import axiosClient from "../../../../axios";
import Lesson from "../../../../types/Lesson";
import GetLessonRequest from "../types/GetLessonRequest";
import NewLessonRequest from "../types/NewLessonRequest";
import UpdateLessonRequest from "../types/UpdateLessonRequest";
import UpdateLessonResponse from "../types/UpdateLessonResponse";

export async function createNewLesson(request: NewLessonRequest) {
  const { vocaSetId, ...data } = request;
  const response = await axiosClient.post<Lesson>(
    `/collections/${vocaSetId}/lessons`,
    data,
  );

  return response.data;
}

export async function getLessonById(id: string|number, request?: GetLessonRequest) {
  const response = await axiosClient.get<Lesson>("/lessons/" + id, {
    params: request,
  });

  return response.data;
}

export async function deleteLesson(id: string) {
  const response = await axiosClient.delete("/lessons/" + id);

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
