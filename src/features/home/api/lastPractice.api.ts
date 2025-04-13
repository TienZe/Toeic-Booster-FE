import axiosClient from "../../../axios";
import { LastPracticeResponse } from "../type/lastPractice.type";

export const fetchLast4PracticeDetailUser = async () => {
    const response = await axiosClient.get<LastPracticeResponse>(
        `test-practice/user/lastPractice`,
    );
    return response.data;
};
