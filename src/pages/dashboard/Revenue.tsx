/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Col, DatePicker, Form, Row } from 'antd';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import moment from 'moment';
import { memo, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { DateFormat } from '~/constants/const';
import { IMonthlyRevenue } from '~/types/Statistical.type';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
interface Props {
    monthlyRevenue: Omit<IMonthlyRevenue, '_id'>[];
    monthYearMonthlyRevenue: string;
    onChangeYearMonthlyRevenue:
        | ((value: moment.Moment | null, dateString: string) => void)
        | undefined;
}

const Revenue = (props: Props) => {
    const {
        monthlyRevenue,
        monthYearMonthlyRevenue,
        onChangeYearMonthlyRevenue,
    } = props;
    const revenueForTheMonth = useMemo(
        () =>
            [
                { month: '1', value: 0 },
                { month: '2', value: 0 },
                { month: '3', value: 0 },
                { month: '4', value: 0 },
                { month: '5', value: 0 },
                { month: '6', value: 0 },
                { month: '7', value: 0 },
                { month: '8', value: 0 },
                { month: '9', value: 0 },
                { month: '10', value: 0 },
                { month: '11', value: 0 },
                { month: '12', value: 0 },
            ].map((item) => {
                const isExit = monthlyRevenue.find((a) => {
                    return item.month === a.month && a;
                });
                if (isExit) {
                    item.value = isExit.totalPaymentAmount;
                } else {
                    item.value = 0;
                }
                return item;
            }),
        [monthlyRevenue]
    );
    const unpaidInTheMonth = useMemo(
        () =>
            [
                { month: '1', value: 0 },
                { month: '2', value: 0 },
                { month: '3', value: 0 },
                { month: '4', value: 0 },
                { month: '5', value: 0 },
                { month: '6', value: 0 },
                { month: '7', value: 0 },
                { month: '8', value: 0 },
                { month: '9', value: 0 },
                { month: '10', value: 0 },
                { month: '11', value: 0 },
                { month: '12', value: 0 },
            ].map((item) => {
                const isExit = monthlyRevenue.find((a) => {
                    return item.month === a.month && a;
                });
                if (isExit) {
                    item.value = isExit.totalPaymentUnpaid;
                } else {
                    item.value = 0;
                }
                return item;
            }),
        [monthlyRevenue]
    );
    const chartData = useMemo(
        () => ({
            labels: [...revenueForTheMonth.map((a) => `Tháng ${a.month}`)],
            datasets: [
                {
                    label: 'Doanh thu tháng (VNĐ)',
                    data: [...revenueForTheMonth.map((a) => a.value)],
                    backgroundColor: '#1890ff',
                },
                {
                    label: 'Chưa thanh toán trong tháng (VNĐ)',
                    data: [...unpaidInTheMonth.map((a) => a.value)],
                    backgroundColor: '#f5222d',
                },
            ],
        }),
        [revenueForTheMonth, revenueForTheMonth, unpaidInTheMonth]
    );

    return (
        <Card title='Doanh thu hàng tháng (VNĐ)' bordered={true}>
            <Row gutter={[8, 8]}>
                <Col span={6}>
                    <Form.Item
                        label={<>Năm</>}
                        colon={false}
                        initialValue={moment(new Date())}
                    >
                        <DatePicker
                            picker='year'
                            onChange={onChangeYearMonthlyRevenue}
                            format={DateFormat.DATE_Y}
                            allowClear={false}
                            defaultValue={moment(new Date(), DateFormat.DATE_Y)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Bar data={chartData} />
        </Card>
    );
};

export default memo(Revenue);
