import { useQuery } from "@tanstack/react-query";
import { me } from "../features/auth/api/account-api";

export default function useUser(token?: string, enabled: boolean = true) {
  if (!token) {
    token = localStorage.getItem("token") as string; // if it is null, so the api call will be failed, then triggering the logout action
  }
  return useQuery({
    queryKey: ["user"],
    queryFn: () => me(token!),
    enabled: enabled,
  });
}
