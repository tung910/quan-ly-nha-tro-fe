import {
    Button,
    Collapse,
    DatePicker,
    PageHeader,
    Space,
    Typography,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listCalculator, paymentMoneyVNPay } from '~/api/calculator.api';
import { STATUS_CODE } from '~/types/Api-Response.type';
import { generatePriceToVND, useGetParam } from '~/utils/helper';

const { Title } = Typography;
const { Panel } = Collapse;

const History = () => {
    const [paymentHistory, setPaymentHistory] = useState<any>([]);
    const [responseCode] = useGetParam('vnp_ResponseCode');
    useEffect(() => {
        const handleFetchData = async () => {
            const currentRoom = JSON.parse(
                localStorage.getItem('currentRoom') || ''
            );
            const { data } = await listCalculator('', currentRoom);
            setPaymentHistory(data);
        };
        handleFetchData();
    }, []);
    useEffect(() => {
        if (responseCode === STATUS_CODE.VNPAY_RESPONSE) {
            console.log(responseCode);
        }
    }, [responseCode]);
    const handlePayment = async (payment: any) => {
        const value = {
            amount: +payment.totalAmount,
            bankCode: '',
            orderInfo: `Phòng ${payment.motelRoomId.roomName} thanh toán tiến trọ tháng ${payment.month}/${payment.year}`,
            orderType: 'billpayment',
        };
        const { data } = await paymentMoneyVNPay(value);
        window.location = data;
    };

    return (
        <div>
            <PageHeader title='Lịch sử thanh toán' />
            <DatePicker
                picker='year'
                defaultValue={moment()}
                clearIcon={false}
            />
            <Space direction='vertical' style={{ width: '100%' }}>
                {paymentHistory.length > 0 &&
                    paymentHistory.map((item: any, index: number) => (
                        <Collapse collapsible='header' key={index}>
                            <Panel
                                key={index}
                                header={
                                    <Title level={5} style={{ color: 'white' }}>
                                        Tháng {item.month}/{item.year}
                                    </Title>
                                }
                                style={{
                                    backgroundColor: item.paymentStatus
                                        ? 'green'
                                        : 'red',
                                }}
                            >
                                <p>
                                    Người đại diện: <b>{item.payer}</b>
                                </p>
                                <table
                                    style={{ width: '100%' }}
                                    border={1}
                                    cellPadding={2}
                                >
                                    <thead>
                                        <tr>
                                            <th>TT</th>
                                            <th>Tên</th>
                                            <th>Số điện sử dụng</th>
                                            <th>Số nước sử dụng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                Thanh toán tiền phòng{' '}
                                                {item.motelRoomId.roomName}
                                            </td>
                                            <td>
                                                {item.dataPowerID.useValue}*
                                                {generatePriceToVND(
                                                    item.dataWaterID.price
                                                )}
                                            </td>
                                            <td>
                                                {' '}
                                                {item.dataWaterID.useValue}*
                                                {generatePriceToVND(
                                                    item.dataWaterID.price
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h3>
                                    Tổng tiền phải thanh toán:{' '}
                                    {generatePriceToVND(item.totalAmount)}
                                </h3>
                                <h3>
                                    Đã thanh toán:{' '}
                                    {generatePriceToVND(item.payAmount)}
                                </h3>
                                <h3>
                                    Còn lại:{' '}
                                    {generatePriceToVND(item.remainAmount)}
                                </h3>
                                {!item.paymentStatus && (
                                    <Button
                                        type='primary'
                                        onClick={() => handlePayment(item)}
                                    >
                                        Thanh toán
                                    </Button>
                                )}
                            </Panel>
                        </Collapse>
                    ))}
            </Space>
        </div>
    );
};

export default History;
