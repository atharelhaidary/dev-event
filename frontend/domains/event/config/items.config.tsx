import { calender, mode, pin } from "@/frontend/shared/assets/images";
import {  TCreateEvent } from "../types/event.types";
import { formatDate } from "@/frontend/shared/lib/utils/format-date";
import LazyImgWithBlur from "@/frontend/shared/components/ui/LazyImgWithBlur";
import Image from "next/image";
export const generateItems = (event:TCreateEvent) => {
    const items = [];
    items.push(
        {
            key : `1`,
            label :  <span className="span-heading flex-1">Overview</span>,
            children : <p>{event?.overview}</p>,
            showArrow: true,


        },

    )
    if(Array.isArray(event?.attachments) && event?.attachments?.length > 0){
        items.push(
            {
                key : `2`,
                label :<span className={`span-heading flex-1`}>Attachments</span>,
                children : (
                    <div className="flex flex-wrap gap-4">
                       <LazyImgWithBlur preview={true} classNameImg="w-[100px] h-[100px]" imgStyle="object-cover" src={event?.attachments} alt={`${event.slug}-eventAttchment`} />
                    </div>
                    ),
                showArrow: true,
    
            },
        )

    }
    items.push(
        {
            key : `3`,
            label : <span className="span-heading flex-1">Event Details</span>,
            children : (
                        <div className="flex flex-col gap-3" >
                            { [
                                    {
                                        img:calender,
                                        title:'Date',
                                        value: `${formatDate(event?.startDate)} - ${formatDate(event?.endDate)}`
                                    },
                                    {
                                        img:pin,
                                        title:'Venue',
                                        value: `${event?.venue}, ${event?.location}}`
                                    },
                                    {
                                        img:mode,
                                        title:'mode',
                                        value: event?.mode
                                    },
                                ].map((item,index)=>(
                                    <div className="flex gap-2 items-start" key={index}>
                                        <Image src={item.img} width={20} height={20} alt={`${item.title}-img`} className="mt-1 flex-none"  />
                                        <span>{item.title} : {item.value}</span>
                                    </div>
                                ))}
                        </div>

            ),
            showArrow: true,

        },

    )
    items.push(
        {
            key : `4`,
            label : <span className="span-heading flex-1">Agenda</span>,
            children : (
                <div className="flex flex-col gap-10" >
                            {Array.isArray(event.agenda)&& event.agenda.length > 0 && event.agenda?.map((agendaItem, index:number) => (
                                <div key={index} className="flex flex-col gap-2 ml-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-white"/>
                                        <p className="span-heading text-xl">Session {index + 1}</p>
                                    </div>
                                    <div className="flex flex-col ml-5">
                                        <p>Time: {agendaItem.startTime} - {agendaItem.endTime}</p>
                                        <p>Session Title: {agendaItem.sessionTitle}</p>
                                        <p>Session Speaker: {agendaItem.sessionSpeaker}</p>
                                    </div>
                                </div>
                            ))}
                </div>
            ),
            showArrow: true,

        },

    )
    items.push(
        {
            key : `5`,
            label : <span className="span-heading flex-1">About the Organizer</span>,
            children : <p >{event?.organizer}</p>,
            showArrow: true,

        },
       ),
    items.push(
        {
            key : `6`,
            label : <span className="span-heading flex-1"></span>,
            children : (
                <div className="flex fex-wrap gap-4">
                    {
                        event?.tags.map((tag,index)=>(
                            <div key={index} className="bg-gradient-primary rounded-xl px-8 py-2">{tag}</div>
                        ))
                    }

                </div>
            ),
            showArrow: true,
        }
    )

    return items;
}

