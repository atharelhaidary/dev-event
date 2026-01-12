"use client"
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
type TQueryClientProviderrProps  =  {
    children : React.ReactNode 
}
 const QueryClientProviderr = ({children}:TQueryClientProviderrProps) => {
   

  //    const queryCache = new QueryCache({
  //     onError: (error, query) => {
  //       // ⭐ لا تفعل شيئاً - صامت
  //       // يمكنك تسجيل الخطأ لخدمة مثل Sentry هنا
  //       if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'f') {
  //         console.info('[Suppressed Query Error]:', {
  //           queryKey: query.queryKey,
  //           error: error.message,
  //         });
  //       }
  //     },
  //   });
  
  //   const mutationCache = new MutationCache({
  //     onError: (error, variables, context, mutation) => {
  //       // ⭐ لا تفعل شيئاً - صامت
  //       if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'f') {
  //         console.info('[Suppressed Mutation Error]:', {
  //           mutationKey: mutation.options.mutationKey,
  //           error: error.message,
  //         });
  //       }
  //     },
  //   });
  // ;

  
   //use useState to not make infinite refetch
   const [queryClient] = useState(()=>{
    return new QueryClient({
        //  queryCache,
        //  mutationCache,
         defaultOptions: {
           queries: {
             staleTime: 5 * 60 * 1000, // 5 دقائق
             gcTime: 10 * 60 * 1000, // 10 دقائق
             retry: false,
             refetchOnWindowFocus: false,
             // refetchOnMount: false,
             refetchOnReconnect: false, 
            //  networkMode: 'offlineFirst',
         
           },
           mutations: {
             retry: 0,
            //  networkMode: 'offlineFirst',

           },
           
         },
       })
     }
 )

    return(
        <QueryClientProvider client={queryClient}>
               {children}
               {/* {process.env.NODE_ENV !== 'production' && ( */}
                      <ReactQueryDevtools initialIsOpen={false} />
               {/* )} */}
        </QueryClientProvider>

    )
}
export default QueryClientProviderr;