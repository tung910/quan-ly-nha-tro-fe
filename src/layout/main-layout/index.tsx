import styles from './Dashboard.module.scss';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Navbar from '../navbar';
import { Outlet } from 'react-router-dom';
const cx = classNames.bind(styles);

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sider
                theme='light'
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <Navbar />
            </Sider>
            <Layout>
                <Header className={cx('header')} style={{ padding: 0 }}>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: cx('trigger'),
                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                </Header>
                <Content
                    className={cx('wrapper')}
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '100vh',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
