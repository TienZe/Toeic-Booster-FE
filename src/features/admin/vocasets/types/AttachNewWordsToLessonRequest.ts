import { LessonVocabulary } from "../../../../types/LessonVocabulary";

export interface AttachNewWordsToLessonRequest {
    words: Omit<LessonVocabulary, "id">[];
}