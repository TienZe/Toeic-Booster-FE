import { useQuery } from "@tanstack/react-query";
import { getAllVocaSets } from "../features/shared-apis/vocaset-api";
import { GetVocaSetsRequest } from "../features/shared-apis/types/GetVocaSetsRequest";

type Options = {
  page: number;
  limit: number;
  search?: string;
  level?: string;
};

export default function usePaginatedVocaSets(options: Options) {
  return useQuery({
    queryKey: [
      "vocaSet",
      {
        page: options.page,
        limit: options.limit,
        search: options.search,
        level: options.level,
      },
    ],
    queryFn: ({ queryKey: request }) =>
      getAllVocaSets(request[1] as GetVocaSetsRequest),
  });
}
