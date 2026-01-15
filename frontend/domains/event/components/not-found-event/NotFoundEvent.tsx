"use client"
import notFoundImg from '@/frontend/domains/event/assets/ui/not-found.png'
import LazyImgWithBlur from '@/frontend/shared/components/ui/LazyImgWithBlur';
import SmoothBtn from '@/frontend/shared/components/ui/SmoothBtn';
import { useRouter } from 'next/navigation';
export default function  NotFoundEvent  () {
    const router = useRouter()
    const handleReset = () => {
        router.push("/events")
    }
    return(
        <div className="feedback">        
            <LazyImgWithBlur
                src={notFoundImg.src} 
                alt="notFoundImg" 
                priority={true} 
                loading="eager"
                fetchPriority="high"
                preview={false}
            />
            <h3>404 - Event not Found</h3>
            <p className="self-center">
                We looked everywhere for this page.<br/>
                Are you sure the website URL is correct? <br/>
                Get in touch with the site owner
            </p>
            <SmoothBtn 
                type="text"
                htmlType="button"
                title="try again"
                btnStyle="!bg-gradient-primary !border-none hover:!bg-none"
                onClick={ handleReset }
            />
        </div>
    )

}