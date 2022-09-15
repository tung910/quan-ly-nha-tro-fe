import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SearchOutlined,
    QuestionCircleOutlined,
    BellOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Image, Layout, Menu } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

const { Header: HeaderAntd } = Layout;

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://www.antgroup.com'
                    >
                        Thông tin tài khoản
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://www.antgroup.com'
                    >
                        Đổi mật khẩu
                    </a>
                ),
            },
            {
                key: '3',
                label: (
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://www.antgroup.com'
                    >
                        Đăng xuất
                    </a>
                ),
            },
        ]}
    />
);
interface HeaderProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
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
                    <Avatar
                        style={{ marginLeft: 20 }}
                        src={
                            <Image
                                src='https://joeschmoe.io/api/v1/random'
                                style={{ width: 32 }}
                            />
                        }
                    />
                </Dropdown>
                <span style={{ marginRight: 20, textAlign: 'center' }}>
                    Nguyễn Xuân Tường
                </span>
            </div>
        </HeaderAntd>
    );
};

export default Header;
