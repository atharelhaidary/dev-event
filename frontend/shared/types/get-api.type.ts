export type GetApiResponse<TData> = {
           status: boolean;
           message?: string;
           data?: TData;  
           errors?: TData;          
}