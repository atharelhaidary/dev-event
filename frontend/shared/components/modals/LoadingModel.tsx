"use client"
import { Modal} from "antd"
import { usePopup } from "@/frontend/shared/context/PopupContext";
import Spinner from "../feedback/Spinner";
const ModelLoading = () => {
    const {  popupStates } = usePopup();
    if(!popupStates['loading']?.open) return null;
    return(
                            <Modal
                                        title={null}
                                        footer={null}
                                        closable={false}
                                        open={popupStates['loading']?.open}
                                        width="60vw"
                                        styles={{
                                        container:{
                                                backgroundColor:'transparent',
                                                position:'relative',
                                        },
                                        body: {
                                            height: '75vh',
                                        },
                                        title:{
                                            color: 'var(--primary)',
                                            textAlign: 'center',
                                            fontSize:'24px'
                                        },
                                        }}

                            >

                                <Spinner/>
                            </Modal>
                        )
}
export default ModelLoading;