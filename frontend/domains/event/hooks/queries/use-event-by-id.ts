import useApiQuery from "@/frontend/shared/hooks/useApiQuery"
import { ApiResponse } from "@/frontend/shared/types/api-response.type"
import { TCreateEvent } from "../../types/event.types"
import { eventServices } from "../../services/event.services"
import { ApiError } from "@/frontend/shared/types/api-error.type"

export const useEventById = ({idEvent}:{idEvent:number}) => {
    return  useApiQuery<ApiResponse<TCreateEvent>,ApiError>({
      keys: ['events', idEvent],
      func: ()=>eventServices.getEventById(idEvent),
      enabled: !!idEvent
      })
}
