import { Card } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { memo, useEffect, useState } from 'react';
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
        dataIndex: ['roomRentalDetailID', 'customerName'],
        key: 'customerName',
    },
    {
        title: 'Tháng',
        dataIndex: 'month',
        key: 'month',
    },
    {
        title: 'Số tiền (VND)',
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
        if (dataOwe.length > 0) {
            const data = dataOwe?.filter(
                (item: any) => item.remainAmount !== 0
            );
            setDataSource(data);
        } else {
            setDataSource([]);
        }
        //
    }, [dataOwe]);

    return (
        <div>
            <Card title='Danh sách khách nợ tiền phòng' bordered={true}>
                <Table
                    dataSource={dataSource}
                    columns={columnsOweRoomFees}
                    rowKey='_id'
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </div>
    );
};

export default memo(OweRoomFees);
