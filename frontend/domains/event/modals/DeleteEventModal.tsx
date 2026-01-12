"use client"
import { Modal} from "antd"
import Image from "next/image"
import SmoothBtn from "@/frontend/shared/components/ui/SmoothBtn"
import { usePopup } from "@/frontend/shared/context/PopupContext"
import deleteImage from '../../../shared/assets/images/ui/delete-image.gif'
import { useDeleteEvent } from "../hooks/mutations/use-delete-event"
import { generateFormData } from "@/frontend/shared/lib/utils/generate-form-data"


export const DeleteEventModal = () => {
    const {  popupStates, hidePopup , showPopup } = usePopup();
    const { mutate: deleteEvent } = useDeleteEvent();
    //handle Delete
    const handleDelete = () => {
        showPopup("loading")
        const formData = new FormData();
        const ids =  popupStates['delete']?.id
        const formDataResult = generateFormData(formData,{ids})
        deleteEvent(formDataResult)
    }
    //handle cancel
    const handleCancel = () => {
        hidePopup("delete")
    }
    if(!popupStates['delete']?.open) return null;
    return(
      <Modal
        title={null}
        footer={null}
        open={popupStates['delete']?.open}
        // closeIcon={
        //     <div className="btn-delete p-2 rounded-full hover:bg-gradient-delete absolute bottom-0">
        //         <IoMdClose size={20}/>
        //     </div>
        // }
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
        <div  className="feedback bg-white px-2 pb-5 rounded-xl">
            <Image src={deleteImage} width={200} height={200} alt="errorImg" className="absolute -top-26 rounded-full"/>
            <h3 className="text-delete mt-25">Are you sue ?</h3>
            <p >This action will delete all your information<br/>You won't be able to revert this!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                 <SmoothBtn 
                    htmlType="button"
                    title="yes,delete it"
                    btnStyle="btn-delete "
                    hoverColor="btn-hover-delete"
                    onClick={ handleDelete }
                />
                 <SmoothBtn 
                    type="text"
                    htmlType="button"
                    title="cancel"
                    titleStyle="!text-delete"
                    btnStyle="!border-delete !border-[2px] !w-full"
                    hoverColor="bg-gradient-white"
                    onClick={ handleCancel }
                 />
            </div>
        </div>

</Modal>
    )
}