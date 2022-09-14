import styles from './Dashboard.module.scss';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
    BellOutlined,
} from '@ant-design/icons';
import {
    MenuProps,
    Button,
    Table,
    Breadcrumb,
    Layout,
    Menu,
    Card,
    Col,
    Row,
    Statistic,
    Badge,
    Avatar,
    Image,
    DatePicker,
    Dropdown,
} from 'antd';
import React, { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import classNames from 'classnames/bind';
import Navbar from '../navbar';
import { Outlet } from 'react-router-dom';
const cx = classNames.bind(styles);

const { Header, Content, Footer, Sider } = Layout;

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Action',
        dataIndex: '',
        render: () => <Button type='primary'>Xem chi tiết</Button>,
    },
];
const data: DataType[] = [];
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

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

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const rowSelection = {
        selectedRowKeys,
    };
    return (
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Navbar />
            </Sider>
            <Layout className={cx('site-layout')}>
                <Header
                    className={cx('site-layout-background')}
                    style={{ padding: 0, textAlign: 'right' }}
                >
                    <SearchOutlined style={{ fontSize: 18, marginRight: 20 }} />
                    <QuestionCircleOutlined
                        style={{ fontSize: 18, marginRight: 20 }}
                    />
                    <Badge count={99} style={{ marginRight: 20 }}>
                        <BellOutlined
                            style={{ fontSize: 18, marginRight: 20 }}
                        />
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
                </Header>
                <Content style={{ margin: '0 16px', minHeight: '100vh' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>UI_Admin</Breadcrumb.Item>
                        <Breadcrumb.Item className='tilte-sub'>
                            Dashboard
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <div>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
