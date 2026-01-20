import connectDB from "@/backend/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { pagination, handleError } from "@/backend/lib";
import { Event, IEvent } from "@/backend/database";
//fetch event
export async function GET(req: NextRequest) :Promise<NextResponse> {
    try{
     await  connectDB();
     const searchParams = req.nextUrl.searchParams;
    const params = Object.fromEntries(searchParams);
     if(!Event){
       return NextResponse.json({message:'Event model not found'},{status:500})
     }
     const result = await pagination<IEvent>(Event,params,{
        searchFields : ['title'],
     })
     return NextResponse.json(result, {status:200})
    }catch(error){
      return handleError(error)
    }
  }
  // await Event.findOne({ slug: sanitizedSlug }).lean()
  // This will fetch the event as a plain object instead of a full Mongoose document, which is faster and lighter.