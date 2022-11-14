import {
    BellOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
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
import { getNotifications } from '~/api/notification.api';
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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleGetNotifications = async () => {
            const { data } = await getNotifications();
            setNotifications(data);
        };
        handleGetNotifications();
    }, []);

    const handleLogOut = async () => {
        try {
            dispatch(logOut());
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            //
        }
    };

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: <Button type='text'>Thông tin tài khoản</Button>,
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
                <Menu.Item
                    key={index}
                    icon={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                >
                    <div className={cx('noti')}>
                        <Text strong>{item.userId.email}</Text>
                        <div
                            className={cx('description')}
                        >{`Muốn đổi phòng từ phòng ${item.detail?.currentRoom?.roomName} sang phòng ${item.detail?.newRoom?.roomName}`}</div>
                        {!item.isSeen && (
                            <Button type='primary'>Chấp nhận</Button>
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
                <SearchOutlined style={{ fontSize: 18, marginRight: 20 }} />
                <Dropdown overlay={notificationList} placement={'bottomRight'}>
                    <Badge
                        count={notifications.length}
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
