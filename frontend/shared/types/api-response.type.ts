export type ApiResponse<T = unknown> = {
    status?: number;
    message?: string;
    data?: T[];
    pagination?:any;
    hasSearchQuery?:boolean;
    isEmptySystem?: boolean;
};