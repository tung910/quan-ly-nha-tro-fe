import {
    DeleteOutlined,
    EditOutlined,
    PlusSquareOutlined,
} from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllMotel, removeMotel } from '~/api/motel.api';
import Tabs from '~/components/tabs';
import { MESSAGES } from '~/constants/message.const';
import { MotelType } from '~/types/MotelType';
import ListRoom from '../room/ListRoom';
import styles from './Motel.module.scss';

const cx = classNames.bind(styles);

const Motel = () => {
    const [tab, setTab] = useState('0');
    const [motels, setMotels] = useState<MotelType[]>([]);

    useEffect(() => {
        const getMotels = async () => {
            const { data } = await getAllMotel();

            setMotels(data);
        };
        getMotels();
    }, []);

    const onRemoveMotel = async (id: string) => {
        Modal.confirm({
            centered: true,
            title: `Bạn có muốn xóa nhà trọ không!`,
            cancelText: 'Hủy',
            okText: 'Xóa',
            onOk: async () => {
                await removeMotel(id);
                setMotels(motels.filter((item) => item._id !== id));
                message.success(MESSAGES.DEL_SUCCESS);
                setTab('0');
            },
        });
    };
    const listMotel = [
        ...motels.map((item, index) => {
            return {
                label: item.name,
                key: String(index),
                children: (
                    <>
                        <div className={cx('button-motel')}>
                            <Button
                                type='primary'
                                icon={<DeleteOutlined />}
                                onClick={() => onRemoveMotel(item._id)}
                                danger
                            >
                                Xóa nhà trọ
                            </Button>
                            <Button
                                className={cx('btn-edit-motel')}
                                type='primary'
                                icon={<EditOutlined />}
                            >
                                <Link
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                    to={`/motel-room/edit-motel/${item._id}`}
                                >
                                    Sửa nhà trọ
                                </Link>
                            </Button>
                            <Button
                                type='primary'
                                icon={<PlusSquareOutlined />}
                            >
                                <Link
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                    to={'/motel-room/add-room'}
                                >
                                    Thêm phòng trọ
                                </Link>
                            </Button>
                        </div>
                        <div>
                            <ListRoom motelId={item._id} />
                        </div>
                    </>
                ),
            };
        }),
    ];
    return (
        <div>
            <div className={cx('button-motel')}>
                <Button
                    href='/motel-room/customer'
                    type='primary'
                    icon={<PlusSquareOutlined />}
                >
                    Khách thuê
                </Button>
                <Button type='primary' icon={<PlusSquareOutlined />}>
                    <Link
                        to={'/motel-room/add-motel'}
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        Thêm nhà trọ
                    </Link>
                </Button>
            </div>
            <Tabs activeKey={tab} onChange={setTab} items={listMotel}></Tabs>
        </div>
    );
};

export default Motel;
