export default interface ApiResponse<T> {
    data: T;
    success: boolean;
    error: ApiError|null;
}

export interface ApiError {
    code: number;
    message: string|null;
    exception: string|null;
    validationErrors: Record<string, string[]>|null;
}