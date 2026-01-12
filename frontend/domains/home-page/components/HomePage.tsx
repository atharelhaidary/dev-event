import Slider from "./slider/Slider"
import { Suspense } from "react";
import Spinner from "../../../shared/components/feedback/Spinner";
import Events from "./events/Events";

const HomePage = () => {
    return(
    <div className="flex-grow  flex flex-col gap-20 lg:gap-40">
        <Slider/>
        <Suspense fallback={<Spinner/>}>
          <Events/>
        </Suspense>
    </div>
    )
}
export default HomePage;