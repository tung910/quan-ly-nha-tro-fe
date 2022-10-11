import {
    Button,
    Col,
    DatePicker,
    Form,
    PageHeader,
    Row,
    Select,
    Space,
    Tooltip,
} from 'antd';
import {
    SearchOutlined,
    FileExcelOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getAllMotel } from '~/api/motel.api';
import { getListRooms, getRooms } from '~/api/room.api';
import { DATE_FORMAT } from '~/consts/const';
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';
import styles from './Booking.module.scss';
import Table from '~/components/table';
import { ColumnsType } from 'antd/lib/table';

const cx = classNames.bind(styles);
const Option = Select;
const BookingRoomDeposit = () => {
    const columns = [
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: () => {
                return (
                    <Space>
                        <Tooltip title='Sửa phòng'>
                            <Button
                                type='primary'
                                icon={<EditOutlined />}
                            ></Button>
                        </Tooltip>
                        <Tooltip title='Xóa phòng'>
                            <Button
                                icon={<DeleteOutlined />}
                                type='dashed'
                                danger
                            ></Button>
                        </Tooltip>
                    </Space>
                );
            },
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'setDay',
            key: 'setDay',
        },
        {
            title: 'Nhà',
            dataIndex: 'motelRoomName',
            key: 'motelRoomName',
        },
        {
            title: 'Phòng',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Tiền cọc',
            dataIndex: 'priceDeposit',
            key: 'priceDeposit',
        },
        {
            title: 'Ngày dự kiến đến',
            dataIndex: 'dateExpected',
            key: 'dateExpected',
        },
        {
            title: 'Trạng thái',
            dataIndex: '_id',
            key: '_id',
            render: () => {
                return (
                    <Space>
                        <Tooltip title='Nhận phòng'>
                            <Button
                                type='primary'
                                icon={<CheckOutlined />}
                            ></Button>
                        </Tooltip>
                        <Tooltip title='Hủy'>
                            <Button
                                type='dashed'
                                icon={<CloseOutlined />}
                                danger
                            ></Button>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];
    const [listMotels, setListMotels] = useState<MotelType[]>([]);
    const [listRooms, setListRooms] = useState<RoomType[]>([]);

    const dataSource = [
        {
            _id: '1',
            setDay: '17/10/2020',
            motelRoomName: 'Nhà 1',
            roomName: 'Phòng 01',
            fullname: 'Nguyễn Xuân Tường',
            phoneNumber: '02349329434',
            priceDeposit: '1,500,000',
            dateExpected: '20/11/2020',
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

    const handleSelectRoom = async (id: any) => {
        const { data } = await getRooms(id);

        setListRooms(data);
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
                >
                    <Row gutter={[8, 8]}>
                        <Col span={8}>
                            <Form.Item label={<>Từ ngày</>} colon={false}>
                                <DatePicker
                                    defaultValue={moment(
                                        moment().startOf('month'),
                                        DATE_FORMAT
                                    )}
                                    format={DATE_FORMAT}
                                    name='startDate'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={<>Đến ngày</>} colon={false}>
                                <DatePicker
                                    defaultValue={moment(
                                        moment().endOf('month'),
                                        DATE_FORMAT
                                    )}
                                    format={DATE_FORMAT}
                                    name='dateLate'
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Button
                                style={{ margin: 4 }}
                                type='primary'
                                icon={<SearchOutlined />}
                            >
                                Xem
                            </Button>

                            <Button
                                style={{ margin: 10 }}
                                type='primary'
                                icon={<PlusOutlined />}
                            >
                                Thêm mới
                            </Button>
                            <Button type='primary' icon={<FileExcelOutlined />}>
                                Xuất file excel
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={8}>
                            <Form.Item label={<>Nhà</>} colon={false}>
                                <Select
                                    style={{ width: 150 }}
                                    defaultValue='Tất cả'
                                    showSearch
                                    onChange={handleSelectRoom}
                                >
                                    {listMotels &&
                                        listMotels.map((item, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={<>Phòng</>} colon={false}>
                                <Select
                                    style={{ width: 150 }}
                                    defaultValue='Tất cả'
                                    showSearch
                                >
                                    {listRooms &&
                                        listRooms.map((item, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={item._id}
                                                >
                                                    {item.roomName}
                                                </Option>
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
                    dataSource={dataSource}
                    columns={columns as ColumnsType}
                />
            </div>
        </div>
    );
};

export default BookingRoomDeposit;
