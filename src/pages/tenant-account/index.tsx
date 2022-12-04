import { KeyOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, PageHeader, Space, message } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { changePassword, getAllAccount } from '~/api/auth.api';
import Table from '~/components/table';
import { MESSAGES } from '~/constants/message.const';

import styles from './TenantAccount.module.scss';

const cx = classNames.bind(styles);
type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
const TenantAccount = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listAccount, setListAccount] = useState([]);
    const [idAccount, setIdAccount] = useState<string>('');
    const ColumnsData: ColumnTypes[number][] = [
        {
            title: 'Nhà',
            dataIndex: ['motelRoomID', 'motelID', 'name'],
            key: 'name',
        },
        {
            title: 'Phòng',
            dataIndex: ['motelRoomID', 'roomName'],
            key: 'roomName',
        },
        {
            title: 'Khách thuê',
            dataIndex: ['name'],
            key: 'name',
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
                            icon={<LockOutlined />}
                            title='Khóa'
                            onClick={() => handleLockAccount(id)}
                            danger
                        />
                    </Space>
                );
            },
        },
    ];
    const handleLockAccount = async (id: string) => {
        Modal.confirm({
            centered: true,
            title: `Khi khóa tài khoản thì tài khoản này không thể đăng nhập được nữa. Bạn có muốn khóa không?`,
            cancelText: 'Hủy',
            okText: 'Khóa',
        });
    };
    useEffect(() => {
        const getAccount = async () => {
            const acc: any = [];
            const { data } = await getAllAccount();
            data.map((item: any) => {
                if (item.role === 0) {
                    acc.push(item);
                }
            });
            setListAccount(acc);
        };
        getAccount();
    }, []);
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
