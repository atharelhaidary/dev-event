import Image from "next/image"
import Link from "next/link"
import { TCreateEvent } from "@/frontend/domains/event/types/event.types"
import pinImage from '../../assets/images/icons/pin.svg'
import calenderImage from '../../assets/images/icons/calendar.svg'
import modeImage from '../../assets/images/icons/mode.svg'
import { formatDate } from "../../lib/utils/format-date"
import LazyImgWithBlur from "./LazyImgWithBlur"
function Info ({img,title}:{img:string,title:string}) {
    return(
        <div className="flex items-start gap-2 ">
              <div  className="relative w-[20px] h-[20px]">
                        <Image 
                            src={img} 
                            alt={img}
                            fill
                            className="flex-none"
                            style={{
                             objectFit: 'contain' 
                            }}
                        />
            </div>
            <span className="capitalize text-light-200 text-[12px] md:text-sm">{title}</span>
        </div>
    )
}
export default function EventCard ({eventInfo}:{eventInfo:TCreateEvent}) {
    return(
    <Link href="" className="h-auto w-full rounded-t-2xl  flex flex-col">
        <LazyImgWithBlur classNameImg="aspect-square"  src={eventInfo?.image?.url || "/images/noImg.png" } alt={`${eventInfo.slug}-eventImg`}/>
        <div className="flex flex-col gap-4 py-4 mt-2  flex-grow">
            <Info img={pinImage} title={`${eventInfo.venue},${eventInfo.location}`}/>
            <p className="text-xl font-bold flex-grow">{eventInfo.title}</p>
            <div className="flex gap-x-3 gap-y-1 items-center flex-wrap">
                <Info img={calenderImage} title={formatDate(eventInfo.startDate)}/>
                <span className="text-3xl">|</span>  
                <Info img={modeImage} title={eventInfo.mode}/>
            </div>
        </div>
    </Link>
    )
}