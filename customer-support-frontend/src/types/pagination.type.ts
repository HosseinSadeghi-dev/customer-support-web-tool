export interface PaginationResponse<T> {
  data: T[];
  pagination: PaginationDetail;
}

export interface PaginationDetail {
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
}
