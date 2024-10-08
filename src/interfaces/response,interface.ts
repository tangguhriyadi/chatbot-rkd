export interface Pagination {
    total: number;
    page: number;
    pageSize: number;
}

export interface BaseResponse<T> {
    message: string;
    data: T;
    pagination?: Pagination;
}
