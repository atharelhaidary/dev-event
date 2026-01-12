import { Radio } from "antd";
import { TInputs } from "../../../types/form-field.type";


const RadioBtn = ({control,field}:TInputs) =>{
    return(
    <div role="radiogroup" aria-labelledby={`${field.config.name}`}>
        <Radio.Group
            name={field.config.name}
            id={field.config.name}
            onChange={(e) => control.onChange(e.target.value)}
            value={control.value}
        >
                {field.config.options?.map((option, index) => (
                <Radio
                    key={`${field.config.name}-${option.value}-${index}`}
                    id={`${field.config.name}-${option.value}`} 
                    value={option.value}
                >
                    {option.label}
                </Radio>
                ))}
        </Radio.Group>
    </div>
    )
}
export default RadioBtn;