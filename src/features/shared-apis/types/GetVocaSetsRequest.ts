import { PageDataRequest } from "../../../types/PaginatedData";

export interface GetVocaSetsRequest extends PageDataRequest {
  search?: string;
  level?: string;
}
