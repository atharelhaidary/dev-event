import { mergeClasses } from "@/frontend/shared/lib/utils/classNames";
import { TField } from "../../../types/form-field.type";


type TWrapperFormItem = {
    field : TField,
    status: any
    input : React.ReactNode
}

const WrapperFormField = ({field,status,input} : TWrapperFormItem) => {
    return(
      <div className={mergeClasses(
        "flex !h-auto !min-h-12 items-center px-4 py-2 gap-3 rounded-lg !text-[16px] !border-border-wrapper-input !bg-bg-wrapper-input hover:!border-primary !border-[1px] hover:!cursor-pointer !text-white",
        field.config.wrapperFormItem,
        status.error && "!border-b-red-500 !border-2",
        )}>
               {field.config?.input?.icons?.leftIcon}
               {input}
               {field.config?.input?.icons?.rightIcon}
      </div>
    )
  
  }
  export default WrapperFormField;