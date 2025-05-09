import { PageDataRequest } from "../../../types/PaginatedData";

export interface GetSystemWordsRequest extends PageDataRequest {
  search?: string;
}
