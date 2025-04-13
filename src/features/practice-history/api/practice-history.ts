import axiosClient from "../../../axios";
import { PracticeHistory } from "../types/PracticeHistory";
import { TestStatistics } from "../types/TestStatistic";

const fetchAllPracticeHistory = async () => {
  const response = await axiosClient.get<PracticeHistory[]>(`test-practice`);
  return response.data;
};

const fetchPracticeSpecificDay = async (day: string) => {
  const response = await axiosClient.get<TestStatistics>(
    `test-practice/user?${day !== "0" ? `day=${day}` : ``}`,
  );
  return response.data;
};

export { fetchAllPracticeHistory, fetchPracticeSpecificDay };
