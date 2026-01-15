import CreateEvent from "@/frontend/domains/event/components/CreateEvent"
import { notFound } from "next/navigation";
import { getEvent } from "@/frontend/domains/event/actions/query";
import { Suspense } from "react";
import Spinner from "@/frontend/shared/components/feedback/Spinner";
import { Metadata } from "next";
import { getRouteParams } from "@/frontend/domains/event/lib/get-route-params";


export async function generateMetadata({ params }: TUpdateEventPageProps ): Promise<Metadata> {
  const { "id_slug": idSlug } =  await  params; 
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourevents.com';
  return {
    title: `Event Details`,
    alternates: {
      canonical: `${baseUrl}/events/${idSlug}/edit`, 
    },
  };
}

async function DelayedContent({ params }: {params:{"id_slug": string}}) {
  // await new Promise(resolve => setTimeout(resolve, 90000));
  const { id, slug } = getRouteParams(params)
  const event = await getEvent(id);
  const eventDetails = event?.data;
    if (!eventDetails || slug !== eventDetails.slug) {
      notFound();
  }
  return  <CreateEvent  event={eventDetails}/>
}


type TUpdateEventPageProps = {
  params :Promise<
     { "id_slug": string }
  > 
}

export default async function UpdateEventPage ({params}:TUpdateEventPageProps)  {
  const resolvedParams = await params
  return(
    <section className="global-container  flex flex-col flex-grow">
        <div className="w-full  lg:w-[60%] mx-auto flex-grow flex flex-col gap-10 items-center py-4 border-[2px] rounded-xl border-[#243B47] relative">
              <h2> Update an Event</h2>
              <Suspense fallback={<Spinner/>}>
                  <DelayedContent params={resolvedParams}/>
              </Suspense>
        </div>
      </section>
  ) 
}
