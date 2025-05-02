export default interface PaginatedData<T> {
  items: T[];
  total: number; // total items

  pageSize: number;
  currentPage: number;
  totalPages: number;

  hasNext: boolean;
  hasPrevious: boolean;

  nextPage: number;
  previousPage: number;
}

export interface PageDataRequest {
  page: number;
  limit: number;
}