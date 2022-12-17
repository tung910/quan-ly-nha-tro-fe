import { Layout } from 'antd';
import classNames from 'classnames/bind';
import React, { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header';
import Navbar from '../navbar';
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
                collapsed={collapsed}
                className={cx('slider-menu')}
            >
                <Navbar />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                ></Header>
                <Content className={cx('wrapper')}>
                    <Suspense fallback={<>loading...</>}>
                        <Outlet />
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
