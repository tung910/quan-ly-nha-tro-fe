import { Card } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import Table from '~/components/table';
const columnsExpiresContract: ColumnsType = [
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
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Ngày hết hạn',
        dataIndex: 'expiresDate',
        key: 'expiresDate',
    },
];

const ExpiresContract = () => {
    const [dataSource, setdataSource] = useState([]);
    return (
        <div>
            <Card title='Danh sách phòng trống' bordered={true}>
                <Table
                    dataSource={dataSource}
                    columns={columnsExpiresContract}
                    rowKey='key'
                />
            </Card>
        </div>
    );
};

export default ExpiresContract;
