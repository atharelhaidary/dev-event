"use client"
import { Table } from 'antd';
import { columns } from '../../config/event-table-columns.config';
import {  useEventTableHeight ,useEventTableData} from '../../hooks';



const EventTable = () => {

  const { tableHeight } = useEventTableHeight()
  const { handleRowClick,rowSelection, data:evetData } = useEventTableData()
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(1);

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
                  // pageSize: pageSize,
                  // onChange: setCurrentPage,
                  total:evetData?.length,
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