"use client"
import { Modal} from "antd"
import { usePopup } from "@/frontend/shared/context/PopupContext"
import { IoMdClose } from "react-icons/io"
import errorImage from '../../../shared/assets/images/ui/errror-img.gif'
import Image from "next/image"
import SmoothBtn from "@/frontend/shared/components/ui/SmoothBtn"
export const EventErrorModal = () => {
    const {  popupStates, hidePopup  } = usePopup();
    const handleCancel = () => {
        hidePopup('error')
    }
    if(!popupStates['error']?.open) return null;
    return(
      <Modal
        title={null}
        footer={null}
        open={popupStates['error']?.open}
        closeIcon={
            <div className="bg-error p-2 rounded-full hover:bg-gradient-reset">
                <IoMdClose size={20}/>
            </div>
        }
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
        onCancel={ handleCancel }
>
        <div className="feedback bg-white px-4 pb-7 rounded-xl gap-4">
            
            <Image src={errorImage} width={200} height={200} alt="errorImg" className="absolute -top-26 rounded-full"/>
            <h3 className="text-delete/90 italic mt-25">Error!!</h3>
            <p>{popupStates['error']?.message}</p>
            <div className=" flex gap-10">
                 <SmoothBtn
                    type="text" 
                    htmlType="button"
                    title="try again"
                    btnStyle="!bg-gradient-primary !border-none hover:!bg-none"
                    onClick={ handleCancel }
                 />
            </div>
        </div>

</Modal>
    )
}