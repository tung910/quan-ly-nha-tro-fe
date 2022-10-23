import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    PageHeader,
    Space,
    Table,
    message,
} from 'antd';
import { DeleteOutlined, KeyOutlined } from '@ant-design/icons';

import styles from './TenantAccount.module.scss';
import classNames from 'classnames/bind';
import { changePassword, getAllAccount } from '~/api/auth.api';
import { MESSAGES } from '~/constants/message.const';
const cx = classNames.bind(styles);
type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
const TenantAccount = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listAccount, setListAccount] = useState([]);
    const [idAccount, setIdAccount] = useState<string>();
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
                            onClick={() => {
                                setIsModalOpen(true);
                                setIdAccount(id);
                            }}
                        ></Button>
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<DeleteOutlined />}
                            title='Xóa'
                            onClick={() => handleDeleteAccount(id)}
                            danger
                        />
                    </Space>
                );
            },
        },
    ];
    const handleChangePassword = async (value: string) => {
        await changePassword(idAccount, value);
        form.resetFields();
        setIsModalOpen(false);
        message.success(MESSAGES.CHANGE_PASSWORD);
    };
    const handleDeleteAccount = async (id: string) => {
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
    useEffect(() => {
        const getAccount = async () => {
            const { data } = await getAllAccount();
            setListAccount(data);
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
            <Modal
                title='Nhập mật khẩu mời'
                open={isModalOpen}
                onOk={form.submit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form
                    autoComplete='off'
                    form={form}
                    labelCol={{ span: 5 }}
                    onFinish={handleChangePassword}
                >
                    <Form.Item
                        colon={false}
                        labelAlign='left'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input
                            type='password'
                            placeholder='Mời bạn nhập mật khẩu'
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TenantAccount;
