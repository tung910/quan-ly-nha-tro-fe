import { Form, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getService } from '../../api/customer';
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
    const [getServiceCustomer, setServiceCustomer] = useState([]);
    useEffect(() => {
        const getServices = async () => {
            const { data } = await getService();
            const dataSelected = data.map(
                (item: TypeServiceCustomer) => item.key
            );
            setSelectedRow(dataSelected);
            setstate(data);
        };
        getServices();
    }, []);
    const handleSelectRows = (selectedRowKeys: any[], selectedRows: any) => {
        setServiceCustomer(selectedRows);
        setSelectedRow(selectedRowKeys);
    };

    if (getService.length > 0) {
        onGetService(getServiceCustomer);
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
