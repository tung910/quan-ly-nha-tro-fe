/* eslint-disable no-duplicate-imports */
import './Dashboard.module.scss';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
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
    Input,
    Badge,
    Avatar,
    Image,
    DatePicker,
    Dropdown,
} from 'antd';
import React, { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

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
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8'),
    ]),
    getItem('Files', '9', <FileOutlined />),
];

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

const Dashboard: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const rowSelection = {
        selectedRowKeys,
    };
    return (
        <Layout style={{ width: '1500px' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className='logo'>
                    <p className='title-logo'>Nhà Trọ Vương Anh</p>
                </div>
                <Menu
                    theme='dark'
                    defaultSelectedKeys={['1']}
                    mode='inline'
                    items={items}
                />
            </Sider>
            <Layout className='site-layout'>
                <Header
                    className='site-layout-background'
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
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>UI_Admin</Breadcrumb.Item>
                        <Breadcrumb.Item className='tilte-sub'>
                            Dashboard
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className='site-layout-background'
                        style={{ padding: 24 }}
                    >
                        <div className='site-statistic-demo-card'>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title='Active'
                                            value={11.28}
                                            precision={2}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<ArrowUpOutlined />}
                                            suffix='%'
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title='Idle'
                                            value={9.3}
                                            precision={2}
                                            valueStyle={{ color: '#cf1322' }}
                                            prefix={<ArrowDownOutlined />}
                                            suffix='%'
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title='Idle'
                                            value={9.3}
                                            precision={2}
                                            valueStyle={{ color: '#cf1322' }}
                                            prefix={<ArrowDownOutlined />}
                                            suffix='%'
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title='Idle'
                                            value={9.3}
                                            precision={2}
                                            valueStyle={{ color: '#cf1322' }}
                                            prefix={<ArrowDownOutlined />}
                                            suffix='%'
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <div style={{ marginTop: '30px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div>
                                    <h2>Thống Kê Nhà Trọ</h2>
                                </div>
                                <div>
                                    <RangePicker
                                        style={{ display: 'flex' }}
                                        defaultValue={[
                                            moment('2015/01/01', dateFormat),
                                            moment('2015/01/01', dateFormat),
                                        ]}
                                        format={dateFormat}
                                    />
                                </div>
                            </div>
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={data}
                            />
                        </div>
                        <Button disabled type='primary'>
                            Xóa
                        </Button>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
