import { Card } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Table from '~/components/table';
import { useState } from 'react';
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
                />
            </Card>
        </div>
    );
};

export default ExpiresContract;
