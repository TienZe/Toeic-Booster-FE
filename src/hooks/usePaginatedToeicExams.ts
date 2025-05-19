import { useQuery } from "@tanstack/react-query";
import { QueryOption } from "../types/QueryOption";
import { getToeicExams } from "../features/shared-apis/toeic-exam";
import PaginatedData from "../types/PaginatedData";
import { ToeicExam } from "../types/ToeicExam";
import { GetToeicExamsRequest } from "../features/shared-apis/types/GetToeicExamsRequest";

export default function usePaginatedToeicExams(
  options?: QueryOption<PaginatedData<ToeicExam>>,
  request: GetToeicExamsRequest = {},
) {
  return useQuery({
    queryKey: [
      "toeicExams",
      {
        request: request,
      },
    ],
    queryFn: () => getToeicExams(request),
    ...options,
  });
}
