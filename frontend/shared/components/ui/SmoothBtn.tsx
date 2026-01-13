import { Button } from "antd"
import { mergeClasses } from "@/frontend/shared/lib/utils/classNames";
import React from "react";

type TSmoothBtn = {
    title?:string;
    titleStyle?: string;
    childrenStyle? : string;
    children?: React.ReactNode;
    btnStyle? :string;
    hoverColor?:any;
    onClick? : () => void;
    htmlType? : "submit" | "button" | "reset"
    type?: "default" | "primary" | "dashed" | "link" | "text";
    form? :string

}


const SmoothBtn = ({btnStyle, title, hoverColor, onClick, titleStyle,childrenStyle, children, htmlType="submit", type="primary", form}:TSmoothBtn) => {
    return(
        <Button 
            type={type}
            htmlType={htmlType}
            className={mergeClasses("relative overflow-hidden  border-0 text-white  !text-[16px]   md:!text-lg  !font-extrabold  !py-5  !px-12 !rounded-lg transition-all duration-500 hover:scale-105 active:scale-95 group",
                  btnStyle
            )}
            onClick={onClick}
            form={form}
         >
                {/* title only */}
                <span 
                        className={
                            mergeClasses("relative z-10",titleStyle)
                        }
                >
                        {title && title}
                 </span>
                 {/* children */}
                 <div
                        className={
                            mergeClasses("relative z-10 ",childrenStyle)
                        }
                 >
                 {children && children}
                 </div>
                {/* animation */}
                <div 
                        className={
                            mergeClasses("absolute inset-0  transform translate-x-full group-hover:translate-x-0  group-active:translate-x-0  transition-transform duration-500 btn-hover-primary",
                            hoverColor)
                        }
                ></div>
        </Button>
    )
}
export default SmoothBtn;