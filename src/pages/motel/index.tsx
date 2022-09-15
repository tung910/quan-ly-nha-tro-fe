/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Tabs, Card } from 'antd';
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { getAllMotel } from '~/api/Motel';
import { MotelType } from '~/types/Model';
const Motel = () => {
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
