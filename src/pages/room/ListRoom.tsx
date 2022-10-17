import { Button, Space, Tooltip, Table, Image } from 'antd';
import classNames from 'classnames/bind';
import styles from './ListRoom.module.scss';
import { generatePriceToVND } from '~/utils/helper';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRooms, removeRoom } from '~/api/room.api';
import { RoomType } from '~/types/RoomType';
import {
    EditOutlined,
    UserAddOutlined,
    DeleteOutlined,
    RetweetOutlined,
    UndoOutlined,
    EyeOutlined,
} from '@ant-design/icons';
export interface Props {
    motelId: string;
}
const cx = classNames.bind(styles);

const ListRoom = ({ motelId }: Props) => {
    const [rooms, setRooms] = useState<RoomType[]>([]);

    useEffect(() => {
        const Room = async () => {
            const { data } = await getRooms(motelId);

            setRooms(data);
        };
        Room();
    }, []);

    const onRemove = async (id: string) => {
        const confirm = window.confirm('Bạn muốn xóa không?');
        if (confirm) {
            await removeRoom(id);
            setRooms(rooms.filter((item) => item._id !== id));
        }
    };

    const defaultColums: ColumnsType<object> | undefined = [
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
            dataIndex: 'imageCustomer',
            key: 'imageCustomer',
            render: (imageCustomer) => {
                return (
                    <>
                        {
                            <Image src='data:image/jpeg;base64,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' />
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
            title: 'Hoạt động',
            dataIndex: '_id',
            render: (text, record: any) => {
                return (
                    <Space>
                        {record.isRent ? (
                            <>
                                <Tooltip title='Trả phòng'>
                                    <Button
                                        type='primary'
                                        icon={<UndoOutlined />}
                                    ></Button>
                                </Tooltip>
                                <Tooltip title='Đổi phòng'>
                                    <Button
                                        type='primary'
                                        icon={<RetweetOutlined />}
                                    ></Button>
                                </Tooltip>
                                <Tooltip title='Xem chi tiết'>
                                    <Link
                                        to={`/customer/view?roomRentID=${record.roomRentID}&&roomName=${record.roomName}`}
                                    >
                                        <Button
                                            type='primary'
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
            <Table dataSource={rooms} columns={defaultColums} />
        </div>
    );
};

export default ListRoom;
