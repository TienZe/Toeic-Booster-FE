import { useQuery } from "@tanstack/react-query";
import { getVocaSetLessons } from "../features/shared-apis/vocaset-api";
import { QueryOption } from "../types/QueryOption";
import Lesson from "../types/Lesson";
import { GetCollectionLessonsRequest } from "../features/shared-apis/types/GetCollectionLessonsRequest";

export default function useCollectionLessons(
  vocaSetId: string | number,
  options?: QueryOption<Lesson[]>,
  request?: GetCollectionLessonsRequest,
) {
  return useQuery({
    queryKey: ["lessons", { vocaSetId: vocaSetId, request: request }],
    queryFn: () => {
      return getVocaSetLessons(vocaSetId, request);
    },
    ...options,
  });
}
