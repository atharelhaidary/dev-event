import LazyImgWithBlur from "../ui/LazyImgWithBlur";
import SmoothBtn from "../ui/SmoothBtn";
import errorImage from '../../assets/images/ui/error-comp.webp'
type TErrorCompProps = {
    message?: string
    onClick? : ()=>void
}

const ErrorComp = ({message,onClick}:TErrorCompProps) => {
    return (
        <div  className="feedback px-10">
            <LazyImgWithBlur
                src={errorImage.src}
                preview={false} 
                alt="erroImg" 
                priority={true} 
                loading="eager"
                fetchPriority="high"
            />
            <h3>Ooops!!s</h3>
            <p >{message}</p>
            <SmoothBtn 
                type="text"
                htmlType="button"
                title="try again"
                btnStyle="!bg-gradient-primary !border-none hover:!bg-none"
                onClick={ onClick }
            />
        </div>
    )
}
export default ErrorComp;