import { useQuery } from "@tanstack/react-query";
import { getToeicExamInfo } from "../api/api";
import { QueryOption } from "../../../types/QueryOption";
import { ToeicExam } from "../../../types/ToeicExam";

export function useToeicExamInfo(
  examId: number,
  options?: QueryOption<ToeicExam>,
) {
  return useQuery({
    queryKey: ["toeicExamInfo", { examId: examId }],
    queryFn: () => getToeicExamInfo(examId),
    ...options,
  });
}
