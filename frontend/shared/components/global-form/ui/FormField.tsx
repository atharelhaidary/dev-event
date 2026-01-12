"use client"
import { useFormContext,Controller, FieldValues, ControllerRenderProps, Control} from "react-hook-form";
import { Form} from "antd";
import { TField } from "../../../types/form-field.type";
import WrapperFormField from "./WrapperFormField";
import InputText from "../inputs/InputText";
import InputPassword from "../inputs/InputPassword";
import InputEmail from "../inputs/InputEmail";
import SelectBox from "../inputs/SelectBox";
import InputTextArea from "../inputs/InputTextArea";
import RadioBtn from "../inputs/RadioBtn";
import Date from "../inputs/Date";
import Time from "../inputs/Time";
import FileUploadField from "../inputs/File";
import { RenderLabel } from "./RenderLabel";
import { InputHidden } from "../inputs/InputHidden";
export const FormField = ({config}:{config:TField}) => {
    
    const renderField = (field: TField, controllerProps: ControllerRenderProps<FieldValues, string>,status:any, control:Control<FieldValues>) => {
      switch (field.config.input.type) {
        case "hidden":
          return <InputHidden control={controllerProps} field={field}/>
        case "input":
          return <WrapperFormField field={field} status={status} input={<InputText  control={controllerProps} field={field}/>} />
        case "email":
          return <WrapperFormField field={field} status={status} input={<InputEmail control={controllerProps} field={field}/>}/>
        case "password":
          return <WrapperFormField field={field} status={status} input={<InputPassword control={controllerProps} field={field}/>}/>
        case "select":
          return <WrapperFormField field={field} status={status} input={<SelectBox control={controllerProps} field={field}/>}/>
        case "textarea":
          return <WrapperFormField field={field}  status={status} input={<InputTextArea control={controllerProps} field={field}/>}/>
        // case "checkbox":
        //   return (<Checkbox checked={controllerProps.value} onChange={(e) => controllerProps.onChange(e.target.checked)}>{field.config.placeholder} </Checkbox>
        //       );
        case "radio":
          return <WrapperFormField field={field} status={status} input={<RadioBtn control={controllerProps} field={field}/>}/>
        case "date":
            return <WrapperFormField field={field}  status={status} input={<Date control={controllerProps}  field={field}/>}/>
        case "time":
          return <WrapperFormField  field={field}   status={status} input={<Time control={controllerProps} field={field}/> } />
        case "file":
          return  <FileUploadField 
                    control={controllerProps}
                    originalControl={control}
                    field={field}
            />
        default:
              return <></>; // ReactElement فارغ بدل null
      }
    };  

    const { control } = useFormContext();

    return(
                      <Form.Item 
                        className="!w-full !h-full  !relative"
                        key={`${config.config.name}-${Math.random()}`}
                        id={config.config.name}
                        {...(config.config.input.type !== 'radio' &&  { htmlFor: config.config.name })}
                        // // labelCol={{ span: 24 }}
                        // // wrapperCol={{ span: 24 }} 
                      >  
                          <RenderLabel config={config}/>
                          <Controller
                            name={config.config.name}
                            control={control}
                            rules={config?.config?.rules}
                            render={({ field: controllerProps, fieldState }) => {
                              const msg = fieldState.error?.message
                              return(
                                  <>
                                            {renderField(config, controllerProps, fieldState, control)}
                                            {fieldState.error && (
                                              <div className="text-red-500 text-sm mt-1">
                                                {
                                                  typeof msg === 'string' ? msg : 
                                                  typeof msg === 'object' &&  Object.values(msg).join(', ')
                                                }
                                              
                                              </div>
                                            )}
                                    </>

                              )
                          
                            }}
                          />
                      </Form.Item>
              )
            
  }



