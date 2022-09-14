import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Navbar from '../navbar';
import Header from '../header';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);
const { Content, Sider } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sider
                theme='light'
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100%',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Navbar />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                ></Header>
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
