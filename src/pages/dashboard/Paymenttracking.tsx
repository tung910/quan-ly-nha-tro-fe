import { Card, Col, DatePicker, Form, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Table from '~/components/table';
import { DateFormat } from '~/constants/const';

type Props = {
    newDataPaymentChecking: any;
    setYear: any;
    setMonth: any;
};
const PaymentTracking = ({
    newDataPaymentChecking,
    setYear,
    setMonth,
}: Props) => {
    const [dataSource, setdataSource] = useState([]);
    useEffect(() => {
        const array: any = [];

        array.push({
            title: 'Tổng số hóa đơn đã thanh toán',
            newTotalBill: newDataPaymentChecking?.totalBillPaid,
            newTotalAmout: newDataPaymentChecking?.totalPaymentAmount,
        });

        array.push({
            title: 'Tổng số hóa đơn chưa thanh toán',
            newTotalBill: newDataPaymentChecking?.totalBillUnpaid,
            newTotalAmout: newDataPaymentChecking?.totalPaymentUnpaid,
        });

        setdataSource(array);
    }, [newDataPaymentChecking]);

    const columnsPaymentTracking: ColumnsType = [
        {
            title: 'Nội dung',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Số hóa đơn',
            dataIndex: 'newTotalBill',
            key: 'newTotalBill',
        },
        {
            title: 'Số tiền',
            dataIndex: 'newTotalAmout',
            key: 'newTotalAmout',
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
                                    setMonth(
                                        moment(e).format(DateFormat.DATE_M)
                                    )
                                }
                                defaultValue={moment().month(
                                    new Date().getMonth()
                                )}
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
                                    setYear(moment(e).format(DateFormat.DATE_Y))
                                }
                                defaultValue={moment().year(
                                    new Date().getFullYear()
                                )}
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
