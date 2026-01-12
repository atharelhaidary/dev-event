"use server"
import Event from "@/backend/database/event.model";
import connectDB from "@/backend/lib/mongodb";
const getRelatedEvents = async (id: number) => {
    try{
        await connectDB();
        const event = await  Event.find({id:id}).lean()
        const tagRegexPatterns = event[0]?.tags?.map((tag:string)=> 
            new RegExp(`^${tag}$`, 'i')  
          );
        const relatedEvents = await Event.find({
            id : { $ne: id },
            tags: { $in: tagRegexPatterns }
        })
        return relatedEvents
    }catch (error){
        throw new Error("Failed to Fetch Related Events")
    }
    
}
export default getRelatedEvents;