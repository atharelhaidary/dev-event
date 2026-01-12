"use server"
import { notFound } from "next/navigation"
import { EVENT_ENDPOINTS } from "../../services/event.endpoint"
import { apiFetch } from "@/frontend/shared/lib/api/api-fetch"
import { ApiResponse } from "@/frontend/shared/types/api-response.type"
import { TCreateEvent } from "../../types/event.types"
const getAllEvents = async ( options?:{caller?:'server-component' | 'client-component' | 'server-action'}) => {
    const callerType = options?.caller || 'server-component' 
    try{ 
        const response = await  apiFetch<ApiResponse<TCreateEvent[]>>({
            url : EVENT_ENDPOINTS.getAll(),
            method : 'GET',
          })
        return response;
     }catch(error: any){
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
export default getAllEvents;


