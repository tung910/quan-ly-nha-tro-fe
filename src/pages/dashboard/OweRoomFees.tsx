import { Card } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Table from '~/components/table';

const columnsOweRoomFees: ColumnsType = [
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
        title: 'Khách',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tháng',
        dataIndex: 'month',
        key: 'month',
    },
    {
        title: 'Số tiền (VNĐ)',
        dataIndex: 'money',
        key: 'money',
    },
];

const dataSource = [
    {
        key: '1',
        idhouse: 'Tầng 1',
        idroom: 2,
        name: 'Nguyễn Xuân Tường',
        month: '',
        money: 530000,
    },
];

const OweRoomFees = () => {
    return (
        <div>
            <Card title='Danh sách khách nợ tiền phòng' bordered={true}>
                <Table
                    dataSource={dataSource}
                    columns={columnsOweRoomFees}
                    rowKey='key'
                />
            </Card>
        </div>
    );
};

export default OweRoomFees;
