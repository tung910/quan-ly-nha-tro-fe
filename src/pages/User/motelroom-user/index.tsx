import { Button, PageHeader } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect } from 'react';
import { getRoomDetailByEmail } from '~/api/customer.api';
import { useAppSelector } from '~/app/hooks';
import Table from '~/components/table';

const columns: ColumnsType = [
    {
        title: 'Nhà',
        dataIndex: '',
        key: '',
    },
    {
        title: 'Phòng',
        dataIndex: 'roomName',
        key: 'roomName',
    },
    {
        title: 'Tiền phòng',
        dataIndex: '',
        key: '',
    },
    {
        title: 'Chỉ số điện',
        dataIndex: '',
        key: '',
    },
    {
        title: 'Chỉ số nước',
        dataIndex: '',
        key: '',
    },
];
const UserMotelRoom = () => {
    const user = useAppSelector((state: any) => state.user.user);

    useEffect(() => {
        const handleGetData = async () => {
            const payload = {
                email: user.email,
            };
            const { data } = await getRoomDetailByEmail(payload);
            const currentRoom = JSON.stringify(data.motelRoomID);
            localStorage.setItem('currentRoom', currentRoom);
        };
        handleGetData();
    }, [user.email]);

    return (
        <div>
            <div>
                <PageHeader
                    ghost={true}
                    title='Thông tin nhà trọ đang ở'
                    extra={[
                        <Button key={1} type='primary'>
                            Trả phòng
                        </Button>,
                    ]}
                />
            </div>

            <div>
                <Table columns={columns as ColumnsType} dataSource={[]} />
            </div>
        </div>
    );
};

export default UserMotelRoom;
