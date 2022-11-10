import { KeyOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, PageHeader, Space } from 'antd';
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
                            icon={<KeyOutlined />}
                            title='Đổi mật khẩu'
                            onClick={() => {
                                setIsModalOpen(true);
                                setIdAccount(id);
                            }}
                        ></Button>
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
    const handleChangePassword = async (value: string) => {
        await changePassword(idAccount, value);
        form.resetFields();
        setIsModalOpen(false);
        message.success(MESSAGES.CHANGE_PASSWORD);
    };
    const handleLockAccount = async (id: string) => {
        Modal.confirm({
            centered: true,
            title: `Khi khóa tài khoản thì tài khoản này không thể đăng nhập được nữa. Bạn có muốn khóa không?`,
            cancelText: 'Hủy',
            okText: 'Khóa',
            // onOk: async () => {
            //     await deleteAccount(id);
            //     setListAccount(
            //         listAccount.filter((item: any) => item._id !== id)
            //     );
            //     message.success(MESSAGES.DEL_SUCCESS);
            // },
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
                title='Nhập mật khẩu mới'
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
