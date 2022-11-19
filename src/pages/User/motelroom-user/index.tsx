import { Button, PageHeader } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { getRoomDetailByEmail } from '~/api/customer.api';
import { getUserById } from '~/api/user.api';
import { useAppSelector } from '~/app/hooks';
import styles from './MotelRoomUser.module.scss';

const cx = classNames.bind(styles);
const UserMotelRoom = () => {
    const user = useAppSelector((state: any) => state.user.user);
    const [dataUser, setDataUser] = useState<any>({});
    useEffect(() => {
        const handleGetData = async () => {
            const payload = {
                email: user.email,
            };
            const { data } = await getRoomDetailByEmail(payload);
            const currentRoom = JSON.stringify(data.motelRoomID);
            localStorage.setItem('currentRoom', currentRoom);

            const getUser = async () => {
                const { data } = await getUserById(user._id);
                setDataUser(data);
            };
            getUser();
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

            <div style={{ fontWeight: 'bold' }}>
                <p>Nhà: {dataUser.user?.motelRoomID.motelID.name}</p>
                <p>Phòng: {dataUser.user?.motelRoomID.roomName}</p>
                <p>Số điện sử dụng: {dataUser.power?.useValue} số</p>
                <p>Số nước sử dụng: {dataUser.water?.useValue} khối</p>
            </div>
        </div>
    );
};

export default UserMotelRoom;
