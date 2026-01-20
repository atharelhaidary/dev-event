import Events from "@/frontend/domains/event/components/events/Events";
import { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourevents.com';

export const metadata: Metadata = {
    title: 'Events - Event Platform',
    alternates: {
      canonical: `${baseUrl}/events`,
    },
};
export default async function EventPage (){
    return(
            <Events/>  
    )

}

