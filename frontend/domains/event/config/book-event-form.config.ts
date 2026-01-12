import { TField } from "../../../shared/types/form-field.type";

export const EMAIL : TField = {
    config :{
        // wrapperFormItem: "!w-95" ,
        name: "email",
        label: {
          value:`Email Address`,
        },
        input: {
          type:"email",
        },
        placeholder: `Enter your email`,
      }
}

export const EVENT_ID : TField = {
  config :{
      name: "eventId",
      label: {
        value:``,
      },
      input: {
        type:"hidden",
      },
      // placeholder: `Enter your email`,
    }
}