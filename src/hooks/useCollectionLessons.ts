import { useQuery } from "@tanstack/react-query";
import { getVocaSetLessons } from "../features/shared-apis/vocaset-api";
import { QueryOption } from "../types/QueryOption";
import Lesson from "../types/Lesson";

export default function useCollectionLessons(vocaSetId: string|number, options?: QueryOption<Lesson[]>) {
    return useQuery({
        queryKey: ["lessons", { vocaSetId: vocaSetId }],
        queryFn: () => {
            return getVocaSetLessons(vocaSetId);
        },
        ...options
    });
}