import { Col, Form, Row } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { listCalculator } from '~/api/calculator.api';
import {
    getMonthlyRevenue,
    getPaymentChecking,
} from '~/api/revenue-statistics.api';
import { getStatisticalRoomStatus } from '~/api/room.api';
import { DateFormat } from '~/constants/const';
import { IMonthlyRevenue, IStatistical } from '~/types/Statistical.type';
import AvailableRooms from './AvailableRooms';
import styles from './Dasboard.module.scss';
import ExpiresContract from './ExpiresContract';
import OweRoomFees from './OweRoomFees';
import PaymentTracking from './Paymenttracking';
import Revenue from './Revenue';
import RoomStatus from './RoomStatus';

const cx = classNames.bind(styles);
export interface StateRoomStatus {
    areRenting: IStatistical | null;
    emptyRooms: IStatistical | null;
}

const initialSate = {
    totalBill: 0,
    totalBillPaid: 0,
    totalBillUnpaid: 0,
    totalPaymentAmount: 0,
    totalPaymentUnpaid: 0,
};

const Dashboard = () => {
    const [state, setState] = useState<StateRoomStatus>({
        areRenting: null,
        emptyRooms: null,
    });
    const [monthlyRevenue, setMonthlyRevenue] = useState<IMonthlyRevenue[]>([]);
    const [monthYearMonthlyRevenue, setYearMonthlyRevenue] = useState(
        moment(Date()).format(DateFormat.DATE_Y)
    );

    const [payment, setPayment] = useState<any>({});
    const [dataOwe, setDataOwe] = useState<any>({});
    const [date, setDate] = useState(
        moment(Date()).format(DateFormat.DATE_M_Y)
    );

    const [month, setMonth] = useState(
        moment().month(new Date().getMonth()).format(DateFormat.DATE_M)
    );

    const onChangeYearMonthlyRevenue = (date: any, year: string) => {
        setYearMonthlyRevenue(year);
    };

    useEffect(() => {
        const handleGetData = async () => {
            const res = await Promise.all([getStatisticalRoomStatus()]);
            const [statisticalRoomStatus] = res;
            const { data: statisticalRoomStatusValue } = statisticalRoomStatus;
            const [areRenting, emptyRooms] = statisticalRoomStatusValue;

            setState({
                areRenting,
                emptyRooms,
            });
        };
        handleGetData();
    }, []);

    useEffect(() => {
        const handleGetMonthlyRevenue = async () => {
            const { data: monthlyRevenueValue } = await getMonthlyRevenue({
                data: { year: monthYearMonthlyRevenue },
            });
            setMonthlyRevenue(monthlyRevenueValue);
        };
        handleGetMonthlyRevenue();
    }, [monthYearMonthlyRevenue]);

    useEffect(() => {
        const getDataPaymentChecking = async () => {
            const { data } = await getPaymentChecking({ date });
            if (data) {
                setPayment(data);
            } else {
                setPayment(initialSate);
            }
        };
        getDataPaymentChecking();
    }, [date]);

    useEffect(() => {
        const getDataListOweRoomFees = async () => {
            const { data } = await listCalculator({ month });
            setDataOwe(data);
        };

        getDataListOweRoomFees();
    }, [month]);

    return (
        <div>
            <Form autoComplete='off' style={{ marginTop: 20, padding: 20 }}>
                {/* Row 1 */}
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        {state.areRenting && state.emptyRooms && (
                            <RoomStatus roomStatus={state} />
                        )}
                    </Col>
                    <Col span={16}>
                        <Revenue
                            monthlyRevenue={monthlyRevenue}
                            monthYearMonthlyRevenue={monthYearMonthlyRevenue}
                            onChangeYearMonthlyRevenue={
                                onChangeYearMonthlyRevenue
                            }
                        />
                    </Col>
                </Row>
                {/* Row 2 */}
                <Row gutter={[16, 16]} className={cx('row')}>
                    <Col span={12}>
                        {payment && Object.keys(payment).length > 0 && (
                            <PaymentTracking
                                setDate={setDate}
                                newDataPaymentChecking={payment}
                            />
                        )}
                    </Col>
                    <Col span={12}>
                        {dataOwe && <OweRoomFees dataOwe={dataOwe} />}
                    </Col>
                </Row>
                {/* Row 3 */}
                <Row gutter={[16, 16]} className={cx('row')}>
                    <Col span={12}>
                        {state.emptyRooms && (
                            <AvailableRooms roomStatus={state.emptyRooms} />
                        )}
                    </Col>
                    <Col span={12}>
                        <ExpiresContract />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Dashboard;
