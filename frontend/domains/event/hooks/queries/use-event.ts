import {  } from "react"
import { ApiResponse } from "@/frontend/shared/types/api-response.type"
import { eventServices } from "../../services/event.services"
import { TCreateEvent } from "../../types/event.types"
import useApiQuery from "@/frontend/shared/hooks/useApiQuery"
import { ApiError } from "@/frontend/shared/types/api-error.type"
import { usePagination } from "@/frontend/shared/context/PaginationContext"


export const useEvent = (enabled = true)=>{
    const { page , pageSize, queryParams } = usePagination();
    const hasQueryParams = queryParams.trim() !== ''
    return useApiQuery<ApiResponse<TCreateEvent>, ApiError>({
      keys: hasQueryParams  ? ['events', page, pageSize, queryParams] : ['events', page, pageSize],  
      func: () => eventServices.getAllEvent(page, pageSize, hasQueryParams ? queryParams : null ), 
      enabled: enabled,
   });
}



