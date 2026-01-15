import Image from "next/image"
import { arrowDown } from '../../../../shared/assets/images/index';
import SmoothBtn from "../../../../shared/components/ui/SmoothBtn";
export default function Slider () {
    return(
        <div className=" flex-center flex-col gap-6 w-full mt-7">
            <h1>
                The Hub for Every Dev<br/>
                Event You Can’t Miss 
            </h1>
            <p className="text-center">
               Hackathons, Meetups, and Conferences, All in One Place
            </p>
            
            <SmoothBtn 
                    type="text"
                    htmlType="button" 
                    btnStyle="!bg-gradient-primary !border-none hover:!bg-none" 
                    children={
                        <a href="#allEvents" className="flex gap-3 items-center">
                                <span>Explore Event</span>
                                <div  className="relative w-[30px] h-[30px]">
                                    <Image 
                                        src={arrowDown} 
                                        alt="سهم للأسفل" 
                                        fill
                                        style={{
                                            objectFit: 'contain' 
                                        }}
                                    />
                                </div>
                        </a>

            }/>
        </div>
    )
}