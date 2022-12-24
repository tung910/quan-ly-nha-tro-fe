import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EyeOutlined,
    UndoOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Image,
    InputNumber,
    Modal,
    Space,
    Tooltip,
    message,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listSearchRoomDeposit } from '~/api/booking.api';
import { getAllMotel } from '~/api/motel.api';
import { getRooms, payHostel, removeRoom } from '~/api/room.api';
import { useAppDispatch } from '~/app/hooks';
import Table from '~/components/table';
import { BASE_IMG, DateFormat } from '~/constants/const';
import { MESSAGES } from '~/constants/message.const';
import { setIsLoading } from '~/feature/service/appSlice';
import { RoomType } from '~/types/RoomType';
import { convertDate, generatePriceToVND } from '~/utils/helper';

import styles from './ListRoom.module.scss';

export interface Props {
    motelId: string;
}
const cx = classNames.bind(styles);
const ListRoom = ({ motelId }: Props) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [roomDeposit, setRoomDeposit] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isModalPayHostelOpen, setIsModalPayHostelOpen] = useState(false);
    const [roomRentId, setRoomRentId] = useState<string>('');
    const [motelRoomID, setmotelRoomID] = useState<string>('');

    useEffect(() => {
        if (motelId) {
            (async () => {
                dispatch(setIsLoading(true));
                try {
                    const { data } = await getRooms(motelId);
                    setRooms(data);
                    setLoading(false);
                } catch (error) {
                    //
                }
                dispatch(setIsLoading(false));
            })();
        }
    }, [motelId]);
    useEffect(() => {
        (async () => {
            dispatch(setIsLoading(true));
            const search = {
                data: {
                    fromDate: convertDate(
                        moment(new Date()).startOf('month'),
                        DateFormat.DATE_M_D_Y
                    ),
                    toDate: convertDate(
                        moment(new Date()).endOf('month'),
                        DateFormat.DATE_M_D_Y
                    ),
                },
            };
            try {
                const [motels, roomsDeposit] = await Promise.all([
                    getAllMotel(),
                    listSearchRoomDeposit(search),
                ]);
                setRoomDeposit(roomsDeposit.data);
            } catch (error) {
                //
            }
            dispatch(setIsLoading(false));
        })();
    }, []);
    const handleOpen = (item: any) => {
        form.setFieldValue('moneyPayCustomer', item.roomRentID.deposit);
        setIsModalPayHostelOpen(true);
    };
    const onPayHostel = async (values: any) => {
        const data = {
            month: moment(values.date).format(DateFormat.DATE_M),
            year: moment(values.date).format(DateFormat.DATE_Y),
            roomRentID: roomRentId,
            _id: motelRoomID,
        };
        await payHostel(data);
        const { data: rooms } = await getRooms(motelId);
        setRooms(rooms);
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
    const handleCheckRoomDeposit = (roomId: string) => {
        let result = {};
        if (roomDeposit.length > 0) {
            result = roomDeposit.find((item: any) => {
                return item.motelRoomId?._id === roomId && item;
            });
        }

        return result ?? {};
    };
    const isDeposit = (room: any) => {
        let result = Object.keys(room).length <= 0 ? true : false;
        if (room.checkInDate || room.cancelDate) {
            result = true;
        }

        return result;
    };
    const columns: ColumnsType[number][] = [
        {
            title: '',
            dataIndex: '_id',
            render: (id, item: any) => {
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
                                disabled={item.isRent}
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
                                preview={false}
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
            render: (value) => {
                return value || <i>N/A</i>;
            },
        },
        {
            title: 'Số người tối đa',
            dataIndex: 'maxPerson',
            key: 'maxPerson',
        },
        {
            title: 'Số người đang thuê',
            dataIndex: 'maxPerson',
            key: 'maxPerson',
            render: (_, item: any) => {
                return item.roomRentID ? (
                    item?.roomRentID.member.length + 1
                ) : (
                    <i>N/A</i>
                );
            },
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
            title: 'Ngày bắt đầu',
            dataIndex: 'roomRentID',
            key: 'roomRentID',
            render: (roomRent) => {
                return <>{roomRent ? roomRent?.startDate : <i>N/A</i>}</>;
            },
        },
        {
            title: 'Hợp đồng',
            dataIndex: 'roomRentID',
            key: 'roomRentID',
            render: (roomRentID) => {
                return (
                    <>
                        {roomRentID ? (
                            <Tooltip title='Tải xuống'>
                                <Button
                                    type='primary'
                                    icon={
                                        <Link
                                            to={`/export-pdf?roomRentId=${roomRentID._id}`}
                                            target='_blank'
                                        >
                                            <DownloadOutlined />
                                        </Link>
                                    }
                                ></Button>
                            </Tooltip>
                        ) : (
                            <i>N/A</i>
                        )}
                    </>
                );
            },
        },
        {
            title: '',
            dataIndex: '_id',
            render: (text, record: any) => {
                const roomDeposit: any = handleCheckRoomDeposit(record._id);

                return (
                    <>
                        {isDeposit(roomDeposit) ? (
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
                                                    setRoomRentId(
                                                        record.roomRentID._id
                                                    );
                                                    setmotelRoomID(record._id);
                                                    handleOpen(record);
                                                }}
                                            ></Button>
                                        </Tooltip>
                                        {/*     <Tooltip title='Đổi phòng'>
                                            <Button
                                                type='primary'
                                                icon={<RetweetOutlined />}
                                                style={{
                                                    background: 'green',
                                                    border: 'none',
                                                }}
                                                onClick={() => {
                                                    setRoomRentId(
                                                        record.roomRentID._id
                                                    );
                                                    setIsModalOpen(true);
                                                }}
                                            ></Button>
                                        </Tooltip> */}
                                        <Tooltip title='Xem chi tiết'>
                                            <Link
                                                to={`/customer/view?roomRentID=${record.roomRentID._id}&&roomName=${record.roomName}`}
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
                                                to={`/customer/edit?roomRentID=${record.roomRentID._id}&&roomName=${record.roomName}`}
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
                        ) : (
                            <p style={{ width: '150px' }}>
                                Phòng đã được anh/chị {roomDeposit?.fullName}{' '}
                                cọc tới ngày{' '}
                                {convertDate(roomDeposit?.dateOfArrival)}
                            </p>
                        )}
                    </>
                );
            },
        },
    ];

    return (
        <div className={cx('table')}>
            <Table
                dataSource={rooms}
                columns={columns}
                pagination={{ pageSize: 5 }}
                loading={loading}
            />
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
                                label={<p>Ngày trả</p>}
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
                                label={
                                    <>
                                        Số tiền trả <br />
                                        lại cho khách
                                    </>
                                }
                                colon={false}
                                labelAlign='left'
                                name='moneyPayCustomer'
                            >
                                <InputNumber
                                    formatter={(value) =>
                                        ` ${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ','
                                        )
                                    }
                                    parser={(value: any) =>
                                        value.replace(/\$\s?|(,*)/g, '')
                                    }
                                    addonAfter={'VND'}
                                    style={{ width: '375px' }}
                                    maxLength={10}
                                />
                            </Form.Item>
                        </Form>
                    </>
                </Modal>
            </div>
        </div>
    );
};

export default ListRoom;
