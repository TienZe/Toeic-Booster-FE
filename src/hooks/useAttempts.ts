import { useQuery } from "@tanstack/react-query";
import { QueryOption } from "../types/QueryOption";
import { ToeicTestAttempt } from "../types/ToeicExam";
import { GetAttemptsRequest } from "../features/shared-apis/types/GetAttemptsRequest";
import { getAttempts } from "../features/shared-apis/toeic-test-attempt";
import PaginatedData from "../types/PaginatedData";

export function useAttempts(
  options: QueryOption<PaginatedData<ToeicTestAttempt>>,
  request: GetAttemptsRequest,
) {
  return useQuery({
    queryKey: ["attempts", request],
    queryFn: () => getAttempts(request),
    ...options,
  });
}
