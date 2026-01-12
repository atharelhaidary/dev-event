'use client';
import { Upload } from 'antd';
import {  useEffect, useState} from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { FiUploadCloud } from 'react-icons/fi';
import SmoothBtn from '../../ui/SmoothBtn';
import { TInputs } from '../../../types/form-field.type';
import { generateFileReader } from '../../../lib/utils/generate-file-reader';
import LazyImgWithBlur from '../../ui/LazyImgWithBlur';
import { RiDeleteBin6Line } from 'react-icons/ri';


export default function FileUploadField({ field,originalControl,}:TInputs) {
  const { name, input, label } = field.config;
  const {  accept, multiple } = input;
  const watcheImgs = useWatch({
    control: originalControl,
    name:  name 
  });
  const formContext = useFormContext();
  const { setValue, } = formContext; 
  const [fileLists, setFileLists] = useState<any[]>([])
  const [copyOriginalSingleImg, setCopyOriginalSingleImg ] = useState<any[]>([])

  
 

  const handleOnChange = async(file: FieldValues) => {
    const selectedFiles = file?.fileList;
    const newSelected = await Promise.all(
            selectedFiles.map(async(file:any)=>{
                let url = file?.url || file?.originFileObj
                if(file.id && file.action !=='delete' ){
                  return{
                        name: file.name,
                        id: file.id,
                        action : 'keep',
                        url :url,
                        thumbUrl : await generateFileReader(url)
                  }
                }else if(file.id && file.action ==='delete' ){
                  return{
                    name: file.name,
                    id: file.id,
                    action : 'delete',
                    url :url,
                    thumbUrl : await generateFileReader(url)
                   }
                }else{
                  return{
                    name: file.name,
                    action : multiple? 'add' : copyOriginalSingleImg?.length === 0 ? "add":'replace',
                    id:!multiple && copyOriginalSingleImg?.length >0 ? copyOriginalSingleImg[0]?.id : null,
                    url :url,
                    thumbUrl : await generateFileReader(url)
                  }
                }  
              })
    )

    if(selectedFiles && selectedFiles.length>0){
      setFileLists(newSelected);
    }
    return false;
  };
const handleRemoveFile = (file:FieldValues) => {
  if(multiple){
    if(file?.url instanceof File){
      setFileLists(fileLists.filter((fileList)=>fileList.uid !== file.uid)) 
      return;
    }
    if(typeof file?.url === 'string'){
      setFileLists((prev)=>{
        const list = prev.map((itemList)=>{
          if (itemList?.uid === file?.uid ) {
            return {
              ...itemList,
              action :'delete'
            };
          }
          return itemList;
  
        })
        return list
       })
       return;
    }
  }else{
    if(file?.url instanceof File ){
      if(copyOriginalSingleImg.length > 0){
        setFileLists(copyOriginalSingleImg)
      }else{
        setFileLists(fileLists.filter((fileList)=>fileList.uid !== file.uid)) 
      }
    }
    if(typeof file?.url === "string"){
      setFileLists((file)=>{
        const list = file.map((f)=>{
            return{
              ...f,
              action:'delete'
            }
        })
        return list;
      })
    }
  }
}


useEffect(()=>{
     if (!multiple) {
          setValue( name,fileLists[0])
      } else {
           setValue( name,fileLists)
      }
},[handleRemoveFile])
  //set images from database ===> defaultValues
  useEffect(() => {
    if(watcheImgs){
    const isImgsArry = Array.isArray(watcheImgs) ? watcheImgs : [watcheImgs]
    isImgsArry.forEach((_,index)=>{
          if(isImgsArry[index]?.url){
            const processedImages = isImgsArry.map((img,index)=> ({
              name: !multiple ? `Event Image Banner`: `Event attachments ${index+1}`,
              url: img?.url,
              action: 'keep' as const,
              id: img?.id,
            }));
            if(fileLists.length === 0 ){
                 setFileLists(processedImages)
                 if(!multiple){
                  setCopyOriginalSingleImg(processedImages)
                 }
            }

          }else {
            setFileLists([])
          }
    })
    }
  }, [watcheImgs]);

  const handleClick = (e:React.MouseEvent<SVGElement>,file: {url: string | File}) => {
    e.preventDefault()
    e.stopPropagation();
    const url = file.url
    const finalUrl = typeof url === 'string' 
      ? url 
      : URL.createObjectURL(url);
    
    window.open(finalUrl, '_blank');
  };

  return (
      <>
              <Upload
                listType="picture"
                name={name}
                id={name}
                showUploadList={{
                  showRemoveIcon: false,
                  showPreviewIcon: false,
                }}
                fileList={fileLists}
                accept={accept}
                maxCount={multiple ? undefined : 1}
                multiple={true}
                onChange={(compyFileLists)=>{
                  handleOnChange(compyFileLists)
                }}
                beforeUpload={(file) => {
                  return false;
                }}
                 itemRender={(originNode, file) => {
                  return null
                 }}
                onPreview={(file)=>{
                  return null;

                }}
                className="!bg-transparent  flex flex-col"
              >
                  
                  <SmoothBtn htmlType="button" childrenStyle="flex-center gap-2  flex-grow" btnStyle="hover:!bg-transparent w-full !py-5 mb-4" >
                          <>
                            <FiUploadCloud className="block text-2xl" />
                            <span className="font-light">upload {label.value}</span>
                          </>
                  </SmoothBtn>
                   {
                        fileLists?.map((file,index)=>{
                          //url image 
                          const fileUrl = typeof file.url === "string" ? file.url : file.thumbUrl 
                          const isCloudinaryUrl = typeof fileUrl === 'string' && fileUrl.includes('cloudinary.com');  
                          if(file.action === 'delete') return null;
                          return(
                          <div 
                            key={`${file.name}-${index}`}
                            className={`relative w-full flex justify-between items-center border border-white p-5 rounded-xl mb-3
                                        hover:!bg-white  hover:cursor-pointer hover:scale-110
                                        transition-transform duration-400 ease-in-out group
                            `}
                            onClick={(e)=>{
                              e.preventDefault()
                              e.stopPropagation();
                            }}
                          >
                            <div className="flex items-center gap-2 group">
                                <LazyImgWithBlur src={fileUrl}   preview={true} classNameImg="w-[70px] h-[70px]" imgStyle="object-contain" alt={`event-attchment-${index}`}  />
                                <span className={`group-hover:text-blue-500`}>
                                      {file.name}
                                </span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <RiDeleteBin6Line
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation();
                                      handleRemoveFile(file);
                                    }}
                                    className="cursor-pointer group-hover:fill-blue-500"
                                />
                                {/* <FaEye  
                                    className="cursor-pointer group-hover:fill-blue-500" 
                                    onClick={(e:React.MouseEvent<SVGElement>)=>handleClick(e,file)}
                                /> */}
                            </div>
                          </div>
                          )
                        })
                    }

              
              </Upload>

       </>
  );
}



