import { Card, DatePicker, Form, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Table from '~/components/table';
import { DateFormat } from '~/constants/const';
import { generatePriceToVND } from '~/utils/helper';

type Props = {
    newDataPaymentChecking: any;
    setDate: any;
};
const PaymentTracking = ({ newDataPaymentChecking, setDate }: Props) => {
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
            render: (newTotalAmout) => {
                return <>{generatePriceToVND(+newTotalAmout)}</>;
            },
        },
    ];
    return (
        <div>
            <Card title='Theo dõi thanh toán' bordered={true}>
                <Row gutter={[8, 8]}>
                    <Form.Item label={<>Tháng/Năm</>} colon={false} name='date'>
                        <DatePicker
                            picker='month'
                            onChange={(e: any) =>
                                setDate(moment(e).format(DateFormat.DATE_M_Y))
                            }
                            defaultValue={moment()}
                            clearIcon={null}
                            format={DateFormat.DATE_M_Y}
                        />
                    </Form.Item>
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
