"use client"
import LazyImgWithBlur from "../ui/LazyImgWithBlur"
import notFoundImg from '@/frontend/shared/assets/images/background/not-found.png'
import SmoothBtn from "../ui/SmoothBtn";
import { redirect } from "next/navigation";

const GlobalNotFound = () => {
  const handleRefresh = () => {
    redirect('/')
  }
  return(
     <div className="w-full  flex-grow  global-container feedback">
       <LazyImgWithBlur 
            src={notFoundImg.src}
            alt={`globalNotFoundImg`}  
            preview={false} 
            fetchPriority="high"
            priority={true} 
            loading="eager"
       />
       <h3>We lost this page</h3>
       <p >We searched high and low but could't find what you're looking for. <br/> Let's find a better plave for you to go</p>
       <SmoothBtn 
                type="text"
                htmlType="button"
                title="try again"
                btnStyle="!bg-gradient-primary !border-none hover:!bg-none"
                onClick={ handleRefresh }
        />
     </div>
    )
}
export default GlobalNotFound;