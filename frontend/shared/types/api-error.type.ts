export type ApiError<T=unknown>= {
     response : {
        data : {
            status?: number;
            message?: string;
            data?: T;  
        }
     }      
}
