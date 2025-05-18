import { useQuery } from "@tanstack/react-query";
import { QueryOption } from "../types/QueryOption";
import { getSimilarVocaSets } from "../features/shared-apis/vocaset-api";
import VocaSetModel from "../types/VocaSetModel";

export default function useSimilarVocaSets(
  vocaSetId: number | string,
  options?: QueryOption<VocaSetModel[]>,
) {
  return useQuery({
    queryKey: ["similar-voca-sets", vocaSetId],
    queryFn: () => {
      return getSimilarVocaSets(vocaSetId);
    },
    ...options,
  });
}
