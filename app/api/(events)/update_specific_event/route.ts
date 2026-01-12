import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/backend/lib/mongodb";
import { handleError } from "@/backend/lib/errors/handleErrors";
import { parseBody } from "@/backend/lib/parsers/parse-body";
import Event, { IEvent } from "@/backend/database/event.model";
import { eventSchema } from "@/shared/schemas";
import { formatZodErrors } from "@/backend/lib/formatters/zod-error-formatter";
import { imageActionHandler } from "@/backend/lib/images/image-action-handler";
import { TImgItem } from "@/frontend/domains/event/types/event.types";
import { validateBodyKeys } from "@/backend/lib/validators/validate-body-keys";
import { isEmptyBody } from "@/backend/lib/validators/is-empty-body";
export async function POST (request: NextRequest):Promise<NextResponse> {
    try{
        await connectDB();
        const body = await parseBody(request);
        const emptyBody = isEmptyBody(body);
        // check the body is empty
        if(emptyBody){
            return NextResponse.json({message: "Request body cannot be empty. Please provide valid data.", status: 400 },{ status: 400 });
        }
        //check body fields for update
       const invalidKeys =  validateBodyKeys<IEvent>(Event,body)
       if(Array.isArray(invalidKeys) && invalidKeys.length > 0){
            return NextResponse.json({message:`invalid key paramter for update :${invalidKeys.join(", ")}`,status:400},{status:400})
       }
        // check the id field
        if(!body.id || isNaN(body?.id)){
            return NextResponse.json({message:`you must provide id with type number`,status:400},{status:400})
        }
        //check  validation
        const result = eventSchema.safeParse(body);
        if (!result.success) {
            const formattedErrors = formatZodErrors(result.error);
            return NextResponse.json({message: 'Validation Error ', data: formattedErrors, status:  400 },{ status: 400 } );
        }
        const { image: _, attachments:__, ...bodyWithoutImages } = body;
        //get event
        const event = await  Event.find({id:body.id}).lean();
        const bodyImg = body['image'];
        const bodyAttachments  = body['attachments']
        let image ;
        let attachments : TImgItem[] =  event[0]?.attachments;
        // update image
       if(bodyImg){
            const result = await imageActionHandler(bodyImg)
            if(result instanceof NextResponse){
                return result;
            }
            if(result && typeof result === 'object' && !Array.isArray(result)){
                image = result
            }
        }
        // update attachments
        if(bodyAttachments){
            const result =   await imageActionHandler(bodyAttachments, event[0]?.attachments)
            if(result instanceof NextResponse){
                return result;
            }
             if(Array.isArray(result)){
                attachments = result
             }
        }
         //second solution for update
          const updateEvent = await Event.findOneAndUpdate(
            {id:Number(body.id)},
            {$set: { ...bodyWithoutImages, image, attachments }},
            { new: true , runValidators: true}
          )
         if(updateEvent.matchedCount === 0) return NextResponse.json({message:`Event not found`,status:404},{status:404})
         return NextResponse.json({message:`update Event successfully`,data:updateEvent},{status:200})

    }catch(error){
        return handleError(error)
    }
    
}






//udate method
// updateOne
// updateMany
// findByIdAndUpdate

// ======================================================================================================
// ======================================================================================================



//first solution for update
            // const event = await Event.findOne({id:Number(body.id)})
            // if(event){
            //     Object.assign(event,{...body,tags:tags,agenda:agenda});
            //     await event.save()
            //     return NextResponse.json({message:`update Event successfully`,eventInfo:event},{status:200})

            // }else{
            //     const event =await Event.create({...body,tags:tags,agenda:agenda})
            //     return NextResponse.json({message:`create Event successfully`,eventInfo:event},{status:200})
            // }


// ======================================================================================================
// ======================================================================================================



// in post or get method
// if i send header with Content-Type="application/json" or ="multipart/form-data"
//can read body 

// ======================================================================================================
// ======================================================================================================


// in PUT or get PATCH method
//can not read body with form-data so 
//so send body with json format


// ======================================================================================================
// ======================================================================================================



// {
//     acknowledged: true,
//     matchedCount: 1,     // عدد المستندات اللي اتطابقت مع الفلتر
//     modifiedCount: 1,    // عدد المستندات اللي اتغيرت فعلًا
//     upsertedId: null,    // لو حصل upsert هيحتوي ال id
//     upsertedCount: 0
//   }


// ======================================================================================================
// ======================================================================================================


//معلومات مهمة جدا
// =====================================================================================================

//1=>لو بعمل ابديت عادي ومفيش اي لوجيك بيحصل في المودل اللي هو في ملف الداتا بيز زي EventSchema.pre('save')
//2=> اعمل ابديت  عادي باي مثود 
//3=> الميثود دي زي .updateOne / .updateMany / .findOneAndUpdate
// ======================================================================================================
// ======================================================================================================
//1=> لو بعمل ابديت عادي بس عندي اي لوجيك في المودل اللي هو وجود في ملف الداتا بيز اللي هو event.mode.ts زي EventSchema.pre('save')
//2=> ساعتها مش هينفع اعمل ابديت بالميثود الي قولت عليها فوق وساعتها عندي اعمل ابديت بطريقتين
//3=> [
    //solution one => اعمل ابديت عن طريق اجيب المودل .find 
                     // وبعدين اقول .name = newName
                     // وبعدين اعمل .save لازم
    //solution two => استخدم اي ابديت ميثود زي .updateOne / .updateMany / .findOneAndUpdate 
                    // واروع في ملف المودل اعمل اللي موجود في فولدر الداتا بيز .pre('updateOne')   / .pre('updateMany') / .pre('findOneAndUpdate) 
                    // بس الحل دا مش افضل حاجة ليه بقي؟         
                    // عشان في query middleWare مفيشthis فمش هعرف اكسس اي حاجة    
// ]
// ======================================================================================================
// ======================================================================================================
//.pre('save) =====> document middleWare
// .pre('updateOne')   / .pre('updateMany') / .pre('findOneAndUpdate)  =======> query middleWare





