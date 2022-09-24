/* eslint-disable no-console */
import { Form, Input, InputRef, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IService } from '~/types/Service.type';
import styles from './Service.module.scss';
import classNames from 'classnames/bind';
import { getAllService } from '~/api/service.api';
import { generatePriceToVND } from '~/utils/helper';
import { FormInstance } from 'antd/es/form/Form';
const cx = classNames.bind(styles);

const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof IService;
    record: IService;
    handleSave: (record: IService) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            console.log(record);
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className='editable-cell-value-wrap'
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
})[] = [
    {
        title: 'Dịch vụ sử dụng',
        dataIndex: 'serviceName',
        key: 'serviceName',
        width: 500,
    },
    {
        title: 'Đơn giá (VNĐ)',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        editable: true,
        render: (price) => {
            return (
                <>
                    <Input name='unitPrice' value={generatePriceToVND(price)} />
                </>
            );
        },
    },
    {
        title: 'Number',
        dataIndex: 'quantity',
        key: 'quantity',
        editable: true,
        render: (numbers) => {
            return (
                <>
                    <Input name='quantity' value={numbers} />
                </>
            );
        },
    },
];
type Props = {
    onGetService: (data: IService[]) => void;
};

const ServiceCustomer = ({ onGetService }: Props) => {
    const [state, setstate] = useState<IService[]>([]);
    const [getServiceCustomer, setServiceCustomer] = useState([]);
    useEffect(() => {
        const getServices = async () => {
            const { data } = await getAllService();
            const dataSelected = data.map((item: IService) => {
                if (item.isActive) {
                    const result = { ...item, quantity: 1 };
                    return result;
                }
            });
            setstate(dataSelected);
        };
        getServices();
    }, []);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const onSelectChange = (newSelectedRowKeys: any, record: any) => {
        setServiceCustomer(record);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    if (state.length > 0) {
        onGetService(getServiceCustomer);
    } else {
        onGetService(state);
    }

    const handleSave = (row: IService) => {
        const newData = [...state];
        const index = newData.findIndex((item) => row._id === item._id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setstate(newData);
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
            onCell: (record: IService) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                handleSave,
            }),
        };
    });
    return (
        <div className={cx('service')}>
            <Table
                components={components}
                columns={columns as ColumnTypes}
                dataSource={state}
                rowSelection={rowSelection}
                rowKey='_id'
            />
        </div>
    );
};

export default ServiceCustomer;
