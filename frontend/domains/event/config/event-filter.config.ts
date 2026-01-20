import { TField } from "../../../shared/types/form-field.type";

export const SEARCH : TField = {
    config :{
        name: "search",
        label: {
          value:`Search`,
        },
        input: {
          type:"input",
        },
        placeholder: `Enter keywoard`,
      }
}
export const LOCATION : TField = {
  config :{
      name: "location",
      label: {
        value:`Location`,
      },
      input: {
        type:"input",
      },
      placeholder: `Enter location`,
    }
}
