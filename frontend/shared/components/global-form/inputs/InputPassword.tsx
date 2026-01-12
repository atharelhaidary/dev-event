import { mergeClasses } from "@/frontend/shared/lib/utils/classNames"
import { Input } from "antd";
import { TInputs } from "../../../types/form-field.type";


const InputPassword = ({control,field}:TInputs) =>{
    return(
        <Input.Password  
            {...control}
            id={field.config.name}
            name={field.config.name}
            placeholder={field.config.placeholder} 
            className={mergeClasses("custom-input",field.config.input.class)}      
         />
    )
}
export default InputPassword;