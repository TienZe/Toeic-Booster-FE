import { useQuery } from "@tanstack/react-query";
import { me } from "../features/auth/api/account-api";

export default function useUser(token: string, enabled: boolean) {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => me(token!),
    enabled: enabled,
  });
}
