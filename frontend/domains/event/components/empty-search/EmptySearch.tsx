"use client"
import SmoothBtn from "@/frontend/shared/components/ui/SmoothBtn";
import emptySearchImg from '../../assets/ui/empty-search.png'
import LazyImgWithBlur from "@/frontend/shared/components/ui/LazyImgWithBlur";
import { usePagination } from "@/frontend/shared/context/PaginationContext";
const EmptySearch = () => {
    const { resetQueryParams } = usePagination()
    const handleResetFilter = () => {
        resetQueryParams()
    }
    return(
        <div className="feedback">
                <div className="relative aspect-[4/3] w-full max-w-[280px] lg:max-w-[400px] mb-20">
                    <LazyImgWithBlur 
                        src={emptySearchImg.src} 
                        alt="emptySearchImg" 
                        classNameImg="object-contain" 
                        priority={true} 
                        loading="eager"
                        fetchPriority="high"
                        preview={false}
                    />
                 </div>
                <h3>Search not found</h3>
                <p>
                   Your search for didn't return any matches.<br/> Let's try something different!
                </p>
                 <SmoothBtn 
                        type="text"
                        htmlType="button"
                        title="Reset Filters"
                        btnStyle="!bg-gradient-primary !border-none hover:!bg-none"
                        onClick={ handleResetFilter }
                />
        </div>
    )

}
export default EmptySearch;