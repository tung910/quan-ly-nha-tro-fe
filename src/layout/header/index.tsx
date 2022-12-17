import {
    BellOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Badge,
    Button,
    Dropdown,
    Layout,
    Menu,
    Typography,
} from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    addOrUpdateNotification,
    getNotifications,
} from '~/api/notification.api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { logOut } from '~/feature/user/userSlice';
import { IUser } from '~/types/User.type';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const { Text } = Typography;
const { Header: HeaderAntd } = Layout;

interface HeaderProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
    const { user }: any = useAppSelector((state) => state.user);
    const [notifications, setNotifications] = useState<IUser[]>([]);
    const [notificationLength, setNotificationLength] = useState<number | null>(
        null
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = user?.role === 1 ? '' : user._id;
    const handleNavigate = (path: string) => {
        const url = user?.role === 1 ? path : '/user' + path;
        navigate(url);
    };

    useEffect(() => {
        const handleGetNotifications = async () => {
            let url = '';
            if (userId) {
                url = 'category=ChangeRoom&userId=' + userId;
            }
            const { data } = await getNotifications(url);
            setNotifications(data);
        };
        handleGetNotifications();
    }, [userId]);

    useEffect(() => {
        setNotificationLength(
            notifications.filter((noti: any) => !noti.isSeen && noti).length
        );
    }, [notifications]);

    const handleLogOut = async () => {
        try {
            dispatch(logOut());
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            //
        }
    };
    const handleAccess = async (value: any) => {
        const data = {
            isUpdate: true,
            notificationId: value._id,
            detail: {
                ...value.detail,
                access: true,
                currentRoom: value.detail.currentRoom,
                newRoom: value.detail.newRoom,
            },
        };
        await addOrUpdateNotification(data);
    };

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Button
                            type='text'
                            onClick={() => handleNavigate('/profile')}
                        >
                            Thông tin tài khoản
                        </Button>
                    ),
                },
                {
                    key: '2',
                    label: <Button type='text'>Đổi mật khẩu</Button>,
                },
                {
                    key: '3',
                    label: (
                        <Button type='text' onClick={handleLogOut}>
                            Đăng xuất
                        </Button>
                    ),
                },
            ]}
        />
    );
    const notificationList = (
        <Menu>
            {notifications.map((item: any, index) => (
                <Menu.Item key={index} icon={<Avatar src={user.avatar} />}>
                    <div className={cx('noti')}>
                        <Text strong>{item?.userId?.email}</Text>
                        <div
                            className={cx('description')}
                        >{`Muốn đổi phòng từ phòng ${item.detail?.currentRoom?.roomName} sang phòng ${item.detail?.newRoom?.roomName}`}</div>
                        {!item.isSeen && !userId && (
                            <Button
                                type='primary'
                                onClick={() => handleAccess(item)}
                            >
                                Chấp nhận
                            </Button>
                        )}
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <HeaderAntd className={cx('header')}>
            {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                    className: cx('trigger'),
                    onClick: () => setCollapsed(!collapsed),
                }
            )}
            <div>
                <Dropdown overlay={notificationList} placement={'bottomRight'}>
                    <Badge
                        count={notificationLength}
                        style={{ marginRight: 20 }}
                    >
                        <BellOutlined
                            style={{ fontSize: 18, marginRight: 20 }}
                        />
                    </Badge>
                </Dropdown>
                <Dropdown overlay={menu}>
                    <span style={{ marginRight: 20, textAlign: 'center' }}>
                        {user.name}
                    </span>
                </Dropdown>
            </div>
        </HeaderAntd>
    );
};

export default Header;
