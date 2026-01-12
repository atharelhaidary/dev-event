import { useApiMutaion } from "@/frontend/shared/hooks/useApiMutaion";
import { useRouter } from "next/navigation";
import { usePopup } from "@/frontend/shared/context/PopupContext";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { ApiResponse } from "@/frontend/shared/types/api-response.type";
import { TCreateEvent } from "../../types/event.types";
import { eventServices } from "../../services/event.services";

type TuseCreateEventProps = {
    setError: UseFormSetError<FieldValues>;
}
export const useCreateEvent = ({setError}: TuseCreateEventProps) => {
    const router = useRouter();
    const {  showPopup } = usePopup();
    return useApiMutaion<ApiResponse<TCreateEvent>,FormData>(
            (data : FormData )=> eventServices.createEvent(data),
            {
                setError,
                onSuccess : (data) =>{
                  const idEvent = data?.data?.id;
                  const slugEvent = data?.data?.slug
                  const msg = "Create Event Successfully"
                  router.push("/events")
                  if(idEvent && slugEvent){
                    showPopup('success',{data:{id:idEvent, slug:slugEvent, message: msg}})
                  }
                  },
                  invalidateQueries: (data) => {
                    const eventId = data?.data?.id;
                    const queries = [['events']]; 
                    // if (eventId) {
                    //     queries.push(['events', String(eventId)]);
                    // }
                    return queries;
                  }
            }
          )
    
}
