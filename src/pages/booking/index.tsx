import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
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
    message,
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
import { Link } from 'react-router-dom';
import { deleteRoomDeposit, listSearchRoomDeposit } from '~/api/booking.api';
import { getAllMotel } from '~/api/motel.api';
import { getListRooms, getRooms } from '~/api/room.api';
import Table from '~/components/table';
import { DateFormat } from '~/constants/const';
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
    const [dataSource, setdataSource] = useState<any>([]);

    const columns: ColumnsType = [
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: (id) => {
                return (
                    <Space>
                        <Tooltip title='Sửa phòng'>
                            <Link to={'edit-booking?bookingId=' + id}>
                                <Button
                                    type='primary'
                                    icon={<EditOutlined />}
                                ></Button>
                            </Link>
                        </Tooltip>
                        <Tooltip title='Xóa phòng'>
                            <Button
                                icon={<DeleteOutlined />}
                                type='dashed'
                                danger
                                onClick={() => handleDelete(id)}
                            ></Button>
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
            render: (bookingAmount: any) => {
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
                        <Tooltip title='Nhận phòng'>
                            <Button
                                type='primary'
                                icon={<CheckOutlined />}
                                onClick={() => handleCheckIn(record)}
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
                    </Space>
                );
            },
        },
    ];

    useEffect(() => {
        const getListMotels = async () => {
            const { data } = await getAllMotel();
            setListMotels(data);
        };
        getListMotels();

        const getListRoom = async () => {
            const { data } = await getListRooms();
            setListRooms(data);
        };
        getListRoom();
    }, []);

    const handleDelete = (id: any) => {
        Modal.confirm({
            centered: true,
            title: `Bạn có đồng ý xóa không ?`,
            cancelText: 'Cancel',
            okText: 'Lưu',
            onOk: async () => {
                await deleteRoomDeposit(id);
                setdataSource(
                    dataSource.filter((item: any) => item._id !== id)
                );
                message.success(MESSAGES.DEL_SUCCESS);
            },
        });
    };

    const handleCheckIn = (record: any) => {
        if (record) {
            const newDate = {
                ...record,
                checkInDate: record.bookingDate,
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
            });
        }
    };

    const handleCancel = (record: any) => {
        if (record) {
            const newDate = {
                ...record,
                cancelDate: record.bookingDate,
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
                cancelText: 'Cancel',
                okText: 'Lưu',
            });
        }
    };

    const handleSelectRoom = async (id: any) => {
        const { data } = await getRooms(id);

        setListRooms(data);
    };

    const onSave = async (values: any) => {
        const result = {
            data: {
                ...values,
                fromDate: convertDate(values.fromDate, DateFormat.DATE_M_D_Y),
                toDate: convertDate(values.toDate, DateFormat.DATE_M_D_Y),
            },
        };

        if (result.data.fromDate < result.data.toDate) {
            const listData = await listSearchRoomDeposit(result);

            setdataSource(listData.data);
        } else {
            message.error('Vui lòng kiểm tra lại');
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
                                onClick={form.submit}
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
                                    defaultValue='Tất cả'
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
                                    defaultValue='Tất cả'
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
                <Table
                    dataSource={
                        dataSource && dataSource.map((item: IBooking) => item)
                    }
                    columns={columns as ColumnsType}
                />
            </div>
        </div>
    );
};

export default BookingRoomDeposit;
