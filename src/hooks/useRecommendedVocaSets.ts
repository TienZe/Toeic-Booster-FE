import { useQuery } from "@tanstack/react-query";
import { QueryOption } from "../types/QueryOption";
import { getRecommendedVocaSets } from "../features/shared-apis/vocaset-api";
import VocaSetModel from "../types/VocaSetModel";

export default function useRecommendedVocaSets(
  options?: QueryOption<VocaSetModel[]>,
) {
  return useQuery({
    queryKey: ["recommended-voca-sets"],
    queryFn: () => {
      return getRecommendedVocaSets();
    },
    ...options,
  });
}
