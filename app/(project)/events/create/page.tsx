import CreateEvent from "@/frontend/domains/event/components/CreateEvent"
import { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourevents.com';

export const metadata: Metadata = {
  title: 'Events - Event Platform',
  alternates: {
    canonical: `${baseUrl}/events/create`,
  },
};
export default async function CreateEventPage () {
        return(
          <section className="w-full md:w-[80%] lg:w-[60%] mx-auto flex flex-col gap-10 items-center py-4 border-[2px] rounded-xl border-[#243B47] relative">
            <h2> Create an Event</h2>
            <CreateEvent/>
          </section>
        )
   
}