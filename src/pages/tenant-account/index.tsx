import React, { useState } from 'react';
import { Button, Modal, PageHeader, Space, Table } from 'antd';
import { DeleteOutlined, KeyOutlined } from '@ant-design/icons';

import styles from './TenantAccount.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
const TenantAccount = () => {
    const [listAccount, setListAccount] = useState([
        {
            motelID: { name: 'Nhà 1' },
            roomName: 'P01',
            customerName: 'Khach 01',
            email: 'Email@gmail.com',
        },
    ]);
    const ColumnsData: ColumnTypes[number][] = [
        {
            title: 'Nhà',
            dataIndex: ['motelID', 'name'],
            key: 'name',
        },
        {
            title: 'Phòng',
            dataIndex: ['roomName'],
            key: 'roomName',
        },
        {
            title: 'Khách thuê',
            dataIndex: ['customerName'],
            key: 'customerName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: (id: string) => {
                return (
                    <Space>
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<KeyOutlined />}
                            title='Reset'
                            onClick={() => handleResetPassword()}
                        ></Button>
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<DeleteOutlined />}
                            title='Xóa'
                            onClick={() => handleDeleteAccount()}
                            danger
                        />
                    </Space>
                );
            },
        },
    ];
    const handleResetPassword = async () => {
        Modal.confirm({
            centered: true,
            title: `Bạn có muốn reset password không ?`,
            cancelText: 'Cancel',
            okText: 'Lưu',
            onOk: async () => {
                //
            },
        });
    };
    const handleDeleteAccount = async () => {
        Modal.confirm({
            centered: true,
            title: `Bạn có muốn xóa tài khoản không ?`,
            cancelText: 'Cancel',
            okText: 'Lưu',
            onOk: async () => {
                //
            },
        });
    };
    return (
        <div>
            <PageHeader
                className={cx('header-top')}
                ghost={true}
                title='Danh sách tài khoản'
            />
            <Table columns={ColumnsData} dataSource={listAccount} />
        </div>
    );
};

export default TenantAccount;
