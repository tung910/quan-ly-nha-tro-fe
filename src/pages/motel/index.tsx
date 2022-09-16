/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Tabs, Card, Button } from 'antd';
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    PlusSquareOutlined,
    CloseSquareOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { getAllMotel } from '~/api/Motel';
import { MotelType } from '~/types/Model';
import styles from './Motel.module.scss';
import classNames from 'classnames/bind';
const Motel = () => {
    const cx = classNames.bind(styles);

    const [motels, setMotels] = useState<MotelType[]>([]);
    useEffect(() => {
        const getMotels = async () => {
            const { data } = await getAllMotel();
            setMotels(data);
        };
        getMotels();
    }, []);
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
                <Button type='primary' icon={<DeleteOutlined />} danger>
                    Xóa nhà trọ
                </Button>
                <Button
                    className={cx('btn-edit-motel')}
                    type='primary'
                    icon={<EditOutlined />}
                >
                    Sửa nhà trọ
                </Button>
                <Button type='primary' icon={<CloseSquareOutlined />}>
                    Thêm phòng trọ
                </Button>
            </div>
            <Tabs defaultActiveKey='1'>
                {motels &&
                    motels.map((item, index) => {
                        return (
                            <Tabs.TabPane tab={item.name} key={index}>
                                <Card
                                    title='Phòng 1'
                                    hoverable
                                    extra={<a href='#'>Xem chi tiết</a>}
                                    style={{ width: 300 }}
                                    actions={[
                                        <SettingOutlined key='setting' />,
                                        <EditOutlined key='edit' />,
                                        <EllipsisOutlined key='ellipsis' />,
                                    ]}
                                >
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Tabs.TabPane>
                        );
                    })}
            </Tabs>
        </div>
    );
};

export default Motel;
