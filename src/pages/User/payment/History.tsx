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
import { listCalculator } from '~/api/calculator.api';
import { generatePriceToVND } from '~/utils/helper';

const { Title } = Typography;
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const History = () => {
    const [paymentHistory, setPaymentHistory] = useState<any>([]);
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
                                    <Button type='primary'>Thanh toán</Button>
                                )}
                            </Panel>
                        </Collapse>
                    ))}
            </Space>
        </div>
    );
};

export default History;