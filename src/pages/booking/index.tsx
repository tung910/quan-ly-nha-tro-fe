import {
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    FileExcelOutlined,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Modal,
    PageHeader,
    Row,
    Select,
    Space,
    Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    listSearchRoomDeposit,
    updateStatusRoomDeposit,
} from '~/api/booking.api';
import { getAllMotel } from '~/api/motel.api';
import { getListRooms, getRooms } from '~/api/room.api';
import notification from '~/components/notification';
import Table from '~/components/table';
import { DateFormat, NotificationType } from '~/constants/const';
import { MESSAGES } from '~/constants/message.const';
import { IBooking } from '~/types/Booking.type';
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';
import { convertDate, generatePriceToVND } from '~/utils/helper';
import styles from './Booking.module.scss';

const cx = classNames.bind(styles);
const BookingRoomDeposit = () => {
    const [form] = Form.useForm();
    const [listMotels, setListMotels] = useState<MotelType[]>([]);
    const [listRooms, setListRooms] = useState<RoomType[]>([]);
    const [dataSource, setdataSource] = useState<IBooking[]>([]);
    const navigate = useNavigate();

    const isDeposit = (room: IBooking) => {
        let result = false;
        if (room.checkInDate || room.cancelDate) {
            result = true;
        }
        return result;
    };
    const columns: ColumnsType<IBooking> = [
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: (id, record) => {
                return (
                    <Space>
                        <Tooltip title='Sửa phòng'>
                            <Link to={'edit-booking?bookingId=' + id}>
                                <Button
                                    type='primary'
                                    icon={<EditOutlined />}
                                    disabled={isDeposit(record)}
                                ></Button>
                            </Link>
                        </Tooltip>
                    </Space>
                );
            },
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            render: (bookingDate) => {
                return <>{convertDate(bookingDate)}</>;
            },
        },
        {
            title: 'Nhà',
            dataIndex: ['motelId', 'name'],
            key: 'motelId',
        },
        {
            title: 'Phòng',
            dataIndex: ['motelRoomId', 'roomName'],
            key: 'motelRoomId',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'telephone',
            key: 'telephone',
        },
        {
            title: 'Tiền cọc',
            dataIndex: 'bookingAmount',
            key: 'bookingAmount',
            render: (bookingAmount) => {
                return <>{generatePriceToVND(bookingAmount)}</>;
            },
        },
        {
            title: 'Ngày dự kiến đến',
            dataIndex: 'dateOfArrival',
            key: 'dateOfArrival',
            render: (dateOfArrival) => {
                return <>{convertDate(dateOfArrival)}</>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'record',
            key: '_id',
            render: (text, record) => {
                return (
                    <Space>
                        {!record.hasCheckIn ? (
                            record.hasCancel ? (
                                `Khách hủy đặt ngày ${convertDate(
                                    record?.cancelDate
                                )}`
                            ) : (
                                <>
                                    {' '}
                                    <Tooltip title='Nhận phòng'>
                                        <Button
                                            type='primary'
                                            icon={<CheckOutlined />}
                                            onClick={() =>
                                                handleCheckIn(record)
                                            }
                                        ></Button>
                                    </Tooltip>
                                    <Tooltip title='Hủy'>
                                        <Button
                                            type='dashed'
                                            onClick={() => handleCancel(record)}
                                            icon={<CloseOutlined />}
                                            danger
                                        ></Button>
                                    </Tooltip>
                                </>
                            )
                        ) : (
                            `Khách đã vào ngày ${convertDate(
                                record?.checkInDate
                            )}`
                        )}
                    </Space>
                );
            },
        },
    ];

    useEffect(() => {
        const handleFetchData = async () => {
            const [{ data: motels }, { data: rooms }] = await Promise.all([
                getAllMotel(),
                getListRooms(),
                onSave(),
            ]);
            setListMotels(motels);
            setListRooms(rooms);
        };

        handleFetchData();
    }, []);

    const handleCheckIn = (record: IBooking) => {
        if (record) {
            const newDate = {
                ...record,
                checkInDate: record.dateOfArrival,
                hasCheckIn: !record.hasCheckIn,
            };
            Modal.confirm({
                title: 'Nhận Phòng',
                content: (
                    <>
                        <label style={{ marginRight: 20 }}>
                            Xác nhận phòng ngày :
                        </label>
                        <>
                            <DatePicker
                                value={
                                    newDate.checkInDate
                                        ? moment(newDate.checkInDate)
                                        : undefined
                                }
                                style={{ width: 150 }}
                            />
                        </>
                    </>
                ),
                cancelText: 'Cancel',
                okText: 'Lưu',
                onOk: () => handleSave(record),
            });
        }
    };
    const handleSave = (record: any) => {
        navigate(
            `/customer/create?roomId=${record?.motelRoomId?._id}&&roomName=${record?.motelRoomId?.roomName}&&motelId=${record?.motelId?._id}&&booking=${record._id}`
        );
    };

    const handleCancel = (record: any) => {
        if (record) {
            const newDate = {
                ...record,
                cancelDate: record.dateOfArrival,
                hasCancel: !record.hasCancel,
            };
            Modal.confirm({
                title: 'Hủy Cọc',
                content: (
                    <>
                        <>
                            <label style={{ marginRight: 20 }}>
                                Đã hủy cọc ngày :
                            </label>
                        </>
                        <>
                            <DatePicker
                                value={
                                    newDate
                                        ? moment(newDate.cancelDate)
                                        : undefined
                                }
                                style={{ width: 150 }}
                            />
                        </>
                    </>
                ),
                onOk: async () => {
                    const value = {
                        data: {
                            cancelDate: moment(newDate.cancelDate),
                            hasCancel: true,
                        },
                    };
                    await updateStatusRoomDeposit(record._id, value);
                    await onSave();
                    notification({ message: MESSAGES.CANCEL_SUCCESS });
                },
            });
        }
    };

    const handleSelectRoom = async (id: string) => {
        const { data } = await getRooms(id);
        setListRooms(data);
    };

    const onSave = async () => {
        const value = form.getFieldsValue();
        const result = {
            data: {
                ...value,
                fromDate: convertDate(value.fromDate, DateFormat.DATE_M_D_Y),
                toDate: convertDate(value.toDate, DateFormat.DATE_M_D_Y),
            },
        };
        if (new Date(result.data.fromDate) < new Date(result.data.toDate)) {
            const listData = await listSearchRoomDeposit(result);
            setdataSource(listData.data);
        } else {
            notification({
                message: 'Vui lòng kiểm tra lại',
                type: NotificationType.WARNING,
            });
        }
    };

    return (
        <div>
            <div>
                <PageHeader
                    className={cx('title-header')}
                    ghost={true}
                    title='Cọc giữ phòng'
                />
            </div>

            <div>
                <Form
                    style={{ padding: 20 }}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onSave}
                    form={form}
                >
                    <Row gutter={[8, 8]}>
                        <Col span={8}>
                            <Form.Item
                                name='fromDate'
                                label={<>Từ ngày</>}
                                colon={false}
                                initialValue={moment(
                                    moment(new Date()).startOf('month'),
                                    DateFormat.DATE_DEFAULT
                                )}
                            >
                                <DatePicker format={DateFormat.DATE_DEFAULT} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name='toDate'
                                label={<>Đến ngày</>}
                                colon={false}
                                initialValue={moment(
                                    moment(new Date()).endOf('month'),
                                    DateFormat.DATE_DEFAULT
                                )}
                            >
                                <DatePicker format={DateFormat.DATE_DEFAULT} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Button
                                style={{ margin: 4 }}
                                type='primary'
                                htmlType='submit'
                                icon={<SearchOutlined />}
                            >
                                Xem
                            </Button>

                            <Button
                                style={{ margin: 10 }}
                                type='primary'
                                icon={<PlusOutlined />}
                            >
                                <Link
                                    to='/booking/create'
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Thêm mới
                                </Link>
                            </Button>
                            <Button type='primary' icon={<FileExcelOutlined />}>
                                Xuất file excel
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={8}>
                            <Form.Item
                                name='motelId'
                                label={<>Nhà</>}
                                colon={false}
                            >
                                <Select
                                    style={{ width: 150 }}
                                    placeholder='Tất cả'
                                    showSearch
                                    onChange={handleSelectRoom}
                                >
                                    {listMotels &&
                                        listMotels.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </Select.Option>
                                            );
                                        })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name='motelRoomId'
                                label={<>Phòng</>}
                                colon={false}
                            >
                                <Select
                                    style={{ width: 150 }}
                                    placeholder='Tất cả'
                                    showSearch
                                >
                                    {listRooms &&
                                        listRooms.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={item._id}
                                                >
                                                    {item.roomName}
                                                </Select.Option>
                                            );
                                        })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div>
                <i>
                    (*) Cọc giữ phòng chỉ có hiệu lực trong vòng 1 tháng kể từ
                    khi bắt đầu
                </i>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </div>
    );
};

export default BookingRoomDeposit;
