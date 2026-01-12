import connectDB from '@/backend/lib/mongodb';
import { NextRequest, NextResponse } from "next/server";
import Event, { IEvent } from "@/backend/database/event.model";
import {handleError, parseBody, formatZodErrors, isEmptyBody, validateBodyKeys, imageActionHandler} from '@/backend/lib/index'
import { eventSchema } from "@/shared/schemas";
import { TImgItem } from '@/frontend/domains/event/types/event.types';
//create new event 
export async function POST( request :NextRequest ) {
  try{
        await  connectDB();
        const body = await parseBody(request)
        const emptyBody = isEmptyBody(body);
        // check the body is empty
        if(emptyBody){
            return NextResponse.json({message: "Request body cannot be empty. Please provide valid data.", status: 400 },{ status: 400 });
        }
        //check body fields for create
       const invalidKeys =  validateBodyKeys<IEvent>(Event,body)
       if(Array.isArray(invalidKeys) && invalidKeys.length > 0){
            return NextResponse.json({message:`invalid key paramter for update :${invalidKeys.join(", ")}`,status:400},{status:400})
        }
        //check  validation
        const result = eventSchema.safeParse(body);
         if (!result.success) {
           const formattedErrors = formatZodErrors(result.error);
           return NextResponse.json({message: 'Validation Error', data: formattedErrors, status: 400 },{ status: 400 } );
        }
        const { image: _, attachments:__, ...bodyWithoutImages } = body;
        const bodyImg = body['image']
        const bodyAttachments  = body['attachments']
        let image;
        let attachments :TImgItem[] = [];

        //upload image in cloudinary
        if(bodyImg){
            const result = await imageActionHandler(bodyImg)
            if(result instanceof NextResponse){
                return result;
            }
            if(result && typeof result === 'object' && !Array.isArray(result)){
                image = result
            }
         }
        // upload attachments
        if(bodyAttachments){
          const result =  await imageActionHandler(bodyAttachments)
          if(result instanceof NextResponse){
              return result;
          }
           if(Array.isArray(result)){
              attachments = result
           }
        }
        const createdEvent = await Event.create({
          ...bodyWithoutImages,
          image,
          attachments
        })
        return NextResponse.json({message:'Event created successfully',data:createdEvent, status: true},
        {
          status: 200,
      })

  
  }catch(error : unknown){
    return handleError(error)
  }
}











//  if fronend send data as json.stringfy 
//  const body = await req.json();
// ==========================================================
//  if fronend send data as formData
// const formData = await req.formData();
// ==========================================================
// forData like this 
//     const formData =[
//         {name:'name', value: 'athar'},
//         {name:'age', value: '22'},
//     ]


// but i want the final result is 
//    {
//     name:'athar',
//     age:'22'
//    }
//    so i write 
//    let event =  Object.fromEntries(formData.entries());
// ===============================================================
// const numericFields = ["age"];

// numericFields.forEach((key) => {
//     if (data[key] !== undefined && data[key] !== null) {
//       const num = Number(data[key]);
//       data[key] = isNaN(num) ? data[key] : num;
//     }
//   })
// ===============================================================
// we sholud convert image to buffer in the backend to upload in to cloudinary
//not important to convert image to buffer if i send it direct to cloudinary

