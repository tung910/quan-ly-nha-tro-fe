import { Form, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
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

const ServiceCustomer = () => {
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
    const [state, setstate] = useState([]);

    useEffect(() => {
        const getData = fetch('http://localhost:3001/service')
            .then((res) => res.json())
            .then((data) =>
                setstate(
                    data.map((row: any) => ({
                        key: row.key,
                        name: row.name,
                        price: row.price,
                        number: row.number,
                    }))
                )
            );
        const dataSelected = state.map((item: DataType) => item.key);
        console.log(dataSelected);
        setSelectedRow(dataSelected);
    }, []);

    // useEffect(() => {}, []);
    const handleSelectRows = (selectedRowKeys: any[], selectedRows: any) => {
        setSelectedRow(selectedRowKeys);
    };
    return (
        <div className={cx('service')}>
            <Table
                rowSelection={{
                    onChange: handleSelectRows,
                    selectedRowKeys: selectedRow,
                }}
                columns={columns}
                dataSource={state}
            />
        </div>
    );
};

export default ServiceCustomer;
