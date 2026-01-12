import { FieldValues, useFormContext} from "react-hook-form";
import { Form } from "antd";
import { mergeClasses } from "@/frontend/shared/lib/utils/classNames";
import SmoothBtn from "../ui/SmoothBtn";




type Props = {
  children : React.ReactNode
  onSubmit: (data: FieldValues ) => void;
  formClassName?: string;
  formLayoutStyle: "horizontal" | "inline" | "vertical" ;
  submit?: {
    text?:string,
    class?:string,
    icon?: React.ReactNode
  }
};

export default function GlobalForm({ children, onSubmit, submit = {text:"submit"}, formClassName, formLayoutStyle }: Props) {
  const methods = useFormContext();
  //errors

  return (
   
      <Form    id="global-form" layout={formLayoutStyle}  onFinish={methods.handleSubmit(onSubmit)} className={formClassName}>
          {/* form items */}
          {children}
          {/* button */}
           <SmoothBtn 
                form="global-form" 
                type="text"
                htmlType="submit" 
                childrenStyle="flex gap-2"
                btnStyle={mergeClasses("!bg-gradient-primary !border-none hover:!bg-none",submit?.class)}
            >
              {submit.text}
              {submit?.icon && submit?.icon}
          </SmoothBtn>
      </Form>
  );
}



// "babel-plugin-react-compiler": "^1.0.0",
