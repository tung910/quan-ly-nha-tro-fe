import { EyeOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Rate, Row } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { RoomType } from '~/types/RoomType';
import { generatePriceToVND } from '~/utils/helper';

import styles from './Card.module.scss';

export interface Props {
    room: RoomType;
    onClick: any;
}
const cx = classNames.bind(styles);
const CardItem = ({ onClick, room }: Props) => {
    const desc = ['1', '2', '3', '4', '5'];
    const { unitPrice, maxPerson, roomName, isRent, images, width, height } =
        room;
    const [value, setValue] = useState(3);
    return (
        <Card
            className={cx(`card-item`)}
            cover={
                <Image
                    loading='lazy'
                    width={'100%'}
                    height={'300px'}
                    style={{ objectFit: 'cover' }}
                    src={images[0]?.thumbUrl}
                    preview={false}
                />
            }
            hoverable
            style={isRent ? { background: '#ffc53d' } : {}}
        >
            <Row>
                <Col span={12}>
                    <p style={{ fontWeight: 'bold', fontSize: 18 }}>
                        <HomeOutlined /> {roomName}
                    </p>
                </Col>

                <Col span={12}>
                    <span style={{ fontWeight: 'bold' }}>Chiều dài: </span>{' '}
                    {width}m<sup>2</sup>
                    <br />
                    <span style={{ fontWeight: 'bold' }}>Chiều rộng:</span>{' '}
                    {height}m<sup>2</sup>
                </Col>
            </Row>
            <p
                style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'red',
                }}
            >
                {generatePriceToVND(unitPrice)}đ/Tháng
            </p>

            <p
                style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                }}
            >
                Số lượng khách: {maxPerson} người
            </p>
            <Row gutter={16}>
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
