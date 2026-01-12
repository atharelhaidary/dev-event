import { useApiMutaion } from "@/frontend/shared/hooks/useApiMutaion";
import { ApiResponse } from "@/frontend/shared/types/api-response.type";
import { eventServices } from "../../services/event.services";
import { usePopup } from "@/frontend/shared/context/PopupContext";

export const useDeleteEvent = ( ) => {
      const {clearAllPopup } = usePopup()
    return useApiMutaion<ApiResponse,FormData>(
            (data : FormData )=> eventServices.deleteEvent(data) ,
           
            {
              onSuccess : () =>{
                  clearAllPopup()
              },
              invalidateQueries : [['events']]
            }
          )
    
}
