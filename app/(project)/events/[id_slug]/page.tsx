import { getEvent } from "@/frontend/domains/event/actions/query"
import EventDetails from "@/frontend/domains/event/components/event-details/EventDetails"
import { getRouteParams } from "@/frontend/domains/event/lib/get-route-params"
import Spinner from "@/frontend/shared/components/feedback/Spinner"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"



type TSpecificEventPageProps = {
    params : Promise<{
        "id_slug": string
    }>
}


export async function generateMetadata({ params }: TSpecificEventPageProps ): Promise<Metadata> {
    const { "id_slug": idSlug } =  await  params; 
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourevents.com';
    return {
      title: `Event Details`,
      alternates: {
        canonical: `${baseUrl}/events/${idSlug}`, 
      },
    };
}
async function DelayedContent({ params }: {params:{"id_slug": string}}) {
    // await new Promise(resolve => setTimeout(resolve, 100000));
    const { id, slug } = getRouteParams(params)
    const event = await getEvent(id);
    const eventDetails = event?.data;
        if (!eventDetails || slug !== eventDetails.slug) {
        notFound();
    }
    return (
            <EventDetails event={eventDetails}/>
    );
}



export default async function EventDetailsPage ({params}:TSpecificEventPageProps)  {
    const resolvedParams = await params
    return(
        
            <Suspense fallback={<div className="flex-grow flex-center min-h-96"><Spinner/></div>}>
                <DelayedContent params={resolvedParams}/>
            </Suspense>
        
    
    ) 
}


