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
} from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoomDetailByEmail } from '~/api/customer.api';
import { getUserById } from '~/api/user.api';
import { useAppSelector } from '~/app/hooks';
import Table from '~/components/table';
import { generatePriceToVND } from '~/utils/helper';

import styles from './MotelRoomUser.module.scss';
import { columnsMember } from './dataFileld';

const cx = classNames.bind(styles);
const UserMotelRoom = () => {
    const user = useAppSelector((state: any) => state.user.user);
    const [dataUser, setDataUser] = useState<any>({});
    const [dataRoom, setdataRoom] = useState<any>({});

    useEffect(() => {
        const handleGetData = async () => {
            const payload = {
                email: user.email,
            };
            const { data } = await getRoomDetailByEmail(payload);
            setDataUser(data);
            const currentRoom = JSON.stringify(data.motelRoomID);
            localStorage.setItem('currentRoom', currentRoom);
            const { data: dataUser } = await getUserById(user._id);
            setdataRoom(dataUser);
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
                        <div className={cx('image-right')}>
                            <Row>
                                {dataRoom?.user?.motelRoomID.images.map(
                                    (img: any) => (
                                        <Col
                                            style={{
                                                marginRight: 10,
                                                marginBottom: 10,
                                                width: 300,
                                            }}
                                            key={img.uuid}
                                        >
                                            <Image
                                                width={'100%'}
                                                height={'100%'}
                                                src={img.thumbUrl}
                                                alt='Ảnh'
                                            />
                                        </Col>
                                    )
                                )}
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row
                    style={{
                        marginTop: 50,
                    }}
                >
                    <Col span={18}>
                        <p style={{ fontWeight: 'bold', fontSize: 18 }}>
                            Nhà Trọ Vương Anh
                        </p>
                        <>
                            <Descriptions title='Thông tin phòng'>
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
                                    {generatePriceToVND(dataUser?.priceRoom)}{' '}
                                    đ/Tháng
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <span style={{ fontWeight: 'bold' }}>
                                            Địa chỉ
                                        </span>
                                    }
                                >
                                    {dataUser?.address}
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <span style={{ fontWeight: 'bold' }}>
                                            Tiền cọc
                                        </span>
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
                                    {dataRoom?.power?.useValue} kWh/số
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
                            <Descriptions title='Thành viên'>
                                <Row>
                                    <Table
                                        columns={columnsMember}
                                        dataSource={dataUser.member}
                                        style={{ width: '100%' }}
                                        rowKey='dataIndex'
                                    ></Table>
                                </Row>
                            </Descriptions>
                        </>
                    </Col>

                    <Col span={6}>
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
