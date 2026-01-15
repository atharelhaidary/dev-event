"use server"
import { EVENT_ENDPOINTS } from "../../services/event.endpoint"
import { apiFetch } from "@/frontend/shared/lib/api/api-fetch"
import { TBookEvent } from "../../types/event.types"
import { notFound } from "next/navigation"
import {  } from "next/cache"

export const createBookEvent = async (eventInfo:FormData, options?:{caller?:'server-component' | 'client-component' | 'server-action'}) => {
     const callerType = options?.caller || 'server-component' 
     try{ 
      
         const response = await  apiFetch<TBookEvent,FormData>({
            url : EVENT_ENDPOINTS.book(),
            method : 'POST',
            data : eventInfo
          })
        return response;
     }catch(error : any ){
            if(error.status === 404 || error.status === 400){
                if(callerType === 'server-component') {
                    notFound()
                }
            }
            if (callerType === 'client-component') {
                return error
            } else {
                throw new Error(error.message) 
             }
     }

}
