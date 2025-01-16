export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
  };
}
