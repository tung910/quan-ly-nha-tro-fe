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
import { TypeServiceCustomer } from '~/types/Customer';
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
type Props = {
    onGetService: (data: TypeServiceCustomer[]) => void;
};

const ServiceCustomer = ({ onGetService }: Props) => {
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
    const [state, setstate] = useState([]);
    const [getService, setGetService] = useState([]);
    useEffect(() => {
        const getData = fetch('http://localhost:3001/service')
            .then((res) => res.json())
            .then((data) => {
                const dataSelected = data.map((item: DataType) => item.key);
                setSelectedRow(dataSelected);
                setstate(
                    data.map((row: TypeServiceCustomer) => ({
                        key: row.key,
                        name: row.name,
                        price: row.price,
                        number: row.number,
                    }))
                );
            });
    }, []);
    const handleSelectRows = (selectedRowKeys: any[], selectedRows: any) => {
        setGetService(selectedRows);
        setSelectedRow(selectedRowKeys);
    };

    if (getService.length > 0) {
        onGetService(getService);
    } else {
        onGetService(state);
    }
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
