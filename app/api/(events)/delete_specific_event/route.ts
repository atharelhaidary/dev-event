import { NextRequest, NextResponse } from "next/server";
import { validateMode } from "@/backend/lib/validateMode";
import { parseBody } from "@/backend/lib/parsers/parse-body";
import connectDB from "@/backend/lib/mongodb";
import { handleError } from "@/backend/lib/errors/handleErrors";
import Event from "@/backend/database/event.model";
export async function DELETE ( req :NextRequest) :Promise<NextResponse> {
    try{
        await connectDB();
       const body = await parseBody(req)
       const delEventParamter  = ['date','mode']
       if (Object.keys(body).length === 0) {
            return NextResponse.json(
                { message: "Please provide at least one field", status: 'failed' },
                { status: 400 }
            );
       }
      //accept only mode or data to delete event
       const invalidKeys= Object.keys(body).filter((key)=> !delEventParamter.includes(key))
       if(invalidKeys.length > 0){
           return NextResponse.json({message:`you should delete with date or mode only invalid keys such as :${invalidKeys}`,status:'failed'},{status:400})
       }
        // validate mode if found
        if(body?.mode){
                const errorMode = validateMode(body.mode)
                if(errorMode){
                    return NextResponse.json({message:errorMode,status:'failed'},{status:400})
                }
         }
        //validate date if found
        // if(body.date){
        //       const date = validatedDateSchema(body.date)
        //       body.date = date;
        // }
        //delete from database 
        const deleteEvent = await Event.deleteMany(body)
        if(deleteEvent.deletedCount < 1){
            return NextResponse.json({message:'Event not found'},{status:404})
        }
        return NextResponse.json({message:'delete Event successfully'},{status:200})

    }catch(error){
        return handleError(error)
    }
}



