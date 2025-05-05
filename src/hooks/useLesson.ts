import { useQuery } from "@tanstack/react-query";
import { QueryOption } from "../types/QueryOption";
import Lesson from "../types/Lesson";
import { getLessonById } from "../features/admin/vocasets/api/lesson-api";
import GetLessonRequest from "../features/admin/vocasets/types/GetLessonRequest";

export default function useLesson(lessonId: string|number, options?: QueryOption<Lesson>, request?: GetLessonRequest) {
    return useQuery({
        queryKey: ["lesson", { id: lessonId, request: request }],
        queryFn: () => {
            return getLessonById(lessonId, request);
        },
        ...options
    });
}