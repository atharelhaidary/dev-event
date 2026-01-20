"use client"
import {  Dispatch, SetStateAction, createContext, useContext, useState} from "react";
import { FieldValues } from "react-hook-form";
import { useSearchParams } from 'next/navigation';

type TPaginationContext = {
    page : number;
    pageSize : number;
    queryParams : string;
    setPage : Dispatch<SetStateAction<number>>;
    setPageSize: Dispatch<SetStateAction<number>>;
    setQueryParams :  Dispatch<SetStateAction<string>>;
    generateQueryParams : (data : FieldValues) => void
    resetQueryParams : () => void
}


const PaginationContext = createContext<TPaginationContext | null>(null);


export const PaginationProvider = ({children}:{children:React.ReactNode}) => {
    const searchParams = useSearchParams();
    const noParams = searchParams.size == 0
    const pageParams = noParams ? 1 : Number(searchParams.get('page'))
    const limitParams = noParams ? 5 :Number(searchParams.get('limit'))
    const [ page, setPage ] = useState<number>(pageParams);
    const [ pageSize, setPageSize ] = useState<number>(limitParams);
    const [ queryParams, setQueryParams ] = useState("");

    const generateQueryParams = (data : FieldValues) => {
        let query : string[] = []
        Object.entries(data).forEach(([key,value])=>{
            if(value.trim() !== ''){
                query.push(`${key}=${value}`)
            }
       })
        setQueryParams(query.join("&"))
    }
    const resetQueryParams = () => {
        setQueryParams('')
    }
    return(
        <PaginationContext.Provider value={{page, setPage, pageSize, setPageSize, queryParams, setQueryParams, generateQueryParams, resetQueryParams }}>
            {children}
        </PaginationContext.Provider>
    )
}




export const usePagination = (): TPaginationContext => {
    const context = useContext(PaginationContext);
    
    if (!context) {
      throw new Error("usePagination must be used within a LoadingProvider");
    }
    
    return context;
};



