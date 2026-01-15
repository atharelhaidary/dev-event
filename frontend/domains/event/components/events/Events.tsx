"use client"
import EventTable from "./EventTable";
import { useEvent } from "../../hooks";
import Spinner from "@/frontend/shared/components/feedback/Spinner";
import ErrorComp from "@/frontend/shared/components/feedback/ErrorComp";
import EventsHeader from "./EventsHeader";
import EmptyEvents from "../empty-events/EmptyEvents";
import { Activity } from "react";



const Events =  () => {

    const { isLoading ,isError, error ,data } =  useEvent();
    const handleReload = () => {
        window.location.reload()
    }
    const events = data?.data
    return(
        <section className="flex flex-col flex-grow gap-4 global-container">
               {/* header */}
              <Activity mode={ isLoading || events && events.length > 0 ? "visible" :"hidden"}>
                   <EventsHeader/> 
               </Activity>
               {/* loading */}
               <Activity mode={isLoading ? "visible" :"hidden"}>
                  <Spinner />
               </Activity>
               {/* error */}
               <Activity mode={isError ? "visible" :"hidden"}>
                       <ErrorComp 
                            message={error?.response?.data?.message} 
                            onClick={handleReload}
                        />
               </Activity>
               {/* table */}
               <Activity mode={ events && events.length > 0 ? "visible" :"hidden"}>
                    <EventTable/> 
               </Activity>
                {/* empty events */}
                <Activity mode={ events && events.length === 0 ? "visible" :"hidden"}>
                     <EmptyEvents/>   
               </Activity>
        </section> 
    )
}
export default Events












// "use client"

// import { useEvent } from "../../hooks";
// import Spinner from "@/frontend/domains/shared/components/feedback/Spinner";
// import ErrorComp from "@/frontend/domains/shared/components/feedback/ErrorComp";
// import EventsHeader from "./EventsHeader";
// import EmptyEvents from "../empty-events/EmptyEvents";
// import EventTable from "./EventTable";

// // 🔧 Type Definition للبيانات
// interface EventData {
//   data?: Array<any>;
//   [key: string]: any;
// }

// const Events = () => {
//   const { isLoading, isError, error, data } = useEvent();
  
//   const handleReload = () => {
//     window.location.reload();
//   };

//   // 🔧 دالة مساعدة للتحقق من البيانات
//   const hasEvents = (eventData: EventData | undefined): boolean => {
//     return !!eventData?.data && eventData.data.length > 0;
//   };

//   // 🔧 دالة للحصول على عدد الأحداث
//   const getEventCount = (eventData: EventData | undefined): number => {
//     return eventData?.data?.length || 0;
//   };

//   // 🔧 تحديد حالة الصفحة
//   const getPageState = () => {
//     if (isLoading) return 'loading';
//     if (isError) return 'error';
//     if (!hasEvents(data)) return 'empty';
//     return 'success';
//   };

//   const pageState = getPageState();

//   return (
//     <section className="flex flex-col flex-grow gap-4">
//       {/* 🔥 Header يظهر فقط في حالات Loading و Success */}
//       {(pageState === 'loading' || pageState === 'success') && (
//         <EventsHeader 
//           eventCount={pageState === 'success' ? getEventCount(data) : undefined}
//           isLoading={pageState === 'loading'}
//         />
//       )}

//       {/* 🔄 Loading State */}
//       {pageState === 'loading' && (
//         <div className="flex flex-col items-center justify-center min-h-64">
//           <Spinner />
//           <p className="mt-3 text-gray-600">جاري تحميل الفعاليات...</p>
//         </div>
//       )}

//       {/* ❌ Error State */}
//       {pageState === 'error' && (
//         <ErrorComp 
//           message={error?.response?.data?.message || "حدث خطأ في تحميل البيانات"} 
//           onClick={handleReload}
//         />
//       )}

//       {/* 📭 Empty State */}
//       {pageState === 'empty' && <EmptyEvents />}

//       {/* ✅ Success State */}
//       {pageState === 'success' && data && <EventTable data={data.data} />}
//     </section>
//   );
// };

// export default Events;