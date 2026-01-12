import { mergeClasses } from "@/frontend/shared/lib/utils/classNames";
import { TInputs } from "@/frontend/shared/types/form-field.type";
import { Input } from "antd";
import { useEffect } from "react";

export const InputHidden = ({control,field}:TInputs) =>{
    const hiddenValue = field.config.input.value;
    useEffect(() => {
      if (hiddenValue !== undefined && hiddenValue !== control.value) {
        control.onChange(hiddenValue);
      }
    }, [hiddenValue, control]);
    return(
        <Input  
                {...control}
                id={field.config.name}
                name={field.config.name}
                placeholder={field.config.placeholder}
                className={mergeClasses("!hidden",field.config.input.class)}
        />
    )
}