import { Control, ControllerRenderProps, FieldValues } from "react-hook-form"

export type TField = {
 config : { 
    wrapperFormItem?: string
    name: string | any,
    label: {
        value:string
        icons?: {
          leftIcon?: React.ReactNode,
          rightIcon?:React.ReactNode,
        },
        class?: string
    },
    input: {
        type:"input" | "password" | "email" | "select" | "textarea" | "checkbox" | "radio" | "date" | 'time' | 'file' | "hidden",
        icons?:{
          leftIcon?: React.ReactNode,
          rightIcon?: React.ReactNode,
        },
        value?: number | string,
        rows?: number,
        class?:string
        accept?:string;
        multiple ?: boolean;
      },
    placeholder?: string,
    options?: { label: string; value: string | number }[];
    rules?: any;
 }
}




export type TInputs = {
  control : ControllerRenderProps<FieldValues, string>
  field : TField
  originalControl?: Control<FieldValues>
}