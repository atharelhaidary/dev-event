import { TCreateEvent } from "../../types/event.types"
import LazyImgWithBlur from "@/frontend/shared/components/ui/LazyImgWithBlur"
import BookEvent from "./book-event/BookEvent"
import { generateItems } from "../../config/items.config"
import { Collapse } from "antd"

type TEventDetailsProps = {
    event: TCreateEvent
}
const EventDetails =  ({event}:TEventDetailsProps) => {
    const length = 6;

    const items = generateItems(event)

    return(
            <div className="flex flex-col gap-17 w-full" >
                {/* header */}
                <div className="flex flex-col gap-5 w-full">
                    <h2 className="text-start">{event?.title}</h2>
                    <p>{event?.description}</p>
                </div>
                {/* image */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-20 items-start flex-grow w-full">
                        <LazyImgWithBlur   src={event?.image?.url || "/images/noImg.png" } alt={`${event.slug}-eventImg`}  />
                        <BookEvent idEvent={Number(event?.id)}/>
                </div>
                {/* details */}
                <div className="flex flex-col justify-center items-center gap-5 w-full lg:w-[65%] !text-xl" >
                     <Collapse
                            bordered={false}
                            style={{ padding: 0 }}
                            className="custom-collapse w-full flex flex-col gap-10  !text-[18px]"
                            defaultActiveKey={Array.from({ length }, (_, index) => String(++index))}
                            items={items}
                            expandIconPlacement="end"
                    />
                </div>
            </div>
    )
}
export default EventDetails