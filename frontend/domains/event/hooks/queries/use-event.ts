import { ApiResponse } from "@/frontend/shared/types/api-response.type"
import { eventServices } from "../../services/event.services"
import { TCreateEvent } from "../../types/event.types"
import useApiQuery from "@/frontend/shared/hooks/useApiQuery"
import { ApiError } from "@/frontend/shared/types/api-error.type"

export const useEvent = (enabled = true) => {
    return  useApiQuery<ApiResponse<TCreateEvent[]>,ApiError>({
      keys: ['events'],
      func : () => eventServices.getAllEvent(),
      enabled: enabled,
    }) 
}
