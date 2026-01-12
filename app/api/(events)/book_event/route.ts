import { handleError } from "@/backend/lib/errors/handleErrors";
import { parseBody } from "@/backend/lib/parsers/parse-body";
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/backend/lib/mongodb";
import { Event, Booking, IBooking } from "@/backend/database";
import { formatZodErrors } from "@/backend/lib/formatters/zod-error-formatter";
import { bookingEventSchema } from "@/shared/schemas/events";
import { isEmptyBody, validateBodyKeys } from "@/backend/lib";
export async function POST (request: NextRequest) : Promise<NextResponse> {
    try{
        await connectDB();
        const body = await parseBody(request)
       // check the body is empty
       const emptyBody = isEmptyBody(body);
       if(emptyBody){
         return NextResponse.json({message: "Request body cannot be empty. Please provide valid data.", status: 400 },{ status: 400 });
       }
       //check body fields for create
       const invalidKeys =  validateBodyKeys<IBooking>(Booking,body)
       if(Array.isArray(invalidKeys) && invalidKeys.length > 0){
            return NextResponse.json({message:`invalid key paramter for booking event :${invalidKeys.join(", ")}`,status:400},{status:400})
        }
        //check  validation
         const result = bookingEventSchema.safeParse(body);
         if (!result.success) {
           const formattedErrors = formatZodErrors(result.error);
           return NextResponse.json({message: 'Validation Error', data: formattedErrors, status: 400 },{ status: 400 } );
        }
        //check if event not found
        const event = await Event.findOne({id:Number(body.eventId)})
        if(!event){
            return NextResponse.json(
                { message: 'Event not found', status : 404 } ,
                { status: 404 }
            ); 
        }
        //check email
        const existingBooking = await Booking.findOne({
            eventId: body.eventId,
            email : body.email.toLowerCase().trim()
        })
        if(existingBooking){
            return NextResponse.json(
                {  message: 'You have already booked this event', status : 409},
                { status: 409 }
            ); 
        }
        const createBooking = await Booking.create({
            ...body,
            eventId: Number(body.eventId)
        })
        return NextResponse.json({message: 'Event booked successfully',status: 201, data : createBooking},
                    {
                      status:201,
                    //   headers: {
                    //     'x-next-revalidate': 'events',
                    //   },
                    }
            )
    }catch(error){
       return handleError(error)
    }
}