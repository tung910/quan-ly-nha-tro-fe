import { Button, Card, Col, DatePicker, Row, Statistic, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import moment from 'moment';
const { RangePicker } = DatePicker;
import { useState } from 'react';
const dateFormat = 'YYYY/MM/DD';
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

const index = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const rowSelection = {
        selectedRowKeys,
    };
    return (
        <div>
            <div className='site-layout-background' style={{ padding: 24 }}>
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
        </div>
    );
};

export default index;
