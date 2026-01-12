"use client"
import { FieldValues, FormProvider } from "react-hook-form";
import { FormField } from "../../../shared/components/global-form/ui/FormField";
import GlobalForm from "../../../shared/components/global-form/GlobalForm";
import { title ,overview  ,venue, location,mode,tags,organizer,description, speaker, sessionTitle, startTime, endTime, startDate, endDate, image, attachments} from "../config/event-form-fields.config";
import SmoothBtn from "../../../shared/components/ui/SmoothBtn";
import { useCreateEvent, useUpdateEvent, useEventForm } from "../hooks";
import { usePopup } from "@/frontend/shared/context/PopupContext";
import { TCreateEvent } from "../types/event.types";
import React from "react";
import { generateFormData } from "../../../shared/lib/utils/generate-form-data";
import { generateDbImg } from "../lib/generate-db-img";
import { FaRegWindowMinimize } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";



type TCreateEventProps = {
  event?:TCreateEvent
}

export default function CreateEvent ({event}:TCreateEventProps){
  const { showPopup } = usePopup()
   const {
    methods,
    tagsFields,
    agendaFields,
    agendaItems,
    handleAppendTag,
    handleAppendAgenda,
    handleResetAgenda,
    removeTag,
    removeAgenda,
  } = useEventForm({event});
    const { setError, formState: {errors} } = methods;
   const { mutate : createNewEevent } = useCreateEvent({setError})
   const { mutate : updateEvent } = useUpdateEvent({setError})
    //add mew event 
    const createEvent =  (data:  FieldValues ) => {
      const formData = new FormData()
      showPopup("loading")
      const formDataResult = generateFormData(formData,{
                              ...data,
                              attachments : generateDbImg(data.attachments),
                              image : generateDbImg(data.image)
                            });
      event ?  updateEvent(formDataResult) : createNewEevent(formDataResult)
    }
    return ( 
            <FormProvider {...methods} >
                        <GlobalForm
                          formLayoutStyle="vertical"
                          formClassName="!w-[90%] h-full flex flex-col gap-3  justify-center items-center"
                          onSubmit={createEvent}
                          submit = {
                            {
                              text:"save event",
                              class:"!w-[99%]",
                              icon: <p>+</p>
                            }
                          }
                            
                          >
                                {/* title */}
                                <FormField config={title} />
                                {/* overview */}
                                <FormField config={overview} />
                                {/* data */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">  
                                      {/* startDate */}
                                      <FormField config={startDate}/>
                                      {/* endDate */}
                                       <FormField config={endDate} />
                                </div>
                                {/* venue */}
                                <FormField config={venue}/>
                                {/* location */}
                                <FormField config={location}/>
                                 {/* image */}
                               <FormField config= {image}  />
                                {/* attachments */}
                                <FormField config={attachments} />
                                {/* mode */}
                                <FormField config={mode}/>
                                {/* organizer */}
                                <FormField config={organizer}/>
                                {/* tags */}
                                {tagsFields.map((field, index) => (
                                  <div className={`flex w-full items-center gap-4  relative`} key={field.id}>
                                    <FormField 
                                        config= {{
                                          ...tags,
                                          config : {
                                            ...tags.config,
                                            name:`tags.[${index}]`
                                          }
                                        }}
                                      
                                    />
                                    <div className={`flex gap-3  h-full  `}>
                                          { index > 0 &&  <SmoothBtn htmlType="button" title="remove tag"  titleStyle="sr-only" children={<FaRegWindowMinimize size={13}/>}   btnStyle="btn-delete  !rounded-full !w-fit !p-2 "  hoverColor="btn-hover-delete" childrenStyle="hover:!text-white !p-0 -ml-2 -mt-2"    onClick={()=>removeTag(index)}/> }
                                            <SmoothBtn htmlType="button" title="add tag" titleStyle="sr-only" children={<FiPlus size={15}/>} btnStyle="!rounded-full !w-9 !p-2 hover:!bg-transparent" childrenStyle="hover:!text-white !p-0 -ml-2 "  onClick={handleAppendTag}/>
                                    </div>
                                  </div>
                                ))}
                                {/* description */}
                                <FormField config={description} />
                                {/* agenda */}
                                  <div className="relative w-full p-6 rounded-xl border-[1px] border-white flex flex-col  items-end justify-end">
                                      {
                                      agendaFields.map((field,index)=>(
                                          <React.Fragment key={field.id}>
                                                {/* fields */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                                            {/* speaker */}
                                                            <FormField
                                                              config={{
                                                                ...speaker,
                                                                config : {
                                                                  ...speaker.config,
                                                                  name: `agenda.[${index}].sessionSpeaker`,
                                                                  label:{value:`Speaker ${index+1}`}
                                                                }
                                                              }}
                                                            />
                                                            {/* sesion title */}
                                                            <FormField
                                                              config={{
                                                                ...sessionTitle,
                                                                config : {
                                                                  ...sessionTitle.config,
                                                                  name: `agenda.[${index}].sessionTitle`,
                                                                  label:{
                                                                    value:`Session title ${index+1}`,
                                                                  }
                                                                  
                                                                }
                                                              }}
                                                            />
                                                            {/* start time */}
                                                            <FormField
                                                              config={{
                                                                ...startTime,
                                                                config : {
                                                                  ...startTime.config,
                                                                  name: `agenda.[${index}].startTime`,
                                                                }
                                                              }}
                                                            />
                                                            {/* end time */}
                                                            <FormField
                                                              config={{
                                                                ...endTime,
                                                                config : {
                                                                  ...endTime.config,
                                                                  name: `agenda.[${index}].endTime`,
                                                                }
                                                              }}
                                                            />
                                                </div>
                                                {/* btns */}
                                                <div className="grid grid-cols-1 md:grid-cols-3  pb-5  gap-3 " dir="rtl">
                                                  { index > 0 && <SmoothBtn htmlType="button" title="remove session" btnStyle="btn-delete" titleStyle="hover:!text-white"  hoverColor="btn-hover-delete"  onClick={()=>removeAgenda(index)}/> } 
                                                  { agendaItems[index] && Object.values(agendaItems[index]).some((val:any)=> val.length > 0) && <SmoothBtn htmlType="button" title="reset session" btnStyle="bth-reset" titleStyle="hover:!text-white"  hoverColor="btn-hover-reset"  onClick={()=>handleResetAgenda(index)}/>}
                                                  <SmoothBtn htmlType="button" title="add session" btnStyle="hover:!bg-transparent" onClick={handleAppendAgenda}/>
                                                </div>
                                                {index < agendaFields.length - 1 && (
                                                      <div className="w-full h-[2px] bg-primary mb-8"/>
                                                )}
                                          </React.Fragment>
                                        ))
                                      }
                                    <span className="absolute -top-3 left-4 bg-[#182830] px-2 text-white text-lg">Agenda</span>
                                  </div>
                        </GlobalForm>
            </FormProvider>
     
    )
}















  