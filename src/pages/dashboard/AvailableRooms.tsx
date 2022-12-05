import { Card } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import Table from '~/components/table';

const columnsAvailableRooms: ColumnsType = [
    {
        title: 'Nhà',
        dataIndex: ['motelID', 'name'],
        key: 'motelID',
    },
    {
        title: 'Phòng',
        dataIndex: 'roomName',
        key: 'roomName',
    },
];

type Props = {
    roomStatus: any;
};
const AvailableRooms = ({ roomStatus }: Props) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const result = roomStatus.emptyRooms;
        setDataSource(result);
    }, [roomStatus]);

    return (
        <div>
            <Card title='Danh sách phòng trống' bordered={true}>
                <Table
                    dataSource={dataSource}
                    columns={columnsAvailableRooms}
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </div>
    );
};

export default AvailableRooms;
