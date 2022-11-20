import { PhoneFilled, SafetyCertificateOutlined } from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Descriptions,
    Image,
    PageHeader,
    Row,
    Tabs,
} from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoomDetailByEmail } from '~/api/customer.api';
import { getUserById } from '~/api/user.api';
import { useAppSelector } from '~/app/hooks';
import { TypeTabs } from '~/types/Setting.type';
import { generatePriceToVND } from '~/utils/helper';
import styles from './MotelRoomUser.module.scss';

const cx = classNames.bind(styles);
const UserMotelRoom = () => {
    const user = useAppSelector((state: any) => state.user.user);
    const [dataUser, setDataUser] = useState<any>({});
    const [dataRoom, setdataRoom] = useState<any>({});
    const [tab, setTab] = useState('info');

    useEffect(() => {
        const handleGetData = async () => {
            const payload = {
                email: user.email,
            };
            const { data } = await getRoomDetailByEmail(payload);

            setDataUser(data);

            const currentRoom = JSON.stringify(data.motelRoomID);
            localStorage.setItem('currentRoom', currentRoom);

            const getUser = async () => {
                const { data } = await getUserById(user._id);

                setdataRoom(data);
            };
            getUser();
        };
        handleGetData();
    }, [user.email]);

    const items: TypeTabs[] = [
        {
            label: `${dataUser.roomName}`,
            key: 'info',
            children: (
                <Descriptions title='Thông tin phòng' style={{ width: 800 }}>
                    <Descriptions.Item
                        label={
                            <span style={{ fontWeight: 'bold' }}>
                                Số lượng thành viên
                            </span>
                        }
                    >
                        {dataUser?.member?.length} người
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <span style={{ fontWeight: 'bold' }}>
                                Giá phòng/Tháng
                            </span>
                        }
                    >
                        {generatePriceToVND(dataUser?.priceRoom)} đ/Tháng
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <span style={{ fontWeight: 'bold' }}>Địa chỉ</span>
                        }
                    >
                        {dataUser?.address}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <span style={{ fontWeight: 'bold' }}>Tiền cọc</span>
                        }
                    >
                        {generatePriceToVND(dataUser?.deposit)}đ
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <span style={{ fontWeight: 'bold' }}>
                                Chỉ số điện đã dùng
                            </span>
                        }
                    >
                        {dataRoom?.power?.useValue} số
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <span style={{ fontWeight: 'bold' }}>
                                Chỉ số nước đã dùng
                            </span>
                        }
                    >
                        {dataRoom?.water?.useValue} số
                    </Descriptions.Item>
                </Descriptions>
            ),
        },
    ];

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
                                src={
                                    dataRoom?.user?.motelRoomID.images[0]
                                        .thumbUrl
                                }
                                alt='Ảnh'
                                style={{ objectFit: 'cover' }}
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
                <Row
                    style={{
                        marginTop: 50,
                    }}
                >
                    <Col span={12}>
                        <p style={{ fontWeight: 'bold', fontSize: 18 }}>
                            Nhà Trọ Vương Anh
                        </p>
                        <Tabs
                            activeKey={tab}
                            onChange={setTab}
                            items={items}
                        ></Tabs>
                    </Col>

                    <Col span={6} offset={5}>
                        <Card
                            title={
                                <>
                                    <Row>
                                        <Col span={12}>
                                            <p
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 18,
                                                }}
                                            >
                                                {generatePriceToVND(
                                                    dataUser.priceRoom
                                                )}
                                                đ/Tháng
                                            </p>
                                        </Col>

                                        <Col span={6} offset={1}>
                                            <span>
                                                <SafetyCertificateOutlined
                                                    style={{
                                                        color: 'green',
                                                        fontSize: 23,
                                                        marginLeft: 8,
                                                    }}
                                                />{' '}
                                                Đã xác nhận
                                            </span>
                                        </Col>
                                    </Row>
                                </>
                            }
                            bordered={true}
                            style={{
                                width: 320,
                                borderRadius: 15,
                            }}
                        >
                            <p style={{ fontWeight: 'bold', fontSize: 17 }}>
                                Thông tin chủ phòng
                            </p>
                            <Avatar
                                src={
                                    <Image
                                        src={
                                            dataUser?.motelRoomID
                                                ?.avatarCustomer
                                        }
                                        style={{ width: 32 }}
                                    />
                                }
                            />{' '}
                            {dataUser.customerName}
                            <p style={{ marginTop: 10 }}>
                                Ngày sinh : {dataUser.dateOfBirth}
                            </p>
                            <p style={{ marginTop: 10 }}>
                                Số chứng minh nhân dân :{' '}
                                {dataUser.citizenIdentification}
                            </p>
                            <p style={{ marginTop: 10 }}>
                                Địa chỉ : {dataUser.address}
                            </p>
                            <div style={{ textAlign: 'center' }}>
                                <div className={cx('btn-grad')}>
                                    <Link
                                        to={'#'}
                                        style={{
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <PhoneFilled /> {dataUser?.phone}
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
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default UserMotelRoom;
