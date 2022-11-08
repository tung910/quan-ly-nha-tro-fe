import { Card } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import Table from '~/components/table';
import { generatePriceToVND } from '~/utils/helper';

const columnsOweRoomFees: ColumnsType = [
    {
        title: 'Nhà',
        dataIndex: ['motelID', 'name'],
        key: 'motelID',
    },
    {
        title: 'Phòng',
        dataIndex: ['roomRentalDetailID', 'roomName'],
        key: 'roomRentalDetailID',
    },
    {
        title: 'Khách',
        dataIndex: 'payer',
        key: 'payer',
    },
    {
        title: 'Tháng',
        dataIndex: 'month',
        key: 'month',
    },
    {
        title: 'Số tiền (VNĐ)',
        dataIndex: 'remainAmount',
        key: 'remainAmount',
        render: (remainAmount: any) => {
            return <>{generatePriceToVND(remainAmount)}</>;
        },
    },
];

type Props = {
    dataOwe: any;
};
const OweRoomFees = ({ dataOwe }: Props) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const data = dataOwe.filter((item: any) => item.remainAmount !== 0);
        setDataSource(data);
    }, [dataOwe]);

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
