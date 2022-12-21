import { Card, DatePicker, Form, Modal, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import { detailPaymentHistory } from '~/api/calculator.api';
import Table from '~/components/table';
import { DateFormat } from '~/constants/const';
import { generatePriceToVND } from '~/utils/helper';

type Props = {
    newDataPaymentChecking: any;
    setDate: any;
};
const PaymentTracking = ({ newDataPaymentChecking, setDate }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setdataSource] = useState([]);
    const [dataPayment, setdataPayment] = useState<any>([]);

    useEffect(() => {
        const array: any = [];

        array.push({
            title: 'Tổng số hóa đơn đã thanh toán',
            newTotalBill: newDataPaymentChecking?.totalBillPaid,
            newTotalAmout: newDataPaymentChecking?.totalPaymentAmount,
            paymentStatus: true,
        });

        array.push({
            title: 'Tổng số hóa đơn chưa thanh toán',
            newTotalBill: newDataPaymentChecking?.totalBillUnpaid,
            newTotalAmout: newDataPaymentChecking?.totalPaymentUnpaid,
            paymentStatus: false,
        });

        setdataSource(array);
    }, [newDataPaymentChecking]);
    const onDetailPaymentHistory = async (paymentStatus: any) => {
        const { data } = await detailPaymentHistory({
            month: newDataPaymentChecking.month,
            year: newDataPaymentChecking.year,
            paymentStatus,
        });
        setdataPayment(data);

        setIsModalOpen(true);
    };
    const columnsPaymentHistory: ColumnsType = [
        {
            title: 'Nhà',
            dataIndex: ['motelID', 'name'],
            key: 'name',
        },
        {
            title: 'Phòng',
            dataIndex: ['roomRentalDetailID', 'roomName'],
            key: 'roomName',
        },
        {
            title: 'Khách thuê',
            dataIndex: ['roomRentalDetailID', 'customerName'],
            key: 'customerName',
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (totalAmount: number) => {
                return <>{generatePriceToVND(+totalAmount)}</>;
            },
        },
    ];
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
        {
            title: '',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (paymentStatus) => (
                <a onClick={() => onDetailPaymentHistory(paymentStatus)}>Xem</a>
            ),
        },
    ];

    return (
        <div>
            <Card title='Theo dõi thanh toán' bordered={true}>
                <Row gutter={[8, 8]}>
                    <Form>
                        <Form.Item
                            label={<>Tháng/Năm</>}
                            colon={false}
                            name='date'
                            initialValue={moment()}
                        >
                            <DatePicker
                                picker='month'
                                onChange={(e: any) => {
                                    setDate(
                                        moment(e).format(DateFormat.DATE_M_Y)
                                    );
                                }}
                                clearIcon={null}
                                format={DateFormat.DATE_M_Y}
                            />
                        </Form.Item>
                    </Form>
                </Row>
                <Table
                    dataSource={dataSource}
                    columns={columnsPaymentTracking}
                    rowKey='title'
                />
            </Card>
            <Modal
                open={isModalOpen}
                title='Chi tiết'
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={1000}
            >
                <Table
                    dataSource={dataPayment}
                    columns={columnsPaymentHistory}
                    rowKey='title'
                />
            </Modal>
        </div>
    );
};

export default memo(PaymentTracking);
