import { NextRequest, NextResponse } from "next/server";
import Event from "@/backend/database/event.model";
import connectDB from "@/backend/lib/mongodb";
import { handleError } from "@/backend/lib/errors/handleErrors";
import { parseBody } from "@/backend/lib/parsers/parse-body";

export async function DELETE (req:NextRequest) :Promise<NextResponse>{

    try{
        await connectDB()
        const body = await parseBody(req)
        //check empty body 
        if(Object.keys(body).length === 0){
            return NextResponse.json(
                { message: "Please provide at least one field", status: false },
                { status: 400 }
            );
        }
        const { ids } =  body;
        const parsedIds = ids
        //check if parsedIds is ==> array [1,2,3] // not ==> typeof string or number or object
        if(!Array.isArray(parsedIds)){
                   return NextResponse.json({message:`Invalid  ID Type `},{status:400}) 
        }
        //check if it is not empty array formData.append(ids,"[]")
         if(parsedIds.length < 1 ){
            return NextResponse.json({message:`you must send one ID at least for delete event`},{status:400}) 
        }
        //if it is array and check the type of each index is valid number ['ww',22,33]
        const invalidIndexes =  parsedIds.flatMap((id, index) => isNaN(id) ? [`Invalid Type id: ${id} at index: ${index}`] : []);
        if(invalidIndexes.length > 0){
        //    return  NextResponse.json({message:'Invalid Type', data: invalidIndexes.join(", "), status:false},{status:400})
           return  NextResponse.json({message:invalidIndexes.join(", "), status:false},{status:400})  
        } 
        // convert ["1",2,"3"] to => [1,2,3]
        const idsNumber : number[]= parsedIds.map((id: any)=>Number(id))


        //check if the id found in database
        const deletedIdFoundInDataBase1 = await Event.find({id:idsNumber});
        const deletedIdFoundInDataBase2 = deletedIdFoundInDataBase1.map((id)=>id.id)
        const notFoundId = idsNumber.filter((id:number)=> !deletedIdFoundInDataBase2.includes(id))
        const deletedEvents = await Event.deleteMany({id:idsNumber})


       //no id found in database
       if(deletedEvents.deletedCount < 1) {
            return NextResponse.json({message:`not found Evevnt with ids: ${idsNumber}`, status:false},{status:404})
       }

       let finalMessage = `delete Events successfully`
       if(notFoundId.length>0){
         finalMessage+=` but not found events with ids:${notFoundId}`;
       }
        return NextResponse.json({message:finalMessage, status:true},{status:200})

    }catch(error){
        return handleError(error)
    }

}



// method for delete
// deleteOne
// deleteMany
// findOneAndDelete
// findByIdAndDelete
