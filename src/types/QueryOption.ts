import { UseQueryOptions } from "@tanstack/react-query";

export type QueryOption<TData = unknown, TError = unknown, TQueryData = TData, TQueryKey extends readonly unknown[] = unknown[]> =
  Omit<UseQueryOptions<TData, TError, TQueryData, TQueryKey>, "queryKey" | "queryFn">;