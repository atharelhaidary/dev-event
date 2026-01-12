import connectDB from "@/backend/lib/mongodb";
import { NextResponse } from "next/server";
import Event from "@/backend/database/event.model";
import { handleError } from "@/backend/lib/errors/handleErrors";
//fetch event
export async function GET() {
    try{
     await  connectDB();
     if(!Event){
      return NextResponse.json({message:'Event model not found'},{status:500})
     }
     const eventInfo = await Event.find().lean();
     return NextResponse.json({message:'Events fetched successfully','number-of-event':eventInfo.length,data:eventInfo},{status:200})
    }catch(error){
      return handleError(error)
    }
  }
  // await Event.findOne({ slug: sanitizedSlug }).lean()
  // This will fetch the event as a plain object instead of a full Mongoose document, which is faster and lighter.