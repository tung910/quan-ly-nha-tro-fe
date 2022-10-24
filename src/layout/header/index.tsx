import {
    BellOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { Badge, Button, Dropdown, Layout, Menu } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { logOut } from '~/feature/user/userSlice';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

const { Header: HeaderAntd } = Layout;

interface HeaderProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
    const { user }: any = useAppSelector((state) => {
        return state.user;
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            dispatch(logOut());
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
                <QuestionCircleOutlined
                    style={{ fontSize: 18, marginRight: 20 }}
                />
                <Badge count={99} style={{ marginRight: 20 }}>
                    <BellOutlined style={{ fontSize: 18, marginRight: 20 }} />
                </Badge>
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
