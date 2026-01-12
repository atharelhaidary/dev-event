import { Document, Schema, model, models } from "mongoose";
import Counter from "./counter.model";

export interface IEvent extends Document  {
   id:number;
   title : string;
   slug:string;
   description :string;
   overview: string;
   image :{
      url:string ;
      id: string;
   },
   attachments:{
      "url":string;
      "id": string;
   }[];
   venue : string;
   location : string;
   startDate: string;
   endDate: string;
   time: string;
   audience: string;
   organizer :string;
   mode:string;
   tags :string[];
   agenda : {
    "sessionSpeaker":string,
    "sessionTitle": string, 
    "starTime": string,
    "endTime": string,
  }[],
  bookedSeats : Number;
  createdAt : Date;
  updatedAt : Date,
}
const EventSchema  = new Schema<IEvent>({
    id: Number,
    title : {
        type: String,
        trim:true,
    },
    slug : {
        type: String,
        unique :true,
        lowercase : true ,
        trim : true
    },
    description : {
        type: String,
        trim:true,
    },
    overview: {
        type: String,
        trim: true,
      },
    image : {
        url : {
          type : String ,
           trim: true,
        },
        id : {
          type : String,
           trim: true,
        }
      },
    attachments :{
      type: [{
        url: {
         type: String ,
         trim: true,
       },
        id: {
         type: String,
         trim: true,
       },
     }],
    },
    venue: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    mode: {
        type: String,
      },
    //agenda
    agenda: {
      type: [{
         sessionSpeaker: {
          type: String,
          trim: true,
        },
         sessionTitle: {
          type: String,
          trim: true,
        },
        startTime: {
          type: String,
        },
        endTime: {
          type: String
        }
      }],
    },
    //organizer
    organizer: {
        type: String,
        trim: true,
      },
      tags: {
        type: [String],
      },
      bookedSeats: {
        type: Number,
        default: 0,  
        min: 0
    },
    },
   {
    timestamps :true,
   }
)




//to make auto id
EventSchema.pre("save",async function (next){
  const doc = this ;
  if(!doc.isNew) return next();
  const counter = await Counter.findOneAndUpdate(
    {key:"eventId"},
    {$inc:{seq:1}},
    {new:true, upsert:true}
  )
  doc.id = counter.seq;
  next();
})


EventSchema.pre('save', function (next) {
  const event = this as IEvent;
  // Generate slug only if title changed or document is new
  if (event.isModified('title') || event.isNew) {
    event.slug = generateSlug(event.title);
  }
  next();
});
function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

EventSchema.pre('findOneAndUpdate', function(next) {
  const doc: any = this.getUpdate();
  if (!doc) return next();

  doc.$set = doc.$set || {};

  if (doc.$set.title) {
    doc.$set.slug = generateSlug(doc.$set.title);
  }

  next();
});











//make index for better search
EventSchema.index({ id: 1 }, { unique: true })
EventSchema.index({ createdAt: -1 });

const Event = models.Event || model('Event', EventSchema);
export default Event;







