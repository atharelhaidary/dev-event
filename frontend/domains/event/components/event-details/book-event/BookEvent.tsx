"use client"
import GlobalForm from "@/frontend/shared/components/global-form/GlobalForm"
import { FormField } from "@/frontend/shared/components/global-form/ui/FormField"
import { FieldValues, FormProvider } from "react-hook-form"
import { EMAIL, EVENT_ID } from "../../../config/book-event-form.config"
import { useForm } from "react-hook-form"
import { createBookEvent } from "../../../actions/mutation"
import { usePopup } from "@/frontend/shared/context/PopupContext"
import { toast } from "sonner"
import { generateFormData } from "@/frontend/shared/lib/utils/generate-form-data"
import { useRouter } from "next/navigation"
type TBookEventProps = {
    idEvent : number
}
const BookEvent = ({idEvent}: TBookEventProps) => {
    const router = useRouter();
    const methods = useForm<FieldValues>({
        mode: "onSubmit",
        defaultValues : {
            email:'',
            eventId:''
        },
        reValidateMode: "onChange",
        shouldUnregister: false
      });
    const { setError, reset ,formState :{errors} }= methods
    const { showPopup, hidePopup } = usePopup();

    const createBook = async (data:  FieldValues) => {
        showPopup("loading")
        try{
            const formData = new FormData()
            const response =  await  createBookEvent(generateFormData(formData,data),{caller:"client-component"})
            if(response.status === 201){
                router.refresh();
                toast.success(response.message)
                reset({
                    "email":""
                })
            }else{
                if(response.data){
                    Object.entries(response.data).forEach(([key,value])=>(
                        setError?.(key,{
                            type: "manual", 
                            message: value as string
                       })
                    ))
                }
                toast.error(`${response.message}`)
            }
        }finally{
            hidePopup("loading")
        }
    }
    return(
        <div className="rounded-2xl border-3 border-border-wrapper-input border-2 p-5  flex flex-col gap-4 w-full lg:w-98 ">
            <h2 className="font-bold text-3xl">Book Your Spot</h2>
            <FormProvider {...methods}>
                <GlobalForm
                            formLayoutStyle="vertical"
                            formClassName="!w-[100%] h-full flex flex-col   justify-center items-center"
                            onSubmit={ createBook }
                            submit = {
                                {
                                text:"Book",
                                class:"!w-[99%]",
                                icon: <p>+</p>
                                }
                            }
                                
                            >
                                <FormField config={EMAIL} />
                                <div className={`w-full -mt-7 ${!errors?.['eventId'] && "hidden"}`}>
                                   <FormField 
                                        config={{
                                            ...EVENT_ID,
                                            config:{
                                                ...EVENT_ID.config,
                                                input:{
                                                    ...EVENT_ID.config.input,
                                                    value:idEvent
                                                }
                                            }
                                        }} 
                                    />
                                </div>
                                
                </GlobalForm>
            </FormProvider>
        </div>
    )
}
export default BookEvent