"use client"
import { useRouter } from "next/navigation"
import { useEvent } from "./queries/use-event"
import { formatDate } from "@/frontend/shared/lib/utils/format-date"
import { usePopup } from "@/frontend/shared/context/PopupContext"
import { useEffect, useState } from "react"
import { TEventTable } from "../types/event-table.types"
import SmoothBtn from "@/frontend/shared/components/ui/SmoothBtn"
import { Key} from 'antd/es/table/interface';




export const useEventTableData = () => {
    const router = useRouter()
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);


    const { data: EventData } = useEvent();
    const { showPopup, popupStates } = usePopup()
     //handleDelete
     const handleDelete = () => {
      showPopup("delete",{data:{id: selectedRowKeys}})
      // setSelectedRowKeys([])
     }
    //handleUpdate
    const handleUpdate = (id: number, slug:string) => {
      router.push(`/events/${id}_${slug}/edit`)
    }
    //handle details 
    const handleDetails = (id:number,slug:string) => {
      router.push(`/events/${id}_${slug}`)
    }
    // handle select row
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedKeys: Key[]) => {
        setSelectedRowKeys(selectedKeys); 
      },
      getCheckboxProps: (record: TEventTable) => ({
        'aria-label': `Select event: ${record.title || record.id}`,
        'aria-describedby': `event-${record.id}-description`,
        name: `event-${record.id}-checkbox`,
        role: 'checkbox',
        'aria-checked': selectedRowKeys.includes(record.id),
      }),
      columnTitle: (
        <div className="sr-only">
          <span id="select-all-label">Select all events</span>
        </div>
      ),
      columnWidth: 60,
      fixed: true,
    };
    //handle select row
    const handleRowClick = (record: TEventTable ) => {
      return {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          const isSelected = selectedRowKeys.includes(record.id);
          const target = event.target as HTMLElement;
          const isButton = 
            target.tagName === 'BUTTON' ||
            target.closest('button') !== null ||
            target.closest('.ant-btn') !== null ||
            target.closest('.ant-dropdown-trigger') !== null ||
            target.closest('[role="button"]') !== null;
          
          if (isButton ) {
            event.stopPropagation(); 
            if (!isSelected) {
              setSelectedRowKeys(prev => [...prev, record.id]);
            }
            return; 
          }
          if (isSelected) {
            setSelectedRowKeys(prev => prev.filter(key => key !== record.id));
          } else {
            setSelectedRowKeys(prev => [...prev, record.id]);
          }
        },
      };
    };


    

     useEffect(()=>{
      if(selectedRowKeys.length > 0 && popupStates['delete']?.open ){
        handleDelete()
      }
     },[selectedRowKeys])

    //table data
    const data =  EventData?.data?.map((item)=>({
        id:item.id,
        key: item.id,
        title:item.title,
        location: `${item.venue}, ${item.location}`,
        date:
           <div className="flex flex-col gap-2">
             <span> start date: {formatDate(item.startDate)} </span>
             <span>end date: {formatDate(item.endDate)}</span>
           </div>,
        "booked seats": item.bookedSeats ? item.bookedSeats : 0,  
        options : 
                 <div className="flex items-center gap-2 justify-center">
                   {
                     [
                       {
                         id:1,
                         title:'Edit',
                         onClick: ()=> handleUpdate(item?.id,item?.slug),
                         hoverColor:'btn-hover-primary',
                         titleStyle:"text-gradient-primary text-xl"
                       },
                       {
                        id:2,
                        title:'Details',
                        onClick: () => handleDetails(item?.id, item?.slug),
                        hoverColor:'btn-hover-reset',
                      },
                        {
                          id:3,
                          title:'Delete',
                          onClick: handleDelete,
                          hoverColor:'btn-hover-delete',
                       },
                   
                      ].map((btn)=>(
                          <SmoothBtn 
                             type="text"
                             key={btn.id}
                             htmlType="button"
                             title={btn.title}
                             titleStyle={btn?.titleStyle}
                             hoverColor={btn?.hoverColor}
                             btnStyle="normal-btn"
                             onClick={ btn.onClick }
                         />
                      ))
    
                   }
                 </div>
    }))
  

    return { data, rowSelection , handleRowClick };
}
