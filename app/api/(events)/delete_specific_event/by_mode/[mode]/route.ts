import { NextRequest, NextResponse } from "next/server";
import Event from "@/backend/database/event.model";
import { validateMode } from "@/backend/lib/validateMode";
import connectDB from "@/backend/lib/mongodb";
import { handleError } from "@/backend/lib/errors/handleErrors";

type TParamsRoute = {
    params :Promise<{
        mode: string
    }>
}

export async function DELETE (request:NextRequest, {params}:TParamsRoute) : Promise<NextResponse> {
    try{
        await connectDB();
        const { mode } = await params;
        const errorParams = validateMode(mode);
        if(errorParams){
             return NextResponse.json({message:errorParams,status:'failed'},{status:400})

        }
        const deletedEvent = await Event.deleteMany({mode:mode})
        if(!deletedEvent || deletedEvent.deletedCount < 1){
            return NextResponse.json({message:`Event with mode:${mode} not found`,status:'failed'},{status:404})
        }
        return NextResponse.json({message:`delete Events with mode:${mode} successfully`,deletedEvent,status:'success'},{status:200})

    }catch(error){
        return handleError(error)
    }

}