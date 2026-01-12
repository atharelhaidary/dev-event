"use client"
import { Table } from 'antd';
import { columns } from '../../config/event-table-columns.config';
import {  useEventTableHeight , useEventTableData} from '../../hooks';



const EventTable = () => {

  const { tableHeight } = useEventTableHeight()
  const { handleRowClick,rowSelection, data } = useEventTableData()

   return(
        <Table 
                id="events-table"
                rowKey="id"
                columns={columns}
                dataSource={data}
                className="ant-table custom-table my-scrollbar"
                rowSelection={ rowSelection }
                onRow={ handleRowClick }
                // rowClassName={(record : TEventTable ) => 
                //   selectedRowKeys.includes(record.id) ? 'selected' : ''
                // }
                scroll={{ x: 'max-content', y: tableHeight  }}
                size="large" 
                bordered={false}
                aria-label="Events management table"
                // role="table"
                aria-describedby="table-description"
                pagination={{
                  // placement: ['bottomCenter'],
                  responsive: true,
                  itemRender: (current, type, originalElement) => {
                    if (type === 'prev') {
                      return <a className="font-medium !bg-table-head !px-7 rounded-lg !text-white !py-2 mr-10">← Previous</a>;
                    }
                    if (type === 'next') {
                      return <a className="font-medium   !bg-table-head !px-7 rounded-lg !text-white !py-2 ml-10">Next →</a>;
                    }
                    if (type === 'page') {
                      return <a >{current}</a>;
                    }
                    return originalElement;
                  },
                  // showSizeChanger: true,
                  // showQuickJumper: true,
                }} 
         /> 
   )      

}
export default EventTable;