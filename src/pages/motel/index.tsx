/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Tabs, Card, Button, Row, Col } from 'antd';
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    PlusSquareOutlined,
    CloseSquareOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { getAllMotel, removeMotel } from '~/api/Motel';
import { MotelType } from '~/types/Model';
import styles from './Motel.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Motel = () => {
    const [motels, setMotels] = useState<MotelType[]>([]);
    useEffect(() => {
        const getMotels = async () => {
            const { data } = await getAllMotel();
            setMotels(data);
        };
        getMotels();
    }, []);
    const onRemoveMotel = async (id: string) => {
        const confirm = window.confirm('Bạn muốn xóa không?');
        if (confirm) {
            await removeMotel(id);
            setMotels(motels.filter((item) => item.id !== id));
        }
    };
    return (
        <div>
            <div className={cx('button-motel')}>
                <Button
                    href='/motel-room/add-motel'
                    type='primary'
                    icon={<PlusSquareOutlined />}
                >
                    Thêm nhà trọ
                </Button>
            </div>
            <Tabs defaultActiveKey='1'>
                {motels &&
                    motels.map((item, index) => {
                        return (
                            <Tabs.TabPane tab={item.name} key={index}>
                                <div className={cx('button-motel')}>
                                    <Button
                                        type='primary'
                                        icon={<DeleteOutlined />}
                                        onClick={() => onRemoveMotel(item.id)}
                                        danger
                                    >
                                        Xóa nhà trọ
                                    </Button>
                                    <Button
                                        className={cx('btn-edit-motel')}
                                        type='primary'
                                        icon={<EditOutlined />}
                                        href={`/motel-room/edit-motel/${item.id}`}
                                    >
                                        Sửa nhà trọ
                                    </Button>
                                    <Button
                                        type='primary'
                                        icon={<PlusSquareOutlined />}
                                    >
                                        Thêm phòng trọ
                                    </Button>
                                </div>
                                <Card
                                    title='Phòng 1'
                                    hoverable
                                    extra={<a href='#'>Xem chi tiết</a>}
                                    style={{ width: 300 }}
                                >
                                    <Col span={8}>
                                        <Button
                                            type='primary'
                                            icon={<PlusSquareOutlined />}
                                        >
                                            Thêm khách
                                        </Button>
                                    </Col>
                                    <p>Số lượng khách</p>
                                    <p>Giá phòng</p>
                                    <Row>
                                        <Col span={8}>
                                            <Button
                                                type='primary'
                                                icon={<EditOutlined />}
                                            >
                                                Sửa
                                            </Button>
                                        </Col>
                                        <Col span={8}>
                                            <Button
                                                type='primary'
                                                icon={<DeleteOutlined />}
                                                danger
                                            >
                                                Xóa
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Tabs.TabPane>
                        );
                    })}
            </Tabs>
        </div>
    );
};

export default Motel;
