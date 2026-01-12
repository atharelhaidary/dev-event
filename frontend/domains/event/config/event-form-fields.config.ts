import {  } from "next/dist/shared/lib/image-config"
import { TField } from "../../../shared/types/form-field.type"
//title 
export const title : TField = {
      config :{
          name: "title",
          label: {
            value:`Event title`,
          },
          input: {
            type:"input",
          },
          placeholder: `Enter Event title`,
          // rules: { required: `title is required` },
        }
}
export const age : TField = {
  config :{
      name: "age",
      label: {
        value:`Event age`,
      },
      input: {
        type:"password",
      },
      placeholder: `Enter Event age`,
      // rules: { required: `title is required` },
    }
}
//overview
export const overview : TField = {
    config :{
        name: "overview",
        label: {
          value:`Event overview`,
        },
        input: {
          type:"textarea",
          rows:4
        },
        placeholder: `Enter Event overview`,
        // rules: { required: `overview is required` },
      }
}
// image
export const image : TField = {
  config :{
      name: "image",
      label: {
        value:`Event Image / Banner`,
      },
      input: {
        type:"file",
        accept:"image/*",
        // multiple : true,
      },
      // placeholder: `Enter Event overview`,
      // rules: { required: `overview is required` },
    }
}
//attachments
export const attachments : TField = {
  config :{
      name: "attachments",
      label: {
        value:`Event attachments`,
      },
      input: {
        type:"file",
        accept:"image/*",
        multiple : true,
      },
      // placeholder: `Enter Event overview`,
      // rules: { required: `overview is required` },
    }
}
//start date
export const startDate : TField = {
    config :{
        name: "startDate",
        label: {
          value:`Event Start Date`,
        },
        input: {
          type:"date",
        },
        placeholder: `Enter Event Start Date`,
        // rules: { required: `Start Date is required` },
      }
}

//end date
export const endDate : TField = {
    config :{
        name: "endDate",
        label: {
          value:`Event End Date`,
        },
        input: {
          type:"date",
        },
        placeholder: `Enter Event End Date`,
        // rules: { required: `End Date is required` },
      }
}
// venue
export const venue : TField = {
    config :{
        name: "venue",
        label: {
          value:` Event Venue`,
        },
        input: {
          type:"input",
        },
        placeholder: `Enter Event Venue`,
        // rules: { required: `Venue is required` },
      }
}
// location
export const location : TField = {
    config :{
        name: "location",
        label: {
          value:` Event Location`,
        },
        input: {
          type:"input",
        },
        placeholder: `Enter Event Location`,
        // rules: { required: `Location is required` },
      }
}
//mode
export const mode : TField = {
    config :{
        name: "mode",
        label: {
          value:`Event mode`,
        },
        input: {
          type:"radio",
        },
        options : [
            {label:'online',value:"online"},
            {label:'offline',value:"offline"},
            {label:'hybrid',value:"hybrid"}
        ],
        // rules: { required: `mode is required` },
      }
}
//organizer
export const organizer : TField = {
    config :{
        name: "organizer",
        label: {
          value:`About The Organizer`,
        },
        input: {
          type:"textarea",
          rows:5
        },
        placeholder:"About The Organizer",
        // rules: { required: `organizer is required` },
      }
}
//tags
export const tags : TField = {
    config :{
        name: "tags",
        label: {
          value:`Tags Event`,
        },
        input: {
          type:"input",
        },
        placeholder:"Enter Tags Event",
        // rules: { required: `Tags is required` },
      }
}
//start-time
export const startTime : TField = {
  config :{
      name: "startTime",
      label: {
        value:`Start Time`,
      },
      input: {
        type:"time",
      },
      placeholder:"Enter Start Time",
      // rules: { required: `End Time Session is Required` },
    }
}
//end-time
export const endTime : TField = {
  config :{
      name: "endTime",
      label: {
        value:`End Time`,
      },
      input: {
        type:"time",
      },
      placeholder:"Enter End Time",
      // rules: { required: `End Time Session is Required` },
    }
}
//speaker
export const speaker : TField = {
  config :{
      name: "sessionSpeaker",
      label: {
        value:`Speaker`,
      },
      input: {
        type:"input",
      },
      placeholder:"Enter Speaker Name",
      // rules: { required: `Speaker is Required`},
    }
}
//session title
export const sessionTitle : TField = {
  config :{
      name: "sessionTitle",
      label: {
        value:`Session Title`,
      },
      input: {
        type:"input",
      },
      placeholder:"Enter Session Title",
      // rules: { required: `Session Title is Required` },
    }
}
//description
export const description : TField = {
    config :{
        name: "description",
        label: {
          value:` Event Description`,
        },
        input: {
          type:"textarea",
          rows:10
        },
        placeholder: `Enter Event Description`,
        // rules: { required: `Description is required` },
      }
}
