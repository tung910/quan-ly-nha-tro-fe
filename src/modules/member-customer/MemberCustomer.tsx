/* eslint-disable indent */
import {
    Button,
    DatePicker,
    Form,
    Input,
    Popconfirm,
    Select,
    Table,
} from 'antd';
import moment from 'moment';
import React, {
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import { ACTION } from '~/constants/member.const';
import { DataTable } from '~/types/Member.type';

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
            const result = { ...record, ...values };
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            // console.log('Save failed:', errInfo);
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
                    <Select ref={inputRef} defaultValue='1' onBlur={save}>
                        <Select.Option value='1'>Nam</Select.Option>
                        <Select.Option value='2'>Nữ</Select.Option>
                    </Select>
                ) : dataIndex === 'date' ? (
                    <DatePicker
                        ref={inputRef}
                        onBlur={save}
                        format={dateFormat}
                    />
                ) : (
                    <Input onBlur={save} onPressEnter={save} ref={inputRef} />
                )}
            </Form.Item>
        ) : (
            <div className='editable-cell-value-wrap' onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};
type Props = {
    onGetMember: (dataSource: any) => void;
    roomRentID: string;
    newdataMember: any;
};
const reducer = (data: any, action: { type: string; payload: any }) => {
    switch (action.type) {
        case ACTION.ADD: {
            const datas: DataTable[] = [];
            [...data, action.payload].map((e, index) => {
                datas.push({ ...e, index });
            });
            return datas;
        }
        case ACTION.DELETE:
            return data.filter(
                (e: DataTable) => e.index !== action.payload.index
            );
        case ACTION.CHANGE: {
            const newData = [...data];
            const index = newData.findIndex(
                (item) => action.payload.index === item.index
            );
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...action.payload });
            return newData;
        }
        case ACTION.SET:
            return action.payload;
    }
};

const MemberCustomer = ({ onGetMember, roomRentID, newdataMember }: Props) => {
    const [dataSource, dispatch] = useReducer(reducer, []);

    const handleDelete = (record: any) => {
        dispatch({ type: ACTION.DELETE, payload: record });
    };

    const defaultColumns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            render: (name: any) => <Input value={name} />,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'date',
            key: 'date',
            editable: true,
            render: (date: any) => (
                <DatePicker value={date ? moment(date, dateFormat) : date} />
            ),
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            editable: true,
            render: (gender: any) => (
                <>
                    <Select placeholder='Giới tính' value={gender}>
                        <Select.Option value='1'>Nam</Select.Option>
                        <Select.Option value='2'>Nữ</Select.Option>
                    </Select>
                </>
            ),
        },
        {
            title: 'CMND/ CCCD',
            dataIndex: 'cmnd',
            key: 'cmnd',
            editable: true,
            render: (cmnd: any) => <Input value={cmnd} maxLength={12} />,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            editable: true,
            render: (address: any) => <Input value={address} />,
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            editable: true,
            render: (phoneNumber: any) => (
                <Input value={phoneNumber} maxLength={10} />
            ),
        },
        {
            title: 'Số xe',
            dataIndex: 'carNumber',
            key: 'carNumber',
            editable: true,
            render: (carNumber: any) => <Input value={carNumber} />,
        },
        {
            title: '',
            dataIndex: 'operation',
            key: 'operation',
            render: (_: any, record: any) =>
                dataSource!.length >= 1 ? (
                    <Popconfirm
                        title='Bạn có chắc muốn xóa'
                        onConfirm={() => handleDelete(record)}
                    >
                        <a>Xóa</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData = {
            name: '',
            date: '',
            gender: '',
            cmnd: '',
            address: '',
            phoneNumber: '',
            carNumber: '',
        };
        dispatch({ type: ACTION.ADD, payload: newData });
    };

    const handleSave = (row: DataTable) => {
        dispatch({ type: ACTION.CHANGE, payload: row });
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

    useEffect(() => {
        if (roomRentID) {
            dispatch({ type: ACTION.SET, payload: newdataMember });
        }
    }, [roomRentID]);
    onGetMember(dataSource);
    return (
        <div>
            <Button
                onClick={handleAdd}
                type='primary'
                style={{
                    marginBottom: 16,
                }}
            >
                Thêm
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
