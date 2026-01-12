"use client"
import {  createContext, useContext, useState} from "react";
import { Key } from 'antd/es/table/interface';

type TPopupStates = {
    [key: string] :  {open:boolean, id?:number | Key[], message?: string, slug?: string }

}
type TPopupContext = {
    popupStates: TPopupStates,
    showPopup: (key : string, data?: TShowpopupProps ) => void,
    hidePopup : (key : string) => void
    clearAllPopup : () => void

}

type TShowpopupProps = {
    data? : {
        id?: number | Key[],
        message? : string,
        slug? :string
    }
}

const PopupContext = createContext<TPopupContext | null>(null);


export const PopupProvider = ({children}:{children:React.ReactNode}) => {
    const [popupStates, setPopupState ] = useState<TPopupStates>({});

    const showPopup =(key : string, data?: TShowpopupProps ) => {

        setPopupState((prev)=>({
            ...prev,
            [key]: { open: true }
        })) 
        if(data?.data){
            Object.entries(data?.data).forEach(([keyVal,value])=>{
                setPopupState((prev)=>({
                    ...prev,
                    [key]:  { ...prev[key], [keyVal]: value } 
                })) 
            })

        }
    }
    const hidePopup = (key : string) => {
        setPopupState(prev => ({
          ...prev,
          [key]:{ open:false }
        }));
      };
    const clearAllPopup = () => {
        setPopupState({})
    }  
    return(
        <PopupContext.Provider value={{popupStates, showPopup, hidePopup, clearAllPopup}}>
            {children}
        </PopupContext.Provider>
    )
}




export const usePopup = (): TPopupContext => {
    const context = useContext(PopupContext);
    
    if (!context) {
      throw new Error("useLoading must be used within a LoadingProvider");
    }
    
    return context;
};



