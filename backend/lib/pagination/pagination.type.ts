
export type TPaginationParams =  {
    page?: number;
    limit?: number;
    search? : string
    sortBy?: string;
    sortOrder? : string;
}
export type TPagination = {
    currentPage : number;
    totalItems : number;
    totalPages : number;
    itemsPerPage : number ;
    hasNextPage : boolean;
    hasPrevPage: boolean;
    nextPage: number | null,
    prevPage: number | null,
}
export type TPaginationOptions<T>= {
    searchFields?: string[];
    selectFields?: string;
    populate?: string;
    lean?: boolean;
    customQuery?: Record<string,any>
}
type TActiveDetails = {
    term: string,
    fields: string[],
}
type TInActiveDetails = {
    reason: string;
    availableFields: string[];
}
export type TPaginationMetaData = {
        search: {
            active : boolean;
            details : TActiveDetails | TInActiveDetails
        },
        sorting: {
            by: string,
            order: string
        },
        filters :{
            active: boolean;
            count?: number;
            list?: Record<string,any>;
            message?: string
        },
        timestamp: string
}
export type TPaginationResponse<T> = {
    message: string;
    data: T[];
    pagination : TPagination ;
    meta : TPaginationMetaData;
    status: number;
    hasSearchQuery ?:boolean;
    isEmptySystem ?: boolean
}