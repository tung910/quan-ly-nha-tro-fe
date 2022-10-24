import { Card } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Table from '~/components/table';

const columnsAvailableRooms: ColumnsType = [
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
];

const dataSource = [
    {
        key: '1',
        idhouse: 'Tầng 1',
        idroom: 2,
    },
    {
        key: '2',
        idhouse: 'Tầng 1',
        idroom: 3,
    },
    {
        key: '3',
        idhouse: 'Tầng 1',
        idroom: 4,
    },
    {
        key: '4',
        idhouse: 'Tầng 1',
        idroom: 5,
    },
];

const AvailableRooms = () => {
    return (
        <div>
            <Card title='Danh sách phòng trống' bordered={true}>
                <Table
                    dataSource={dataSource}
                    columns={columnsAvailableRooms}
                    rowKey='key'
                />
            </Card>
        </div>
    );
};

export default AvailableRooms;
