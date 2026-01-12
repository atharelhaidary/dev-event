import { FieldValues, useFieldArray, useForm, useWatch} from "react-hook-form";
import { useCallback, useEffect } from "react";
import { TAgendaItem, TCreateEvent } from "../types/event.types";

type TuseEventFormProps = {
  event?: TCreateEvent
}
 export const useEventForm = ({event}:TuseEventFormProps) => {
    const methods = useForm<FieldValues>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        shouldUnregister: false
      });
    const { control, getValues, setError, reset , setValue, formState: { errors }  } = methods
   
    const agendaItems = useWatch({ control, name: "agenda" });
    console.log('agenda',agendaItems)
    //tags array
    const { fields: tagsFields, remove: removeTag, append: appendTag } = useFieldArray({
        control,
        name: "tags" ,
      });
      //agenda array
      const { fields: agendaFields, remove: removeAgenda , append: appendAgenda, update: updateAgenda} = useFieldArray({
        control,
        name: "agenda",
        // shouldUnregister: true,
      });
//add new tag
 const handleAppendTag = async () => {
    const tags = getValues("tags")
    const lastTag = tags[tags.length - 1];

    if(!lastTag || lastTag.trim() === "" ){
      setError(`tags.[${tags.length-1}]`, {
        type: "manual",
        message: "⛔ Please fill in the current tag first before adding a new one"
      });
      return;
    }
    appendTag("")
  }
   //add new agenda
  const handleAppendAgenda = useCallback(()=>{
     const specificAgenda  = agendaItems[agendaItems.length-1] as TAgendaItem
     if(!specificAgenda || Object.values(specificAgenda).some((val :string)=>!val || val.trim() === "")) {
           Object.entries(specificAgenda).forEach(([key, value]) => {
             if (!value || value.trim() === "") {
               setError(`agenda.${agendaItems.length-1}.${key}`, {
                 type: "manual", 
                 message: `⛔ Please enter ${key.replace('-', ' ')} first before adding a new one`
               });
             }
           });
         return;
     }
     appendAgenda({sessionSpeaker:"",sessionTitle:"",startTime:"",endTime:""})
  },[agendaItems])
  //reset agenda
   const handleResetAgenda = (index : number) => {
    updateAgenda(index, {
      sessionSpeaker: "",
      sessionTitle: "", 
      startTime: "",
      endTime: ""
    });
  }
 
    //  initial values
     useEffect(()=>{
        reset({
          title: '',
          overview: '',
          startDate: '',
          endDate: '',
          venue: '',
          location: '',
          mode: '',
          organizer: '',
          description: '',
          tags: [''] ,
          image:{
            url:'',
            id:'',
            action:'',
          },
          attachments:[{
            url:'',
            id:'',
            action:'',
          }
        ],
          agenda: [{
            sessionSpeaker: "",
            sessionTitle: "", 
            startTime: "",
            endTime: "",
          }],
        })
  
      },[reset])
      //get specific event
      useEffect(() => {
        if (event) {
          const { _id, createdAt, updatedAt, __v, ...eventData } = event;
      
          reset({
            ...eventData,
            tags: eventData?.tags.length ? eventData?.tags : [""],
            agenda: eventData.agenda?.length
              ? eventData.agenda
              : [{
                  sessionSpeaker: "",
                  sessionTitle: "",
                  startTime: "",
                  endTime: "",
                }],
          });
        }
      }, [event, reset]);
  return {
    // methods
    methods,
    control,
    
    // tags
    tagsFields,
    appendTag,
    removeTag,
    handleAppendTag,
    
    // agenda
    agendaFields,
    agendaItems,
    appendAgenda,
    removeAgenda,
    updateAgenda,
    handleAppendAgenda,
    handleResetAgenda,
  };
}






