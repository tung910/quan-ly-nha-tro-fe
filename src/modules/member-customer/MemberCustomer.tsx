import {
    Button,
    DatePicker,
    Form,
    Input,
    Popconfirm,
    Select,
    Table,
} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const { Option } = Select;

const EditableContext = React.createContext<any>(null);
const dateFormat = 'YYYY-MM-DD';

const EditableRow = ({ index, ...props }: any) => {
    const [form] = Form.useForm();

    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}: any) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<any>(null);
    const form = useContext<any>(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                    padding: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                {dataIndex === 'gender' ? (
                    <Select ref={inputRef} onBlur={save}>
                        <Option value='1'>Nam</Option>
                        <Option value='2'>Nữ</Option>
                    </Select>
                ) : dataIndex === 'date' ? (
                    <Form.Item>
                        <DatePicker
                            name='date'
                            ref={inputRef}
                            onBlur={save}
                            format={dateFormat}
                        />
                    </Form.Item>
                ) : (
                    <Form.Item>
                        <Input
                            onBlur={save}
                            onPressEnter={save}
                            ref={inputRef}
                        />
                    </Form.Item>
                )}
            </Form.Item>
        ) : (
            <div
                className='editable-cell-value-wrap'
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const MemberCustomer = () => {
    const [dataSource, setDataSource] = useState<any>([]);
    const [count, setCount] = useState(2);

    const handleDelete = (key: string | number) => {
        const newData = dataSource.filter((item: any) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'date',
            editable: true,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            editable: true,
        },
        {
            title: 'CMND/ CCCD',
            dataIndex: 'cmnd',
            editable: true,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            editable: true,
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phoneNumber',
            editable: true,
        },
        {
            title: 'Số xe',
            dataIndex: 'carNumber',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: any) =>
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
    const handleSave = (row: any) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: any) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
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
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
};

export default MemberCustomer;
