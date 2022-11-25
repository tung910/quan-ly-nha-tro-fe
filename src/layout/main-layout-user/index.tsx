import { Layout } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header';
import Navbar from '../navbar';
import styles from './DashboardUser.module.scss';

const cx = classNames.bind(styles);
const { Content, Sider } = Layout;

const MainLayoutUser: React.FC = () => {
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
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayoutUser;
