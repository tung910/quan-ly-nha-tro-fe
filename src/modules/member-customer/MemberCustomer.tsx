import { Button, DatePicker, Input, Popconfirm, Select, Table } from 'antd';
import { useState } from 'react';
const { Option } = Select;

const MemberCustomer = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [count, setCount] = useState(2);

    const handleDelete = (key: any) => {
        const newData = dataSource.filter((item: any) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'date',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
        },
        {
            title: 'CMND/ CCCD',
            dataIndex: 'cmnd',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Số xe',
            dataIndex: 'carNumber',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (record: any) =>
                dataSource.length >= 1 ? (
                    <Popconfirm
                        title='Sure to delete?'
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData = {
            key: count,
            name: <Input />,
            date: <DatePicker />,
            gender: (
                <Select value={'Nam'}>
                    <Option value='1'>Nam</Option>
                    <Option value='2'>Nữ</Option>
                    <Option value='3'>Khác</Option>
                </Select>
            ),
            cmnd: <Input />,
            address: <Input />,
            phoneNumber: <Input />,
            carNumber: <Input />,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    return (
        <div>
            <Button
                onClick={handleAdd}
                type='primary'
                style={{
                    marginBottom: 16,
                }}
            >
                Add a row
            </Button>
            <Table bordered dataSource={dataSource} columns={defaultColumns} />
        </div>
    );
};

export default MemberCustomer;
