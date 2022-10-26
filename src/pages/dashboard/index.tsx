import { Col, Form, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { getStatisticalRoomStatus } from '~/api/room.api';
import { IStatistical } from '~/types/Statistical.type';
import AvailableRooms from './AvailableRooms';
import styles from './Dasboard.module.scss';
import ExpiresContract from './ExpiresContract';
import OweRoomFees from './OweRoomFees';
import Revenue from './Revenue';
import RoomStatus from './RoomStatus';
import PaymentTracking from './Paymenttracking';

const cx = classNames.bind(styles);
export interface StateRoomStatus {
    areRenting: IStatistical | null;
    emptyRooms: IStatistical | null;
}
const Dashboard = () => {
    const [state, setState] = useState<StateRoomStatus>({
        areRenting: null,
        emptyRooms: null,
    });
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
                        <PaymentTracking />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Dashboard;
