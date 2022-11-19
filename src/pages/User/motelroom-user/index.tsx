import { CloseOutlined, PhoneFilled, UserOutlined } from '@ant-design/icons';
import { Button, Col, Image, PageHeader, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoomDetailByEmail } from '~/api/customer.api';
import { getUserById } from '~/api/user.api';
import { useAppSelector } from '~/app/hooks';

import styles from './MotelRoomUser.module.scss';

const cx = classNames.bind(styles);
const UserMotelRoom = () => {
    const user = useAppSelector((state: any) => state.user.user);
    const [dataUser, setDataUser] = useState<any>({});
    useEffect(() => {
        const handleGetData = async () => {
            const payload = {
                email: user.email,
            };
            const { data } = await getRoomDetailByEmail(payload);
            const currentRoom = JSON.stringify(data.motelRoomID);
            localStorage.setItem('currentRoom', currentRoom);

            const getUser = async () => {
                const { data } = await getUserById(user._id);
                setDataUser(data);
            };
            getUser();
        };
        handleGetData();
    }, [user.email]);

    return (
        <div>
            <div>
                <PageHeader
                    ghost={true}
                    title='Thông tin nhà trọ đang ở'
                    extra={[
                        <Button key={1} type='primary'>
                            Trả phòng
                        </Button>,
                    ]}
                />
            </div>

            <div className={cx('content')}>
                <Row>
                    <Col>
                        <div className={cx('image-left')}>
                            <Image
                                width={600}
                                height={380}
                                src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                                alt='Ảnh'
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className={cx('image-right')}>
                            <Row>
                                <Col
                                    style={{
                                        marginRight: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Image
                                        width={280}
                                        height={180}
                                        src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                                        alt='Ảnh'
                                    />
                                </Col>
                                <Col
                                    style={{
                                        marginLeft: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Image
                                        width={280}
                                        height={180}
                                        src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                                        alt='Ảnh'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    style={{
                                        marginRight: 10,
                                        marginTop: 10,
                                    }}
                                >
                                    <Image
                                        width={280}
                                        height={180}
                                        src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                                        alt='Ảnh'
                                    />
                                </Col>
                                <Col
                                    style={{
                                        marginLeft: 10,
                                        marginTop: 10,
                                    }}
                                >
                                    <Image
                                        width={280}
                                        height={180}
                                        src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                                        alt='Ảnh'
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={cx('cart-left')}>
                            <Row style={{ width: '100%' }}>
                                <div className={cx('sticker')}>
                                    {/* <div style={{ color: 'rgb(5, 161, 62)' }}>
                                    <CheckOutlined /> Đã thanh toán
                                </div> */}
                                    <div style={{ color: 'rgb(221, 13, 13)' }}>
                                        <CloseOutlined /> Chưa thanh toán
                                    </div>
                                </div>
                            </Row>
                            <hr />
                            <div style={{ fontWeight: 'bold' }}>
                                <p>
                                    Nhà:{' '}
                                    {dataUser.user?.motelRoomID.motelID.name}
                                </p>
                                <p>
                                    Phòng: {dataUser.user?.motelRoomID.roomName}
                                </p>
                                <p>
                                    Số điện sử dụng: {dataUser.power?.useValue}{' '}
                                    số
                                </p>
                                <p>
                                    Số nước sử dụng: {dataUser.water?.useValue}{' '}
                                    khối
                                </p>
                                <div style={{ textAlign: 'right' }}>
                                    <Button type='primary'>
                                        Thanh toán VNpay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className={cx('cart-right')}>
                            <div className={cx('text')}>
                                <h4>Thông tin chủ phòng</h4>
                                <hr />
                                <h5 style={{ fontWeight: 'bold' }}>
                                    <UserOutlined
                                        style={{ fontSize: '16px' }}
                                    />
                                    Lê Văn Vương
                                </h5>
                                <p>Địa chỉ: Thạch Thật, Hà Nội</p>
                            </div>
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <div className={cx('btn-grad')}>
                                        <Link
                                            to={'#'}
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <PhoneFilled /> 096452382232
                                        </Link>
                                    </div>
                                    <div className={cx('btn-facebook')}>
                                        <Link
                                            to={'#'}
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            FaceBook
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default UserMotelRoom;
