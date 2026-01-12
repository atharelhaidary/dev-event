import { Document ,Schema, models, model } from "mongoose";
import Event from "./event.model";
export interface IBooking extends Document  {
    // eventId: Types.ObjectId;
    eventId: number;
    email: string;
    createdAt: Date;
    updatedAt: Date
}

const BookingSchema = new Schema<IBooking>({

    eventId: {
        // type : Schema.Types.ObjectId,
        type : Number,
        ref: 'Event',
        required: [true,'Event ID is Required']
    },
    email: {
        type : String,
        required: [true,'Email is Required'],
        trim : true,
        lowercase : true
       
    },
}, { timestamps: true })


BookingSchema.pre('save',async function (next){
    const bookingDocument = this as IBooking
    try{
        if (bookingDocument.isModified('eventId') || bookingDocument.isNew){
            await Event.findOneAndUpdate(
              { id: Number(this.eventId)},
              { $inc : { bookedSeats :  1} },
              { new: true }
            )
         }
         next();  
     } catch (error) {
        next(error as Error);
     }
   
})

BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });
BookingSchema.index({ eventId: 1 });
BookingSchema.index({ eventId: 1, createdAt: -1 });
BookingSchema.index({ email: 1 });
const Booking = models.Booking || model<IBooking>('Booking',BookingSchema)
export default Booking;