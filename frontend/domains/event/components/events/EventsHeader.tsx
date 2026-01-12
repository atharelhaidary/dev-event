"use client"
import { useRouter } from "next/navigation"
import SmoothBtn from "@/frontend/shared/components/ui/SmoothBtn"


type TEventsHeaderProps = {
    eventCount?: number 
    isLoading? : boolean

}

const EventsHeader = ({eventCount,isLoading}:TEventsHeaderProps) => {
    const router = useRouter()
    const handleCreateEvent = ()=>{
        router.push(`/events/create`)
    }
    return(
        // isLoading &&
            <div className="flex-between mt-10">
                <h2>Event Mangement</h2>
                <SmoothBtn 
                    type="text"
                    htmlType="button"
                    title="Add New Event" 
                    btnStyle="!bg-gradient-primary !border-none hover:!bg-none"
                    onClick={ handleCreateEvent }
                    aria-label="Create a new event" 
                />
        </div>
    )
}
export default EventsHeader;