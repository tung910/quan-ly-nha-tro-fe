/* eslint-disable no-console */
import classNames from 'classnames/bind';
import styles from './Water.module.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Button,
    Col,
    PageHeader,
    Row,
    Form,
    DatePicker,
    Select,
    Table,
    InputNumber,
    Modal,
    message,
} from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { SearchOutlined, CheckOutlined, SaveOutlined } from '@ant-design/icons';
import { getStatisticalRoomStatus } from '~/api/room.api';
import { IDataWater } from '~/types/DataWater.type';
import { MotelType } from '~/types/MotelType';
import { getAllMotel } from '~/api/motel.api';
import { editDataWater, listDataWater } from '~/api/data-water.api';
import { MESSAGES } from '~/constants/message.const';
import moment from 'moment';

const cx = classNames.bind(styles);
const { Option } = Select;
const dateFormat = 'MM/YYYY';

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
    dataIndex: keyof IDataWater;
    record: IDataWater;
    handleSave: (record: IDataWater) => void;
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
    const inputRef = useRef<HTMLInputElement>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
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
            handleSave({
                ...record,
                ...values,
                useValue: values.newValue
                    ? values.newValue - record.oldValue
                    : record.newValue - values.oldValue,
            });
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
                        message: `${dataIndex} is required.`,
                    },
                ]}
            >
                <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
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

const ColumnsDataWater: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: any;
})[] = [
    {
        title: 'Nhà',
        dataIndex: ['motelID', 'name'],
        key: 'motelID',
    },
    {
        title: 'Phòng',
        dataIndex: 'roomName',
        key: 'roomName',
    },
    {
        title: 'Khách thuê',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Chỉ số cũ',
        dataIndex: 'oldValue',
        key: 'oldValue',
        editable: true,
        render: (oldValue) => {
            return (
                <>
                    <InputNumber value={oldValue} />
                </>
            );
        },
    },
    {
        title: 'Chỉ số mới',
        dataIndex: 'newValue',
        key: 'newValue',
        editable: true,
        render: (newValue) => {
            return (
                <>
                    <InputNumber value={newValue} />
                </>
            );
        },
    },
    {
        title: 'Sử dụng',
        dataIndex: 'useValue',
        key: 'useValue',
    },
    {
        title: '',
        dataIndex: 'recond',
        render: (text, record) => {
            return (
                <>
                    <Button
                        htmlType='submit'
                        type='primary'
                        icon={<SaveOutlined />}
                        onClick={() => handleSubmitData(record)}
                    >
                        Lưu
                    </Button>
                </>
            );
        },
    },
];
function handleSubmitData(record: any) {
    if (record.useValue < 0) {
        Modal.error({
            title: 'Thông báo',
            content: 'Chỉ số nước mới phải lớn hơn chỉ số nước mới',
        });
    } else {
        Modal.confirm({
            centered: true,
            title: `Bạn có đồng ý lưu chỉ số nước ${record.roomName} trong tháng 09/2022 không ?`,
            cancelText: 'Cancel',
            okText: 'Lưu',
            onOk: () => handSubmitData(record),
        });
    }
}
const handSubmitData = async (record: any) => {
    const tempData = {
        _id: record._id,
        motelID: record.motelID,
        roomName: record.roomName,
        customerName: record.customerName,
        oldValue: record.oldValue,
        newValue: record.newValue,
        useValue: record.useValue,
    };
    await editDataWater({ data: tempData });
    message.success(MESSAGES.EDIT_SUCCESS);
};

function handleSaveAll(datawater: any) {
    Modal.confirm({
        centered: true,
        title: `Bạn có đồng ý lưu chỉ số nước của tháng 09/2022 cho toàn bộ các phòng của nhà đang chọn không ?`,
        cancelText: 'Cancel',
        okText: 'Lưu',
        onOk: () => handleSaveAllData(datawater),
    });
}

const handleSaveAllData = (datawater: any) => {
    datawater.map(async (item: any) => {
        await editDataWater({ data: item });
    });
    message.success(MESSAGES.EDIT_SUCCESS);
};
const PowerOnly = () => {
    const [dataWater, setDataWater] = useState<IDataWater[]>([]);
    const [listNameMotel, setListNameMotel] = useState<MotelType[]>([]);
    const [listStatusRoom, setListStatusRoom] = useState([]);
    const thisMonth = moment(new Date()).format('MM');
    useEffect(() => {
        const listMotelRoom = async () => {
            const { data } = await listDataWater({ month: thisMonth });

            setDataWater(data);
        };

        listMotelRoom();
        const getListData = async () => {
            const { data } = await getAllMotel();
            setListNameMotel(data);
        };
        getListData();

        const getListDataStatus = async () => {
            const { data } = await getStatisticalRoomStatus();
            setListStatusRoom(data);
        };
        getListDataStatus();
    }, []);
    const handleSave = (row: IDataWater) => {
        const newData = [...dataWater];
        const index = newData.findIndex((item) => row._id === item._id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataWater(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = ColumnsDataWater.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IDataWater) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                handleSave,
            }),
        };
    });

    return (
        <div>
            <div>
                <PageHeader
                    className={cx('header-top')}
                    title='Chỉ số nước'
                    extra={[
                        <Button icon={<SearchOutlined />} key={1}>
                            Xem
                        </Button>,
                        <Button
                            onClick={() => handleSaveAll(dataWater)}
                            type='primary'
                            icon={<CheckOutlined />}
                            key={2}
                        >
                            Lưu thông tin
                        </Button>,
                    ]}
                ></PageHeader>
            </div>

            <div className={cx('header-bottom')}>
                <Row gutter={[8, 8]}>
                    <Col span={6}>
                        <Form.Item label={<>Tháng/năm</>} colon={false}>
                            <DatePicker
                                defaultValue={moment()}
                                format={dateFormat}
                                name='date'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={<>Kỳ</>} colon={false}>
                            <Select
                                style={{ width: 150 }}
                                defaultValue='Tất cả'
                                showSearch
                            >
                                <Option value={2}>Kỳ 30</Option>
                                <Option value={3}>Kỳ 15</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={<>Nhà</>} colon={false}>
                            <Select
                                style={{ width: 150 }}
                                defaultValue='Tất cả'
                                showSearch
                            >
                                {listNameMotel &&
                                    listNameMotel.map((item, index) => {
                                        return (
                                            <Option
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={<>Trạng thái nhà</>} colon={false}>
                            <Select
                                style={{ width: 150 }}
                                defaultValue='Tất cả'
                                showSearch
                            >
                                {listStatusRoom &&
                                    listStatusRoom.map((item: any, index) => {
                                        return (
                                            <Option key={index}>
                                                {item.statusName}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </div>

            <div>
                <Table
                    components={components}
                    dataSource={dataWater}
                    columns={columns as ColumnTypes}
                />
            </div>
        </div>
    );
};

export default PowerOnly;
