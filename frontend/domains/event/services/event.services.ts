import { TCreateEvent } from "../types/event.types";
import { ApiResponse } from "@/frontend/shared/types/api-response.type";
import { EVENT_ENDPOINTS } from "./event.endpoint";
import apiAxios from "../../../shared/lib/api/api-axios";
export const eventServices = {
    //create new event
    createEvent : async ( data: FormData ) : Promise<ApiResponse<TCreateEvent>> => {
                const res = await apiAxios.post(`/${EVENT_ENDPOINTS.create()}`, data);
                return res.data;
   },
   //update event
   updateEvent : async (data: FormData) : Promise<ApiResponse<TCreateEvent>> => {
                const res = await apiAxios.post(`/${EVENT_ENDPOINTS.update()}`, data);
                return res.data;
    },
    //fetch all events
    getAllEvent : async (page: number, pageSize: number, queryParams: string | null) : Promise<ApiResponse<TCreateEvent[]>>  => {
                const url = !queryParams ? `/${EVENT_ENDPOINTS.getAll(page,pageSize)}` : `/${EVENT_ENDPOINTS.getAll(page,pageSize,queryParams)}`
                const res = await apiAxios.get(url);
                return res.data;
    }, 
    //fetch event by id       
    getEventById : async (id:number) : Promise<ApiResponse<TCreateEvent>> => {
                const res = await apiAxios.get(`/api/show_specific_event/${id}`);
                return res.data;
    } ,
    //delete event by id
    deleteEvent : async ( data: FormData ) : Promise<ApiResponse> => {
                const res = await apiAxios.delete(`/${EVENT_ENDPOINTS.delete()}`, {data});
                return res.data
    }
}
