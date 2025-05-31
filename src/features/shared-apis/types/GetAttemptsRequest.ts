export interface GetAttemptsRequest {
  toeicTestId?: string | number;
  limit?: number;
  page?: number;
  recentDays?: string;
}
