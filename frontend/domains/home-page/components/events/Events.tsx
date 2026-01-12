import EventCard from "@/frontend/shared/components/ui/EventCard";
import { events } from '../../config/events.config'


const Events = async () => {
//   const events = await  getAllEvents();
//   const eventsData : TCreateEvent [] = events?.data
    return(
        // eventsData && eventsData.length > 0 ?
            <div className="flex flex-col gap-7" id="allEvents">
                <span className="span-heading">Featured Events</span>
                <div className="events">
                    {
                          events.map((event,index:number)=>(
                            <EventCard eventInfo={event} key={`id${event.id}index${index}`}/>
                        ))
                    }
                </div>
            </div> 
            // : []
    )
}
export default Events;