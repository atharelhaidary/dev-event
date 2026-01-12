import LazyImgWithBlur from "../ui/LazyImgWithBlur"
import notFoundImg from '@/frontend/shared/assets/images/background/not-found.webp'

const GlobalNotFound = () => {
    return(
     <div className="w-full flex-grow flex">
       <LazyImgWithBlur 
            src={notFoundImg.src}
            alt={`globalNotFoundImg`}  
            classNameImg="w-full aspect-video lg:aspect-[16/9] flex-grow"   
            preview={false} 
            fetchPriority="high"
            priority={true} 
            loading="eager"
       />
     </div>
    )
}
export default GlobalNotFound;