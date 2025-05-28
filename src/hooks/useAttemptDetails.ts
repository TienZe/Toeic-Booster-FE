import { useQuery } from "@tanstack/react-query";
import { QueryOption } from "../types/QueryOption";
import { ToeicTestAttempt } from "../types/ToeicExam";
import { getAttemptDetails } from "../features/shared-apis/toeic-test-attempt";
import { GetAttemptDetailsRequest } from "../features/shared-apis/types/GetAttemptDetailsRequest";

export function useAttemptDetails(
  attemptId: number | string,
  options?: QueryOption<ToeicTestAttempt>,
  request?: GetAttemptDetailsRequest,
) {
  return useQuery({
    queryKey: ["attemptDetails", { attemptId: attemptId }, request],
    queryFn: () => getAttemptDetails(attemptId, request),
    ...options,
  });
}
