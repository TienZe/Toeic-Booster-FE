import { useQuery } from "@tanstack/react-query";
import { QueryOption } from "../types/QueryOption";
import { getToeicExamById } from "../features/shared-apis/toeic-exam";
import { ToeicExam } from "../types/ToeicExam";

export default function useToeicExam(
  examId: number | string,
  options?: QueryOption<ToeicExam>,
) {
  return useQuery({
    queryKey: [
      "toeicExam",
      {
        examId: examId,
      },
    ],
    queryFn: () => getToeicExamById(examId),
    ...options,
  });
}
