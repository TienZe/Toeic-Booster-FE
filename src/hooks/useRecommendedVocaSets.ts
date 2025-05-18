import { useQuery } from "@tanstack/react-query";
import { QueryOption } from "../types/QueryOption";
import { getRecommendedVocaSets } from "../features/shared-apis/vocaset-api";
import VocaSetModel from "../types/VocaSetModel";
import { GetRecommendedCollectionRequest } from "../features/shared-apis/types/GetRecommendedCollectionRequest";
import PaginatedData from "../types/PaginatedData";

export default function useRecommendedVocaSets(
  options?: QueryOption<PaginatedData<VocaSetModel>>,
  request: GetRecommendedCollectionRequest = {},
) {
  return useQuery({
    queryKey: ["recommended-voca-sets", request],
    queryFn: () => {
      return getRecommendedVocaSets(request);
    },
    ...options,
  });
}
