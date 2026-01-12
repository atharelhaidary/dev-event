"use client"
import { Modal} from "antd"
import Image from "next/image"
import successImg from '../../../shared/assets/images/ui/success-img.gif'
import SmoothBtn from "@/frontend/shared/components/ui/SmoothBtn"
import { usePopup } from "@/frontend/shared/context/PopupContext"
import { useRouter } from "next/navigation"
export const SuccessCreateEventModal = () => {
    const {  popupStates, hidePopup, clearAllPopup } = usePopup();
    const router = useRouter();
    const id = popupStates['success']?.id
    const slug = popupStates['success']?.slug
    const msg = popupStates['success']?.message

    const handleUpdate = () => {
        router.push(`/events/${id}_${slug}/edit`)
        clearAllPopup()
    }
    const handleDetails = () => {
        router.push(`/events/${id}_${slug}`)
        clearAllPopup()
    }
    if(!popupStates['success']?.open) return null;
    return(
      <Modal
        title={null}
        footer={null}
        open={popupStates['success']?.open}
        width={{
            xs: '90vw',  
            sm: '80vw',  
            md: '80vw',  
            lg: '60vw',  
            xl: '50vw',  
            xxl: '40vw'  
        }}
        closable={false}
        styles={{
        container:{

                backgroundColor:'transparent',
                height:'80vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                
        },
        body: {
            width:"100%",
            height: 'auto',
        },
        title:{
            color: 'var(--primary)',
            textAlign: 'center',
            fontSize:'24px'
        },
        }}
        onCancel={()=>hidePopup("success")}

>

        <div  className="feedback bg-white px-3 pb-7 rounded-xl gap-4">
            <Image src={successImg} width={200} height={200} alt="success" className="absolute -top-26 rounded-full"/>
            <h3 className="text-[#4F7942]/90 italic mt-25">Success!</h3>
            <p>{msg}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                 <SmoothBtn 
                   type="text"
                   htmlType="button"
                   title="update now" 
                   btnStyle="!bg-gradient-primary !border-none hover:!bg-none"
                   onClick={handleUpdate}
                />
                 <SmoothBtn 
                    htmlType="button" 
                    title="show details" 
                    btnStyle="hover:!bg-transparent"                    
                    onClick={handleDetails}
                 />
            </div>
        </div>

</Modal>
    )
}