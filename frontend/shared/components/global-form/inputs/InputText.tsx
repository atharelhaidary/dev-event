import { mergeClasses } from "@/frontend/shared/lib/utils/classNames"
import { TInputs } from "@/frontend/shared/types/form-field.type";
import { Input } from "antd";
import { useFormContext } from "react-hook-form";

const InputText = ({control,field}:TInputs) =>{
    const { clearErrors } = useFormContext()
    return(
        <Input  
            {...control}
            id={field.config.name}
            name={field.config.name}
            placeholder={field.config.placeholder} 
            className={mergeClasses(
                "custom-input",
                field.config.input.class)}
            onKeyDown={() => {
               clearErrors(field.config.name);
            }}
       />
    )
}
// في كل الـ input components
export default InputText;