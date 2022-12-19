import { Card } from 'antd';
import { memo, useEffect, useState } from 'react';
import { getAllAccount } from '~/api/auth.api';
import Table from '~/components/table';

type ColumnTypes = Exclude<any, undefined>;
const ExpiresContract = () => {
    const [listAccount, setListAccount] = useState([]);
    const ColumnsData: ColumnTypes[number][] = [
        {
            title: 'Nhà',
            dataIndex: ['motelRoomID', 'motelID', 'name'],
            key: 'name',
        },
        {
            title: 'Phòng',
            dataIndex: ['motelRoomID', 'roomName'],
            key: 'roomName',
        },
        {
            title: 'Khách thuê',
            dataIndex: ['name'],
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    useEffect(() => {
        const getAccount = async () => {
            const acc: any = [];
            const { data } = await getAllAccount();
            data.map((item: any) => {
                if (item.role === 0) {
                    acc.push(item);
                }
            });
            setListAccount(acc);
        };
        getAccount();
    }, []);
    return (
        <div>
            <Card title='Danh sách khách hàng' bordered={true}>
                <Table columns={ColumnsData} dataSource={listAccount} />
            </Card>
        </div>
    );
};

export default memo(ExpiresContract);
