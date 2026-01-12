import {  getEvent, getRelatedEvents} from "@/frontend/domains/event/actions/query";
import { getRouteParams } from "@/frontend/domains/event/lib/get-route-params";
import { notFound } from "next/navigation";
type TRootEventDetailsLayoutProps = {
  children: React.ReactNode
  "related-events": React.ReactNode,
   params: Promise<{ id_slug: string }>
}

export default async function  RootEventDetailsLayout  ({children, "related-events": relatedEvents,params}: TRootEventDetailsLayoutProps)  {
 

    try{
      const resolvedParams = await params
      const { id, slug } = getRouteParams(resolvedParams)
      const [ event, relatedEventss ] =  await Promise.all([
        getEvent(id),
        getRelatedEvents(id)
      ])
      const eventDetails = event?.data;
        if (!eventDetails || slug !== eventDetails.slug) {
        notFound();
    }
      return(
            <>
              { children }
              { event.status === 200 && relatedEventss && relatedEvents }
            </>

      )
    }catch(error){    
      return (
         <>
            { children }
         </>
      )
       
    }
       
  
}

