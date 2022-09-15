import { Form, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
interface DataType {
    key: React.Key;
    name: string;
    price: number;
    number: number;
}
import styles from './Service.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const columns: ColumnsType<DataType> = [
    {
        title: 'Dịch vụ sử dụng',
        dataIndex: 'name',
        render: (text: string) => <a>{text}</a>,
        width: 500,
    },
    {
        title: 'Đơn giá (VNĐ)',
        dataIndex: 'price',
        render: (price: number) => (
            <Form.Item>
                <Input value={price} />
            </Form.Item>
        ),
    },
    {
        title: 'Number',
        dataIndex: 'number',
        render: (numbers: number) => (
            <Form.Item>
                <Input value={numbers} />
            </Form.Item>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'Điện',
        price: 3000,
        number: 1,
    },
    {
        key: '2',
        name: 'Nước',
        price: 20000,
        number: 1,
    },
    {
        key: '3',
        name: 'Gửi xe máy',
        price: 80000,
        number: 1,
    },
    {
        key: '4',
        name: 'Rác',
        price: 50000,
        number: 1,
    },
];
const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        selectedRows;
    },
    getCheckboxProps: (record: DataType) => ({
        name: record.name,
    }),
};

const ServiceCustomer = () => {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
        'checkbox'
    );
    return (
        <div className={cx('service')}>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default ServiceCustomer;
