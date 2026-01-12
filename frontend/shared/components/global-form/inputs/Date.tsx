import { mergeClasses } from "@/frontend/shared/lib/utils/classNames"
import { DatePicker } from "antd";
import { TInputs } from "../../../types/form-field.type";
import dayjs from "dayjs";

const Date = ({control,field}:TInputs) =>{
    const handleChange = (date: any) => {
        control.onChange(date?.$d);
      };
    return(
    <DatePicker
            style={{ width: "100%" }}
            id={field.config.name}
            name={field.config.name}
            className={mergeClasses("custom-input",field.config.input.class)}
            value={control.value ? dayjs(control.value) : null}
            onChange={handleChange}
            placeholder={field.config.placeholder}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
     />
    )
}
export default Date;