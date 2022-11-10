import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, PageHeader, Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { RootState } from '~/app/store';
import Table from '~/components/table';
import { MESSAGES } from '~/constants/message.const';
import { deleteService, fetchService } from '~/feature/service/serviceSlice';
import { generatePriceToVND } from '~/utils/helper';

const ServicePage = () => {
    const dispatch = useAppDispatch();
    const serviceStore = useAppSelector(
        (state: RootState) => state.service.value
    );
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const handleRemove = (_id?: string[]) => {
        Modal.confirm({
            centered: true,
            title: `Bạn có muốn xóa dịch vụ không!`,
            cancelText: 'Hủy',
            okText: 'Xóa',
            onOk: async () => {
                if (_id && _id?.length > 0) {
                    dispatch(deleteService({ data: _id }));
                } else {
                    dispatch(deleteService({ data: selectedRowKeys }));
                }
                message.success(MESSAGES.DEL_SUCCESS);
            },
        });
    };
    const columnsService: ColumnsType = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
        },

        {
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            render: (price) => {
                return <>{generatePriceToVND(price)}</>;
            },
        },

        {
            title: '',
            width: '5%',
            dataIndex: '_id',
            render: (id) => {
                return (
                    <Space>
                        <Tooltip title='Chỉnh sửa'>
                            <Link to={'edit-service?serviceId=' + id}>
                                <Button
                                    type='primary'
                                    icon={<EditOutlined />}
                                ></Button>
                            </Link>
                        </Tooltip>
                        <Tooltip title='Xóa'>
                            <Button
                                type='primary'
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleRemove([id])}
                            ></Button>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];

    const rowSelection = {
        type: selectedRowKeys,
        onChange: onSelectChange,
    };
    useEffect(() => {
        dispatch(fetchService());
    }, [dispatch]);

    return (
        <div>
            <div>
                <PageHeader
                    ghost={true}
                    title='Danh sách dịch vụ'
                    extra={[
                        <Button type='primary' key={1} icon={<PlusOutlined />}>
                            <Link
                                to='add-service'
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Thêm dịch vụ
                            </Link>
                        </Button>,

                        selectedRowKeys.length > 0 && (
                            <Button
                                type='primary'
                                danger
                                key={2}
                                icon={<DeleteOutlined />}
                                onClick={() => handleRemove()}
                            ></Button>
                        ),
                    ]}
                ></PageHeader>
            </div>
            <div>
                <Table
                    columns={columnsService}
                    dataSource={serviceStore}
                    rowSelection={rowSelection}
                />
            </div>
        </div>
    );
};

export default ServicePage;
