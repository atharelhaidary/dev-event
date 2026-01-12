import {  UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { ApiResponse } from "../types/api-response.type";
import { usePopup } from "../context/PopupContext";


export type TConfig<TResponse = unknown> = {
    // invalidateQueries? : string[][]
    invalidateQueries?: string[][] | ((data?: TResponse) => string[][]);   
    setError?: UseFormSetError<FieldValues>;
}

export type ApiAxiosError<T = unknown> = AxiosError<ApiResponse<T>>;




export const useApiMutaion = <TResponse extends { message?: string; data?: unknown } ,TRequest=FormData , TErrorData = unknown> (
    func :  (variables : TRequest) => Promise<TResponse>,
    config?: TConfig<TResponse> & Omit<UseMutationOptions<TResponse, ApiAxiosError<TErrorData>,TRequest>, 'mutationKey' | 'mutationFn'>
  ) => {
    const {  hidePopup , showPopup } = usePopup()
    const { onSuccess: configOnSuccess, onError: configOnError, onSettled: configOnSettled ,setError :configSetError,invalidateQueries: configInvalidateQueries ,...restConfig } =  config ||  {}
    const queryClient = useQueryClient();
    return useMutation<TResponse,ApiAxiosError<TErrorData>,TRequest>({
        mutationFn : func,
        onSuccess : (data, variables , onMutateResult , context ) => {
            if(data?.message){
                // toast.success(data?.message)
            }
            //automatic update
            if (configInvalidateQueries) {
                let queries: string[][];
                
                if (typeof configInvalidateQueries === 'function') {
                    queries = configInvalidateQueries(data);
                } else {
                    queries = configInvalidateQueries;
                }
                
                queries.forEach((queryKey) => {
                    queryClient.invalidateQueries({ queryKey });
                });
            }
            
            if(configOnSuccess){
                configOnSuccess?.(data, variables, onMutateResult, context)

            }
        },
        onError : (error , variables  , onMutateResult , context ) => {
            const apiError = error?.response?.data;
            // toast.error(apiError?.message ?? "Something went wrong");
            const errors = apiError?.data 
            if (errors) {
                        let imgErrors : string[]=[];
                        Object.entries(errors).forEach(([keyParent, value]) => {
                            if(Array.isArray(value)){
                                value.forEach((item, index) => {
                                    if(item && typeof item === "object"){
                                             Object.entries(item).forEach(([keyChild, errorMessage]) => {
                                                configSetError?.(`${keyParent}.[${index}].${keyChild}`, {
                                                            type: "manual", 
                                                            message: errorMessage as string
                                                        });
                                             });
                                             return;
                                     }
                                      if(item && typeof item === "string"){
                                            configSetError?.(`${keyParent}.[${index}]`, {
                                                            type: "manual", 
                                                            message: item as string
                                            });
                                            return;
                                        }
                                });
                                return;
                            }
                            
                            // string values
                            // if(keyParent.includes('image')){
                            //     imgErrors.push(`${value} ${!imgErrors[imgErrors.length-1] ? "...." : ""} ` as string)
                            //         configSetError?.('image', {
                            //             type: "manual", 
                            //             message: imgErrors.join('\n')  
                            //     })
                            //     return;
                                
                            // }
                            configSetError?.(keyParent, {
                                type: "manual", 
                                message: value as string
                            });
                            
                        });
                        return;
              }
              showPopup("error", { data:{ message: apiError?.message}})
              configOnError?.(error,variables,onMutateResult,context)
        },
        onSettled : (data , error , variables , onMutateResult , context )=>{
            hidePopup("loading");
            if(configOnSettled){
                configOnSettled?.(data,error,variables, onMutateResult, context)
            }
        },
        ...restConfig
    })

}










