"use client"
import EventTable from "./EventTable";
import { useEvent } from "../../hooks";
import Spinner from "@/frontend/shared/components/feedback/Spinner";
import ErrorComp from "@/frontend/shared/components/feedback/ErrorComp";
import EventsHeader from "./EventsHeader";
import EmptyEvents from "../empty-events/EmptyEvents";
import EventFilters from "./EventsFilters";
import EmptySearch from "../empty-search/EmptySearch";
import { Activity} from "react";



const Events =  () => {
    const { isLoading ,isError, error ,data } =  useEvent();
    const eventsData = data?.data
    const handleReload = () => {
        window.location.reload()
    }
    return(
        <section className="flex flex-col flex-grow gap-4 global-container">
               {/* header */}
              <Activity mode={ isLoading || eventsData && eventsData?.length > 0 ? "visible" :"hidden"}>
                   <EventsHeader/> 
               </Activity>
               {/* loading */}
               <Activity mode={isLoading ? "visible" :"hidden"}>
                  <Spinner />
               </Activity>
               {/* error */}
               <Activity mode={isError ? "visible" :"hidden"}>
                       <ErrorComp 
                            message={error?.response?.data?.message} 
                            onClick={handleReload}
                        />
               </Activity>
               {/* table */}
               <Activity mode={ eventsData && eventsData?.length > 0 ? "visible" :"hidden"}>
                    <EventFilters/>
                    <EventTable/> 
               </Activity>
               {/* empty search */}
               <Activity mode={ eventsData && eventsData?.length === 0 && data?.hasSearchQuery ? "visible" :"hidden"}>
                    <EmptySearch/>
               </Activity>
                {/* empty events */}
                <Activity mode={ eventsData && eventsData?.length === 0 && data?.isEmptySystem ? "visible" :"hidden"}>
                     <EmptyEvents/>   
               </Activity>
        </section> 
    )
}
export default Events


