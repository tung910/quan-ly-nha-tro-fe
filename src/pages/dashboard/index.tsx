import { Col, Form, Row } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getPaymentChecking } from '~/api/revenue-statistics.api';
import { getStatisticalRoomStatus } from '~/api/room.api';
import { DateFormat } from '~/constants/const';
import { IStatistical } from '~/types/Statistical.type';
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

    const [payment, setPayment] = useState<any>({});
    const [month, setMonth] = useState(
        moment().month(new Date().getMonth()).format(DateFormat.DATE_M)
    );

    const [year, setYear] = useState(
        moment().year(new Date().getFullYear()).format(DateFormat.DATE_Y)
    );

    useEffect(() => {
        const fetchStatisticalRoom = async () => {
            const { data } = await getStatisticalRoomStatus();
            const [areRenting, emptyRooms] = data;
            setState({
                areRenting,
                emptyRooms,
            });
        };
        fetchStatisticalRoom();
    }, []);

    useEffect(() => {
        const getDataPaymentChecking = async () => {
            const { data } = await getPaymentChecking({ month, year });
            if (data) {
                setPayment(data);
            } else {
                setPayment(initialSate);
            }
        };
        getDataPaymentChecking();
    }, [month]);

    return (
        <div>
            <Form autoComplete='off' style={{ marginTop: 20, padding: 20 }}>
                {/* Row 1 */}
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        {state.areRenting && state.emptyRooms && (
                            <RoomStatus roomStatus={state} />
                        )}
                    </Col>
                    <Col span={12}>
                        <Revenue />
                    </Col>
                </Row>
                {/* Row 2 */}
                <Row gutter={[16, 16]} className={cx('row')}>
                    <Col span={12}>
                        <AvailableRooms />
                    </Col>
                    <Col span={12}>
                        <OweRoomFees />
                    </Col>
                </Row>
                {/* Row 3 */}
                <Row gutter={[16, 16]} className={cx('row')}>
                    <Col span={12}>
                        <ExpiresContract />
                    </Col>
                    <Col span={12}>
                        {payment && Object.keys(payment).length > 0 && (
                            <PaymentTracking
                                setMonth={setMonth}
                                setYear={setYear}
                                newDataPaymentChecking={payment}
                            />
                        )}
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Dashboard;
