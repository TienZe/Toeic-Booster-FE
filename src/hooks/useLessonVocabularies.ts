import { useQuery } from "@tanstack/react-query";
import { getLessonVocabularies } from "../features/shared-apis/lesson-vocabulary-api";
import { QueryOption } from "../types/QueryOption";
import { LessonVocabulary } from "../types/LessonVocabulary";

export function useLessonVocabularies(lessonId: number,options?: QueryOption<LessonVocabulary[]>) {
    return useQuery({
        queryKey: ["lesson-vocabularies", { lessonId: lessonId }],
        queryFn: () => getLessonVocabularies(lessonId),
        ...options
    });
}