import { Input } from "antd";
import { TInputs } from "../../../types/form-field.type";
import { mergeClasses } from "@/frontend/shared/lib/utils/classNames";


const InputTextArea = ({control,field}:TInputs) =>{
    return(
        <Input.TextArea 

                        {...control} 
                        id={field.config.name}
                        name={field.config.name}
                        placeholder={field.config.placeholder}  
                        autoSize={{ minRows: field.config.input.rows, maxRows: 50}} 
                        className={mergeClasses("custom-input",field.config.input.class)}
         />
    )
}
export default InputTextArea;