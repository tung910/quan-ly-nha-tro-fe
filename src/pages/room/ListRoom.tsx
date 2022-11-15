import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EyeOutlined,
    RetweetOutlined,
    UndoOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Image,
    message,
    Modal,
    Select,
    Space,
    Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changeRoom } from '~/api/customer.api';
import { getAllMotel } from '~/api/motel.api';
import { getRooms, payHostel, removeRoom } from '~/api/room.api';
import { useAppDispatch } from '~/app/hooks';
import Table from '~/components/table';
import { BASE_IMG, DateFormat } from '~/constants/const';
import { MESSAGES } from '~/constants/message.const';
import { setIsLoading } from '~/feature/service/appSlice';
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';
import { generatePriceToVND } from '~/utils/helper';
import styles from './ListRoom.module.scss';
export interface Props {
    motelId: string;
}
const cx = classNames.bind(styles);
const { Option } = Select;
const ListRoom = ({ motelId }: Props) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCheck, setIsCheck] = useState(true);
    const [isModalPayHostelOpen, setIsModalPayHostelOpen] = useState(false);
    const [listNameMotel, setListNameMotel] = useState<MotelType[]>([]);
    const [listNameRoom, setListNameRoom] = useState<RoomType[]>([]);
    const [roomRentId, setRoomRentId] = useState<string>('');
    const [motelRoomID, setmotelRoomID] = useState<string>('');

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                dispatch(setIsLoading(true));
                const [motels, rooms] = await Promise.all([
                    getAllMotel(),
                    getRooms(motelId),
                ]);
                setListNameMotel(motels.data);
                setRooms(rooms.data);
                dispatch(setIsLoading(false));
            } catch (error) {
                // message.error(error);
            }
        };
        handleFetchData();
    }, []);
    const onClickMotel = async (value: string) => {
        const { data } = await getRooms(value);
        const room: any = [];
        data.map((item: RoomType) => {
            if (item.isRent === false) {
                room.push(item);
            }
        });
        setListNameRoom(room);
    };
    const onChangeRoom = async (values: any) => {
        const data = {
            DateChangeRoom: moment(values.date).format(DateFormat.DATE_DEFAULT),
            NewRoomID: values.roomID,
        };
        await changeRoom(data, roomRentId);
        const listRooms = async () => {
            const { data } = await getRooms(motelId);
            setRooms(data);
        };
        listRooms();
        setIsModalOpen(false);
        form.resetFields();
        message.success(MESSAGES.CHANGE_ROOM);
    };
    const onPayHostel = async (values: any) => {
        const data = {
            month: moment(values.date).format(DateFormat.DATE_M),
            year: moment(values.date).format(DateFormat.DATE_Y),
            roomRentID: roomRentId,
            _id: motelRoomID,
        };

        await payHostel(data);

        const listRooms = async () => {
            const { data } = await getRooms(motelId);
            setRooms(data);
        };
        listRooms();
        setIsModalPayHostelOpen(false);
        form.resetFields();
        message.success(MESSAGES.PAY_HOSTEL);
    };
    const onRemove = async (id: string) => {
        Modal.confirm({
            centered: true,
            title: `Bạn có muốn xóa phòng không!`,
            cancelText: 'Hủy',
            okText: 'Xóa',
            onOk: async () => {
                await removeRoom(id);
                setRooms(rooms.filter((item) => item._id !== id));
                message.success(MESSAGES.DEL_SUCCESS);
            },
        });
    };

    const defaultColumns: ColumnsType<object> | undefined = [
        {
            title: '',
            dataIndex: '_id',
            render: (id) => {
                return (
                    <Space>
                        <Tooltip title='Sửa phòng'>
                            <Link to={'/motel-room/edit-room/' + id}>
                                <Button
                                    type='primary'
                                    icon={<EditOutlined />}
                                ></Button>
                            </Link>
                        </Tooltip>
                        <Tooltip title='Xóa phòng'>
                            <Button
                                type='primary'
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => onRemove(id)}
                            ></Button>
                        </Tooltip>
                    </Space>
                );
            },
        },
        {
            title: 'Phòng',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'Ảnh nhận dạng',
            dataIndex: 'avatarCustomer',
            key: 'avatarCustomer',
            render: (avatarCustomer) => {
                return (
                    <>
                        {
                            <Image
                                src={avatarCustomer ?? BASE_IMG}
                                loading='lazy'
                                width={'60px'}
                                style={{ marginLeft: 20 }}
                            />
                        }
                    </>
                );
            },
        },
        {
            title: 'Khách thuê',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Số lượng khách',
            dataIndex: 'maxPerson',
            key: 'maxPerson',
        },
        {
            title: 'Giá phòng',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            render: (unitPrice) => {
                return <>{generatePriceToVND(unitPrice)}</>;
            },
        },
        {
            title: 'Hợp đồng',
            dataIndex: 'roomRentID',
            key: 'roomRentID',
            render: (roomRentID) => {
                return (
                    <>
                        {roomRentID && (
                            <Tooltip title='Tải xuống'>
                                <Button
                                    type='primary'
                                    icon={
                                        <Link
                                            to={`/export-pdf?roomRentId=${roomRentID}`}
                                            target='_blank'
                                        >
                                            <DownloadOutlined />
                                        </Link>
                                    }
                                ></Button>
                            </Tooltip>
                        )}
                    </>
                );
            },
        },
        {
            title: '',
            dataIndex: '_id',
            render: (text, record: any) => {
                return (
                    <Space>
                        {record.isRent ? (
                            <>
                                <Tooltip title='Trả phòng'>
                                    <Button
                                        type='primary'
                                        style={{
                                            background: 'orange',
                                            border: 'none',
                                        }}
                                        icon={<UndoOutlined />}
                                        onClick={() => {
                                            setRoomRentId(record.roomRentID);
                                            setmotelRoomID(record._id);
                                            setIsModalPayHostelOpen(true);
                                        }}
                                    ></Button>
                                </Tooltip>
                                <Tooltip title='Đổi phòng'>
                                    <Button
                                        type='primary'
                                        icon={<RetweetOutlined />}
                                        style={{
                                            background: 'green',
                                            border: 'none',
                                        }}
                                        onClick={() => {
                                            setRoomRentId(record.roomRentID);
                                            setIsModalOpen(true);
                                        }}
                                    ></Button>
                                </Tooltip>
                                <Tooltip title='Xem chi tiết'>
                                    <Link
                                        to={`/customer/view?roomRentID=${record.roomRentID}&&roomName=${record.roomName}`}
                                    >
                                        <Button
                                            type='primary'
                                            style={{
                                                background: 'black',
                                                border: 'none',
                                            }}
                                            icon={<EyeOutlined />}
                                        ></Button>
                                    </Link>
                                </Tooltip>
                                <Tooltip title='Sửa thông tin'>
                                    <Link
                                        to={`/customer/edit?roomRentID=${record.roomRentID}&&roomName=${record.roomName}`}
                                    >
                                        <Button
                                            type='primary'
                                            icon={<EditOutlined />}
                                        ></Button>
                                    </Link>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Tooltip title='Thêm khách thuê'>
                                    <Link
                                        to={`/customer/create?roomId=${record._id}&&roomName=${record.roomName}&&motelId=${record.motelID}`}
                                    >
                                        <Button
                                            style={{
                                                margin: 'auto',
                                            }}
                                            type='primary'
                                            icon={<UserAddOutlined />}
                                        ></Button>
                                    </Link>
                                </Tooltip>
                            </>
                        )}
                    </Space>
                );
            },
        },
    ];

    return (
        <div className={cx('table')}>
            <Table dataSource={rooms} columns={defaultColumns} />
            <div>
                <Modal
                    title='Đổi phòng'
                    open={isModalOpen}
                    onOk={form.submit}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <>
                        <Form
                            autoComplete='off'
                            form={form}
                            labelCol={{ span: 5 }}
                            onFinish={onChangeRoom}
                        >
                            <Form.Item
                                label={<>Ngày</>}
                                colon={false}
                                labelAlign='left'
                                name='date'
                                initialValue={moment()}
                            >
                                <DatePicker
                                    format={DateFormat.DATE_DEFAULT}
                                    style={{ width: '375px' }}
                                />
                            </Form.Item>

                            <Form.Item
                                label={<>Nhà</>}
                                colon={false}
                                labelAlign='left'
                                name='motelID'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn nhà!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder='Mời bạn chọn nhà'
                                    showSearch
                                    onChange={onClickMotel}
                                >
                                    {listNameMotel &&
                                        listNameMotel.map((item, index) => {
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
                            <Form.Item
                                label={<>Phòng</>}
                                colon={false}
                                labelAlign='left'
                                name='roomID'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn phòng!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder='Mời bạn chọn phòng'
                                    showSearch
                                >
                                    {listNameRoom &&
                                        listNameRoom.map((item, index) => {
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
                            <p>
                                Bạn nhập chỉ số điện và nước của phòng này trước
                                khi đổi để tính luôn tiền điện và nước.
                            </p>
                        </Form>
                    </>
                </Modal>
            </div>

            <div>
                <Modal
                    title='Trả Phòng'
                    open={isModalPayHostelOpen}
                    onOk={form.submit}
                    onCancel={() => setIsModalPayHostelOpen(false)}
                >
                    <>
                        <Form
                            autoComplete='off'
                            form={form}
                            labelCol={{ span: 5 }}
                            onFinish={onPayHostel}
                        >
                            <Form.Item
                                label={<>Ngày trả</>}
                                colon={false}
                                labelAlign='left'
                                name='date'
                                initialValue={moment()}
                            >
                                <DatePicker
                                    format={DateFormat.DATE_DEFAULT}
                                    style={{ width: '375px' }}
                                />
                            </Form.Item>

                            <p style={{ marginBottom: '20px' }}>
                                <Checkbox checked={isCheck}>
                                    Tính tiền phòng cuối tháng
                                </Checkbox>
                            </p>

                            <p>
                                Bạn nhập chỉ số điện và nước của phòng này trước
                                khi đổi để tính luôn tiền điện và nước.
                            </p>
                        </Form>
                    </>
                </Modal>
            </div>
        </div>
    );
};

export default ListRoom;
