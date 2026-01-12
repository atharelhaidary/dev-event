import connectDB from "@/backend/lib/mongodb";
import { NextResponse,NextRequest } from "next/server";
import { handleError } from "@/backend/lib/errors/handleErrors";
import Event from "@/backend/database/event.model";

type TEventParams = {
    params : Promise <{
        id: string
    }>
}
export async function GET ( req:NextRequest , {params} :TEventParams  ) :Promise<NextResponse>{

    try{
       await  connectDB();
       const { id } = await params;
       const idEvent = Number(id)
       if(!id || isNaN(Number(id))){
         return NextResponse.json({message:'Invalid or missing ID paramter',status:400},{status:400})
       }
       const specificEvent = await Event.findOne({id:idEvent}).lean();
       if(!specificEvent){
          return NextResponse.json({message:`Event with ID:${idEvent} not found`, status:404},{status:404})
       }
       return NextResponse.json({message:`fetch Event successfully`, data: specificEvent, status:200},{status:200})
    }
    catch (error) {
      return  handleError(error)
    }
}
