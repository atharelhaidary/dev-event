import EventCard from "@/frontend/shared/components/ui/EventCard"
import { TCreateEvent } from "../../../types/event.types";
const RelatedEvents = async ({events}:{events: TCreateEvent[]}) =>{
            return(
                events && events.length > 0 && (
                        <div className="flex flex-col gap-5">
                                <span className="span-heading">Similar Events</span>
                                <div className="events">
                                        {
                                            events.map((event,index)=>(
                                                <EventCard eventInfo={event} key={`id${event.id}index${index}`}/>
                                            ))
                                        }
                                </div>
                        </div>
                )
            )
     
}
export default RelatedEvents;