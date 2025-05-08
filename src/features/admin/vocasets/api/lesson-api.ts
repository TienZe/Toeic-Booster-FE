import axiosClient from "../../../../axios";
import Lesson from "../../../../types/Lesson";
import GetLessonRequest from "../types/GetLessonRequest";
import NewLessonRequest from "../types/NewLessonRequest";
import UpdateLessonRequest from "../types/UpdateLessonRequest";
import UpdateLessonResponse from "../types/UpdateLessonResponse";
import ApiResponse from "../../../../types/ApiResponse";

export async function createNewLesson(request: NewLessonRequest) {
  const { vocaSetId, ...data } = request;
  const response = await axiosClient.post<ApiResponse<Lesson>>(
    `/collections/${vocaSetId}/lessons`,
    data,
  );

  return response.data.data;
}

export async function getLessonById(id: string|number, request?: GetLessonRequest) {
  const response = await axiosClient.get<ApiResponse<Lesson>>(
    "/lessons/" + id,
    {
      params: request,
    },
  );

  return response.data.data;
}

export async function deleteLesson(id: string) {
  const response = await axiosClient.delete("/lessons/" + id);

  return response.data.data;
}

export async function updateLesson(request: UpdateLessonRequest) {
  const { id, ...data } = request;
  const response = await axiosClient.put<ApiResponse<UpdateLessonResponse>>(
    "/lessons/" + id,
    data,
  );

  return response.data.data;
}
