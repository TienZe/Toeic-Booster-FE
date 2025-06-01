import { useQuery } from "@tanstack/react-query";
import { getToeicCategories } from "../features/shared-apis/toeic-exam";

export default function useToeicCategories() {
  return useQuery({
    queryKey: ["toeicCategories"],
    queryFn: () => {
      return getToeicCategories();
    },
  });
}
