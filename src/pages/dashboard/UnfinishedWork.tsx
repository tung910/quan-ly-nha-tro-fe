import { Card } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Table from '~/components/table';
import { useState } from 'react';
const columnsUnfinishedWork: ColumnsType = [
    {
        title: 'Ngày',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Nhà',
        dataIndex: 'idhouse',
        key: 'idhouse',
    },
    {
        title: 'Phòng',
        dataIndex: 'idroom',
        key: 'idroom',
    },
    {
        title: 'Nội dung',
        dataIndex: 'document',
        key: 'document',
    },
];

const UnfinishedWork = () => {
    const [dataSource, setdataSource] = useState([]);
    return (
        <div>
            <Card title='Danh sách phòng trống' bordered={true}>
                <Table
                    dataSource={dataSource}
                    columns={columnsUnfinishedWork}
                />
            </Card>
        </div>
    );
};

export default UnfinishedWork;
