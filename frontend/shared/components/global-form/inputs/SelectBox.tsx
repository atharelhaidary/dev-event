import {  Select } from "antd";
import { TInputs } from "../../../types/form-field.type";
import { mergeClasses } from "@/frontend/shared/lib/utils/classNames";
const SelectBox  =  ({control,field}:TInputs) => {
    return(
        <Select 
          {...control}
          id={field.config.name}
          options={field.config.options} 
          placeholder={field.config.placeholder} 
          className={mergeClasses("custom-input",field.config.input.class)}
        />
    )
}
export default SelectBox;