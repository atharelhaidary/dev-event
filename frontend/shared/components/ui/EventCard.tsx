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
            <LazyImgWithBlur classNameImg="w-[20px] h-[20px] flex-none !rounded-none"  imgStyle="object-contain !rounded-none"  src={img} alt={img} priority={false} loading="lazy"/>
            <span className="capitalize text-light-200 text-[12px] md:text-sm">
                {title} 
            </span>
        </div>
    )
}
export default function EventCard ({eventInfo}:{eventInfo:TCreateEvent}) {
    return(
    <Link href="" className="h-auto w-full rounded-b-2xl rounded-t-xl  flex flex-col border border-bg-tags">
        <LazyImgWithBlur classNameImg="aspect-square rounded-none"  imgStyle="!rounded-b-none"  src={eventInfo?.image?.url || "/images/noImg.png" } alt={`${eventInfo.slug}-eventImg`} priority={true} loading="eager"/>
        <div className="flex flex-col gap-4 py-4 mt-2  flex-grow px-3  rounded-xl">
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