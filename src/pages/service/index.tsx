import { Button, Checkbox, PageHeader, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Table from '~/components/table';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { fetchService } from '~/feature/service/serviceSlice';
import { generatePriceToVND } from '~/utils/helper';
const columnsService: ColumnsType = [
    {
        title: 'Tên dịch vụ',
        dataIndex: 'serviceName',
    },
    {
        title: 'Loại dịch vụ',
        dataIndex: 'serviceTypeName',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'unitPrice',
        render: (price) => {
            return <>{generatePriceToVND(price)}</>;
        },
    },
    {
        title: 'Đang dùng',
        dataIndex: 'isActive',
        render: (isActive) => {
            return (
                <>
                    <Checkbox checked={isActive} disabled />
                </>
            );
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
                        <Link to={'edit/' + id}>
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
                        ></Button>
                    </Tooltip>
                </Space>
            );
        },
    },
];

const ServicePage = () => {
    const dispatch = useAppDispatch();
    const serviceStore = useAppSelector((state) => state.service.value);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
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
                            <Link to='add'>Thêm dịch vụ</Link>
                        </Button>,
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
