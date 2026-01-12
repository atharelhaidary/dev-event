import { TImgItem } from "../types/event.types"
export const generateDbImg = (imgData : TImgItem[] | TImgItem)  => {
    
    if(Array.isArray(imgData)){
        const imgs = imgData.filter((img)=> img.action !== 'keep')
        if(imgs.length !== 0 ){
        return  imgData.filter((img)=> img.action !== 'keep').map((img)=>(
            generateObjImg(img)
         ))
        }else{
            return;
        }
       
    }
    if(typeof imgData === "object"){
        const { url, action  } = imgData;
        if(!url) return;
        if(action === 'keep') return;
        return  generateObjImg(imgData)
    }
  
}

const generateObjImg = (img : TImgItem) => {
    return {
        action: img.action,
        url : img.url,
        id : img.id,
    }
}