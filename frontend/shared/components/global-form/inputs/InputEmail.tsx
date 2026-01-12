import { mergeClasses } from "@/frontend/shared/lib/utils/classNames"
import { Input } from "antd";
import { TInputs } from "../../../types/form-field.type";


const InputEmail = ({control,field}:TInputs) =>{
    return(
        <Input  
            {...control}
            id={field.config.name}
            name={field.config.name}
            type="email"
            placeholder={field.config.placeholder} 
            className={mergeClasses("custom-input",field.config.input.class)}       
        />
    )
}
export default InputEmail;