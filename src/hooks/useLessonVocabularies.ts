import { useQuery } from "@tanstack/react-query";
import { getLessonVocabularies } from "../features/shared-apis/lesson-vocabulary-api";
import { QueryOption } from "../types/QueryOption";
import { LessonVocabulary } from "../types/LessonVocabulary";
import { GetLessonVocabulariesRequest } from "../features/shared-apis/types/GetLessonVocabulariesRequest";

export function useLessonVocabularies(
  lessonId: number,
  options?: QueryOption<LessonVocabulary[]>,
  request?: GetLessonVocabulariesRequest,
) {
  return useQuery({
    queryKey: ["lesson-vocabularies", { lessonId, request }],
    queryFn: () => getLessonVocabularies(lessonId, request),
    ...options,
  });
}
