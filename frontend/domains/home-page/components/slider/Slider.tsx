import Image from "next/image"
import { arrowDown } from '../../../../shared/assets/images/index';
import SmoothBtn from "../../../../shared/components/ui/SmoothBtn";
export default function Slider () {
    return(
        <div className=" flex-center flex-col gap-6 w-full">
            <h1>
                The Hub for Every Dev<br/>
                Event You Can’t Miss 
            </h1>
            <p className="text-center">
               Hackathons, Meetups, and Conferences, All in One Place
            </p>
            
            <SmoothBtn htmlType="button" btnStyle="hover:!bg-transparent !rounded-full !p-6">
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
            </SmoothBtn>
        </div>
    )
}