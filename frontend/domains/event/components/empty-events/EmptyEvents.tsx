"use client"
import SmoothBtn from "@/frontend/shared/components/ui/SmoothBtn";
import empty from '../../assets/ui/empty.webp'
import LazyImgWithBlur from "@/frontend/shared/components/ui/LazyImgWithBlur";
import { useRouter } from "next/navigation";
const EmptyEvents = () => {
    const router = useRouter()
    const handleCreateEvent = () => {
        router.push(`/events/create`)
    }
    return(
        <div className="feedback">
                <div className="relative aspect-[4/3] w-full max-w-[280px] lg:max-w-[400px] mb-20">
                    <LazyImgWithBlur 
                        src={empty.src} 
                        alt="emptyImg" 
                        classNameImg="object-contain" 
                        priority={true} 
                        loading="eager"
                        fetchPriority="high"
                        preview={false}
                    />
                 </div>
                <h3>No Upcoming Events!!</h3>
                <p>
                    Your events calendar is currently clear and waiting <br/>
                    This is your perfect starting point for something amazing. <br/>
                    ✨ Create your first event and let's begin this journey!
                </p>
                 <SmoothBtn 
                        type="text"
                        htmlType="button"
                        title="Add New Event"
                        btnStyle="!bg-gradient-primary !border-none hover:!bg-none"
                        onClick={ handleCreateEvent }
                />
        </div>
    )

}
export default EmptyEvents;