import { Card, Button, Row, Col } from 'antd';
import {
    EditOutlined,
    PlusSquareOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';

export interface Props {
    roomName?: ReactNode | string;
    unitPrice?: string;
    totalCustomer?: string;
}
const cx = classNames.bind(styles);
const CardItem = ({ unitPrice, totalCustomer, roomName }: Props) => {
    return (
        <Card
            className={cx('card-item')}
            title={roomName}
            hoverable
            extra={<a href='#'>Xem chi tiết</a>}
        >
            <Col span={8}>
                <Button type='primary' icon={<PlusSquareOutlined />}>
                    <Link to='/customer/create' style={{ color: 'white' }}>
                        Thêm khách
                    </Link>
                </Button>
            </Col>
            <p>Số lượng khách: {totalCustomer}</p>
            <p>Giá phòng: {unitPrice}</p>
            <Row>
                <Col span={12}>
                    <Button type='primary' icon={<EditOutlined />}>
                        Sửa
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type='primary' icon={<DeleteOutlined />} danger>
                        Xóa
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default CardItem;
