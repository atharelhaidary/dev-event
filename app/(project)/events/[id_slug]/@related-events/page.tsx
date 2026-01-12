import RelatedEvents from "@/frontend/domains/event/components/event-details/related-events/RelatedEvents"
import Spinner from "@/frontend/shared/components/feedback/Spinner"
import { Suspense } from "react"
import { getRelatedEvents } from "@/frontend/domains/event/actions/query";
import { getRouteParams } from "@/frontend/domains/event/lib/get-route-params";
import { Metadata } from "next";
type TRelatedEventsPageProps = {
    params : Promise<{
        "id_slug": string
    }>
}

export async function generateMetadata({ params }: TRelatedEventsPageProps ): Promise<Metadata> {
    const { "id_slug": idSlug } =  await  params; 
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourevents.com';
    return {
      title: `Event Details`,
      alternates: {
        canonical: `${baseUrl}/events/related-events/${idSlug}`, 
      },
    };
}

async function DelayedContent({ params }: {params:{"id_slug": string}}) {
    const { id, slug } = getRouteParams(params)
    const events = await getRelatedEvents(id);
    return (
        <RelatedEvents events={events}/>
    );
}





export default async function RelatedEventsPage ({params}:TRelatedEventsPageProps)  {
    const resolvedParams = await params
    return(
        <Suspense fallback={<div className="flex-grow flex-center min-h-96"><Spinner/></div>}>
            <DelayedContent params={resolvedParams}/>
        </Suspense>
    
    ) 
}
