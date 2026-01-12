import { NextResponse } from "next/server";
import { cloudinaryDeleteImg } from "../cloudinary/cloudinary-delete-img"
import { cloudinaryUploadImg } from "../cloudinary/cloudinary-upload-img"
import { TImgItem } from "@/frontend/domains/event/types/event.types"

export const imageActionHandler = async (bodyImgs : TImgItem | TImgItem[],  originalImgs? : TImgItem[]) : Promise<TImgItem | TImgItem[] | NextResponse>  => {
    //multi images
    // Array.isArray(originalImgs)  && 
    if(Array.isArray(bodyImgs)){ 
        let currentAttachments: TImgItem[] = originalImgs ? [...originalImgs] : [];
        for (const item of bodyImgs) {
            const validationResult = await actionValidation(item, currentAttachments);
            
            if (validationResult instanceof NextResponse) {
                return validationResult;
            }
            
            if (Array.isArray(validationResult)) {
                currentAttachments = validationResult;
            }
        }
        return currentAttachments;
    }
    //single image
    if(typeof bodyImgs === "object" && !Array.isArray(bodyImgs)){
        let image;
        const  validationResult = await actionValidation(bodyImgs)
        if (validationResult instanceof NextResponse ) {
            return validationResult;
        }
        if(typeof validationResult === 'object' && !Array.isArray(validationResult)){
           return image = validationResult
        }         
    }
    return NextResponse.json(
        { message: "Invalid input format", status: 400 },
        { status: 400 }
    );
    
}



const actionValidation = async (bodyImgs :  TImgItem, originalImgs? : TImgItem[] ) : Promise<TImgItem | TImgItem[] | NextResponse >  => {
    const { url : urlImg, id : idImg, action : actionImg } = bodyImgs 
    if (actionImg === 'delete' && !idImg) {
        return NextResponse.json(
          { message: "ID is required for delete action", status: 400 },
          { status: 400 }
        );
    }
    if((actionImg === 'replace' || actionImg === 'add') && (!urlImg || !isFileOrBlob(urlImg))){
        return NextResponse.json(
            { message: "Image Must be a valid File object", status: 400 },
            { status: 400 }
          );
    }
    let localImg : TImgItem | undefined;
    let localAttachments : TImgItem[]  =  originalImgs ? [...originalImgs] : [];
    try{
            switch (actionImg) {
                case "delete":
                    if(idImg){
                        const success =  await cloudinaryDeleteImg(idImg)
                        if(success){
                            localImg = {
                                url : null,
                                id : null,
                            }
                        }
                        if(success && originalImgs){
                            const index = localAttachments?.findIndex((img)=> img.id === idImg);
                            if(localAttachments && localAttachments.length > 0 && index > -1){
                                localAttachments.splice(index,1)
                            }
                        }
                    }
                break;
                case "replace" :
                case "add":
                    if(idImg && actionImg === 'replace'){
                        await cloudinaryDeleteImg(idImg)
                    }
                    if(isFileOrBlob(urlImg) && typeof urlImg !== 'string' &&  urlImg ){
                        const { path, id } = await cloudinaryUploadImg(urlImg)
                        localImg =  {
                            url : path,
                            id : id
                        }
                        if(originalImgs){
                            localAttachments.push({
                                url : path,
                                id: id
                            })
                        }
                    }
                    break;
                case "keep" : 
                    break;
            }
            if(Array.isArray(originalImgs) && originalImgs) {
                return localAttachments
            }else{
                return localImg || { url: null, id: null}
            }
     }catch(error){
        return NextResponse.json(
            { message: "Internal server error", status: 500 },
            { status: 500 }
        );
     }

}


const isFileOrBlob = (input : any) => {
    if (input instanceof File) return true;
    if (input instanceof Blob) return true
    return false
}