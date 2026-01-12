import { mergeClasses } from "@/frontend/shared/lib/utils/classNames"
import {  TimePicker } from "antd";
import dayjs from "dayjs";
import { TInputs } from "../../../types/form-field.type";
import { useFormContext } from "react-hook-form";


const Time = ({control,field}:TInputs) =>{
    const { clearErrors } = useFormContext()
    return(
        <TimePicker
                use12Hours
                format="hh:mm A"
                id={field.config.name}
                name={field.config.name}
                className={mergeClasses("w-full !border-transparent !bg-transparent hover:!border-transparent !border-[3px] hover:!cursor-pointer h-7 !placeholder-[#DCFFF8] custom-timepicker !px-0")}
                placeholder={field.config.placeholder}
                value={control.value ?dayjs(control.value, "hh:mm A") : null}
                onChange={(time) => control.onChange(time ? time.format("hh:mm A") : "")}
                onOpenChange={(open) => {
                    if (open) {
                      clearErrors(field.config.name);
                    }
                  }}
         />
    )
}
export default Time;