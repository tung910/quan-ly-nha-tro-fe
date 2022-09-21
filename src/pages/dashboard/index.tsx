import { Col, Form, Row } from 'antd';
import Revenue from './Revenue';
import RoomStatus from './RoomStatus';
import styles from './Dasboard.module.scss';
import classNames from 'classnames/bind';
import AvailableRooms from './AvailableRooms';
import OweRoomFees from './OweRoomFees';
import UnfinishedWork from './UnfinishedWork';
import ExpiresContract from './ExpiresContract';

const cx = classNames.bind(styles);

const Dashboard = () => {
    return (
        <div>
            <Form autoComplete='off' style={{ marginTop: 20, padding: 20 }}>
                {/* Row 1 */}
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <RoomStatus />
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
                        <UnfinishedWork />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Dashboard;
