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
import { useEffect, useRef, useState } from 'react';
import {
    listCalculator,
    paymentMoney,
    paymentMoneyVNPay,
    sendEmailPayment,
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
    const [orderId] = useGetParam('vnp_TxnRef');
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
                note: `Anh/Ch??? ${user.name} ???? thanh to??n b???ng ph????ng th???c ${cardType}`,
                remainAmount: 0,
                paymentStatus: true,
            };
            if (orderInfo.split('=')[1]) {
                paymentMoney(data, orderInfo.split('=')[1]).then(async () => {
                    const payload = {
                        email: user.email,
                        name: user.name,
                        roomName: orderInfo.split('_')[0],
                        payer: user.name,
                        payType: cardType,
                        priceRoom: generatePriceToVND(+amount),
                        date:
                            moment(Date.now()).format('M') +
                            '/' +
                            moment(Date.now()).format('Y'),
                        orderId,
                    };
                    await sendEmailPayment(payload);
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
            orderInfo: `${payment.motelID.name}-${payment.motelRoomId.roomName} _thanh to??n ti???n tr??? th??ng ${payment.month}/${payment.year} v???i m?? thanh to??n=${payment._id} `,
            orderType: 'billpayment',
        };
        const { data } = await paymentMoneyVNPay(value);
        dispatch(setIsLoading(false));
        window.location = data;
    };

    return (
        <div>
            <PageHeader title='L???ch s??? thanh to??n' />
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
                                        Th??ng {item.month}/{item.year}
                                    </Title>
                                }
                                style={{
                                    backgroundColor: item.paymentStatus
                                        ? 'green'
                                        : 'red',
                                }}
                            >
                                <p>
                                    Ng?????i ?????i di???n: <b>{item.payer}</b>
                                </p>
                                <table
                                    style={{ width: '100%' }}
                                    border={1}
                                    cellPadding={2}
                                >
                                    <thead>
                                        <tr>
                                            <th>TT</th>
                                            <th>T??n</th>
                                            <th>S??? ??i???n s??? d???ng</th>
                                            <th>S??? n?????c s??? d???ng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                Thanh to??n ti???n ph??ng{' '}
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
                                    T???ng ti???n ph???i thanh to??n:{' '}
                                    {generatePriceToVND(item.totalAmount)}
                                </h3>
                                <h3>
                                    ???? thanh to??n:{' '}
                                    {generatePriceToVND(item.payAmount)}
                                </h3>
                                <h3>
                                    C??n l???i:{' '}
                                    {generatePriceToVND(item.remainAmount)}
                                </h3>
                                {!item.paymentStatus && (
                                    <Button
                                        type='primary'
                                        onClick={() => handlePayment(item)}
                                    >
                                        Thanh to??n
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
