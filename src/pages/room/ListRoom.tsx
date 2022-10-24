import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EyeOutlined,
    RetweetOutlined,
    UndoOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import { Button, Image, Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRooms, removeRoom } from '~/api/room.api';
import { useAppDispatch } from '~/app/hooks';
import Table from '~/components/table';
import { BASE_IMG } from '~/constants/const';
import { setIsLoading } from '~/feature/service/appSlice';
import { RoomType } from '~/types/RoomType';
import { generatePriceToVND } from '~/utils/helper';
import styles from './ListRoom.module.scss';
export interface Props {
    motelId: string;
}
const cx = classNames.bind(styles);

const ListRoom = ({ motelId }: Props) => {
    const dispatch = useAppDispatch();
    const [rooms, setRooms] = useState<RoomType[]>([]);

    useEffect(() => {
        const room = async () => {
            dispatch(setIsLoading(true));
            const { data } = await getRooms(motelId);
            setRooms(data);
            dispatch(setIsLoading(false));
        };
        room();
    }, []);

    const onRemove = async (id: string) => {
        const confirm = window.confirm('Bạn muốn xóa không?');
        if (confirm) {
            await removeRoom(id);
            setRooms(rooms.filter((item) => item._id !== id));
        }
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
            title: 'Số tiền đã trả',
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
        </div>
    );
};

export default ListRoom;
