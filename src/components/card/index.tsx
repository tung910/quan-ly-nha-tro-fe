import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusSquareOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { RoomType } from '~/types/RoomType';
import { generatePriceToVND } from '~/utils/helper';

import styles from './Card.module.scss';

export interface Props {
    room: RoomType;
    onClick: any;
}
const cx = classNames.bind(styles);
const CardItem = ({ onClick, room }: Props) => {
    const { unitPrice, maxPerson, roomName, isRent, customerName } = room;
    return (
        <Card
            className={cx(`card-item`)}
            title={roomName}
            hoverable
            style={isRent ? { background: '#ffc53d' } : {}}
        >
            <p>Số lượng khách tối đa: {maxPerson}</p>
            <p>Giá phòng: {generatePriceToVND(unitPrice)}</p>
            <Row gutter={16}>
                <Col>
                    <Button>Đổi</Button>
                </Col>
                <Col>
                    <Button
                        type='primary'
                        icon={<EyeOutlined />}
                        onClick={() => onClick(room)}
                    >
                        Xem chi tiết
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default CardItem;
