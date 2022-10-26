import { Card, Button, DatePicker, Space, Row, Col, Form } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import Table from '~/components/table';
import moment from 'moment';
import { DateFormat } from '~/constants/const';

const PaymentTracking = () => {
    const [dataSource, setdataSource] = useState([]);
    // const getCloumFilterProps = (dataIndex: any): ColumnsType<any> => ({

    // });

    const columnsPaymentTracking: ColumnsType = [
        {
            title: 'Nội dung',
            key: '',
            dataIndex: '',
        },
        {
            title: 'Số hóa đơn',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Số tiền',
            dataIndex: '',
            key: '',
        },
    ];
    return (
        <div>
            <Card title='Theo dõi thanh toán' bordered={true}>
                <Row gutter={[8, 8]}>
                    <Col span={6}>
                        <Form.Item label={<>Tháng</>} colon={false}>
                            <DatePicker
                                picker='month'
                                onChange={(e: any) =>
                                    moment(e).format(DateFormat.DATE_M)
                                }
                                defaultValue={moment()}
                                format={DateFormat.DATE_M}
                                name='date'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={<>Năm</>} colon={false}>
                            <DatePicker
                                picker='year'
                                onChange={(e: any) =>
                                    moment(e).format(DateFormat.DATE_Y)
                                }
                                defaultValue={moment()}
                                format={DateFormat.DATE_Y}
                                name='date'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Table
                    dataSource={dataSource}
                    columns={columnsPaymentTracking}
                    rowKey='key'
                />
            </Card>
        </div>
    );
};

export default PaymentTracking;
