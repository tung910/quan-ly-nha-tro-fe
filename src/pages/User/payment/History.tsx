/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
    listCalculator,
    paymentMoney,
    paymentMoneyVNPay,
} from '~/api/calculator.api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import notification from '~/components/notification';
import { NotificationType } from '~/constants/const';
import { setIsLoading } from '~/feature/service/appSlice';
import { STATUS_CODE, STATUS_CODE_VNPAY } from '~/types/Api-Response.type';
import { convertDate, generatePriceToVND, useGetParam } from '~/utils/helper';

const { Title } = Typography;
const { Panel } = Collapse;

const History = () => {
    const [paymentHistory, setPaymentHistory] = useState<any>([]);
    const [responseCode] = useGetParam('vnp_ResponseCode');
    const [orderInfo] = useGetParam('vnp_OrderInfo');
    const [amount] = useGetParam('vnp_Amount');
    const [cardType] = useGetParam('vnp_CardType');
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setIsLoading(true));
        const handleFetchData = async () => {
            const currentRoom = JSON.parse(
                localStorage.getItem('currentRoom') || ''
            );
            const { data } = await listCalculator('', currentRoom);
            setPaymentHistory(data);
        };
        handleFetchData();
        dispatch(setIsLoading(false));
    }, []);
    const handleCheckResCodeVnp = (code: string) => {
        const CODE_VNPAY = [...Object.keys(STATUS_CODE_VNPAY)];
        return CODE_VNPAY.find((vnp) => {
            return vnp.split('_').join('') === code && vnp;
        });
    };

    useEffect(() => {
        dispatch(setIsLoading(true));
        if (!responseCode) {
            dispatch(setIsLoading(false));
            return;
        }
        if (responseCode === STATUS_CODE.VNPAY_RESPONSE) {
            const data = {
                dateOfPayment: convertDate(Date.now()),
                month: moment(Date.now()).format('M'),
                payAmount: amount,
                payer: user.name,
                note: `Anh/Chị ${user.name} đã thanh toán bằng phương thức ${cardType}`,
                remainAmount: 0,
                paymentStatus: true,
            };
            if (orderInfo.split('=')[1]) {
                paymentMoney(data, orderInfo.split('=')[1]).then(async () => {
                    await notification({
                        message: STATUS_CODE_VNPAY['0_0'],
                    });
                    const currentRoom = JSON.parse(
                        localStorage.getItem('currentRoom') || ''
                    );
                    const { data } = await listCalculator('', currentRoom);
                    setPaymentHistory(data);
                    dispatch(setIsLoading(false));
                });
            }
            return;
        }
        const message = handleCheckResCodeVnp(responseCode);
        if (!message) {
            dispatch(setIsLoading(false));
            return;
        }
        const code = { ...STATUS_CODE_VNPAY } as any;
        dispatch(setIsLoading(false));
        notification({
            message: code[message],
            type: NotificationType.ERROR,
        });
        return () => {
            //
        };
    }, [responseCode]);

    const handlePayment = async (payment: any) => {
        dispatch(setIsLoading(true));
        const value = {
            amount: +payment.totalAmount / 100,
            bankCode: '',
            orderInfo: `${payment.motelRoomId.roomName} thanh toán tiến trọ tháng ${payment.month}/${payment.year} với mã thanh toán=${payment._id} `,
            orderType: 'billpayment',
        };
        const { data } = await paymentMoneyVNPay(value);
        dispatch(setIsLoading(false));
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
