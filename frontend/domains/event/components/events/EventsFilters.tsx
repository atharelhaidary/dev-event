import { useEffect } from "react";
import GlobalForm from "@/frontend/shared/components/global-form/GlobalForm";
import { FormField } from "@/frontend/shared/components/global-form/ui/FormField";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { SEARCH , LOCATION} from "../../config/event-filter.config";
import { usePagination } from "@/frontend/shared/context/PaginationContext";
import SmoothBtn from "@/frontend/shared/components/ui/SmoothBtn";
import { FaFilter } from "react-icons/fa";
import { RiResetRightLine } from "react-icons/ri";


const EventFilters = () => {
    const {  generateQueryParams , queryParams, resetQueryParams } = usePagination();
    const  hasQueryParams =  queryParams.trim() !== ''
    const methods = useForm<FieldValues>({
        mode: "onSubmit",
        defaultValues : {
            search:'',
            location:'',
        },
        reValidateMode: "onChange",
        shouldUnregister: false
      });
    const {  reset  }= methods

    const handleFilter = (data : FieldValues) => {
        generateQueryParams(data)
    }
    useEffect(()=>{
        if(!hasQueryParams){
            reset({
                search:'',
                location:'',
            })

        }
    },[hasQueryParams])
    return(
        <FormProvider {...methods}>
                <GlobalForm
                            formLayoutStyle="vertical"
                            formClassName={`!w-[100%] !mt-5 gap-4 grid grid-cols-1 ${hasQueryParams ? "lg:grid-cols-[1fr_1fr_auto_auto]" : "lg:grid-cols-[1fr_1fr_auto]"}`}
                            onSubmit={ handleFilter }
                            submit = {
                                {
                                    text:"Filter",
                                    class:"lg:mt-10 !h-10 !px-20",
                                    icon :<FaFilter/>
                                }
                            }
                                
                            >
                            <FormField config={SEARCH} />
                            <FormField config={LOCATION} />
                            {
                                hasQueryParams &&
                                        <SmoothBtn 
                                            type="text"
                                            htmlType="button"
                                            childrenStyle="flex items-center gap-2"
                                            children = {
                                                <>
                                                   <span>Reset Filter</span>
                                                   <RiResetRightLine size={25}/>
                                                </>
                                            }
                                            btnStyle="!bg-gradient-primary  !border-none hover:!bg-none order-4 lg:mt-10 !h-10 !px-12"
                                            onClick={ resetQueryParams }
                                            aria-label="Reset Filter" 
                                        />
                             }
                            
                </GlobalForm>
            </FormProvider>
    )
}
export default EventFilters;