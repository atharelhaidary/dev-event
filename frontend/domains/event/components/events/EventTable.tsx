"use client"
import { Table } from 'antd';
import { columns } from '../../config/event-table-columns.config';
import {  useEventTableHeight ,useEventTableData} from '../../hooks';
import { usePagination } from '@/frontend/shared/context/PaginationContext';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';


const EventTable = () => {

  const { tableHeight } = useEventTableHeight()
  const { data : evetData , pagination,  rowSelection , handleRowClick  } = useEventTableData()
  const { currentPage, itemsPerPage , totalItems  } = pagination;
  const { page, setPage , pageSize , setPageSize} = usePagination();
  const pathname = usePathname();
  const router = useRouter();
  

   useEffect(()=>{
    if(page > 0){
        setPage(currentPage);
        router.replace(`${pathname}?page=${page}&limit=${pageSize}`)
    }
    if(pageSize > 0){
      setPageSize(itemsPerPage);
      router.replace(`${pathname}?page=${page}&limit=${pageSize}`)
    }
   },[page,pageSize])
   return(
        <Table 
                id="events-table"
                rowKey="id"
                columns={columns}
                dataSource={evetData}
                className="ant-table custom-table"
                rowSelection={ rowSelection }
                onRow={ handleRowClick }
                scroll={{ x: 'max-content',  y:tableHeight }}
                size="large" 
                bordered={false}
                aria-label="Events management table"
                // role="table"
                aria-describedby="table-description"
                pagination={{
                  placement: ['bottomCenter'],
                  current: page,
                  pageSize: pageSize,
                  onChange: (page)=>{setPage(page)},
                  total: totalItems,
                  showLessItems: true, 
                  showPrevNextJumpers: false,
                  responsive: true,
                  itemRender: (current, type, originalElement) => {
                    if (type === 'page') {
                        return <a className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">{current}</a>;
                    }
                    return originalElement;
                  },
                }} 
         /> 
   )      

}
export default EventTable;