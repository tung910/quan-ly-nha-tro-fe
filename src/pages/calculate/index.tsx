/* eslint-disable no-console */
import classNames from 'classnames/bind';
import styles from './Calculate.module.scss';
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
    Input,
} from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { SearchOutlined, CalculatorOutlined } from '@ant-design/icons';
import { getStatisticalRoomStatus, getListRooms } from '~/api/room.api';
import { IDataWater } from '~/types/DataWater.type';
import { MotelType } from '~/types/MotelType';
import { getAllMotel } from '~/api/motel.api';
import moment from 'moment';
import { RoomType } from '~/types/RoomType';

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
        title: '',
        dataIndex: 'recond',
        // render: (text, record) => {
        //     return (
        //         <>
        //             <Button
        //                 htmlType='submit'
        //                 type='primary'
        //                 icon={<SaveOutlined />}
        //                 onClick={() => handleSubmitData(record)}
        //             >
        //                 Lưu
        //             </Button>
        //         </>
        //     );
        // },
    },
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
        title: 'Số tiền',
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
        title: 'Đã trả',
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
        title: 'Còn lại',
        dataIndex: 'useValue',
        key: 'useValue',
    },
];

const Calculate = () => {
    const [form] = Form.useForm();

    const [listNameMotel, setListNameMotel] = useState<MotelType[]>([]);
    const [listNameRoom, setListNameRoom] = useState<RoomType[]>([]);
    const [listStatusRoom, setListStatusRoom] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [motelId, setMotelId] = useState();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = (values: any) => {
        const data = {
            ...values,
            invoiceDate: moment(values.invoiceDate).format('DD/MM/YYYY'),
            month: moment(values.month).format('MM/YYYY'),
        };
        console.log(data);

        setIsModalOpen(false);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const onClickMotel = () => {
        console.log('ahiii');
    };
    useEffect(() => {
        const getListMotel = async () => {
            const { data } = await getAllMotel();
            setListNameMotel(data);
        };
        getListMotel();
        // const getListRoom = async () => {
        //     const { data } = await getListRooms();
        //     setListNameRoom(data);
        // };
        // // getListRoom();
        const getListDataStatus = async () => {
            const { data } = await getStatisticalRoomStatus();
            setListStatusRoom(data);
        };
        getListDataStatus();
    }, []);

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
            }),
        };
    });

    return (
        <div>
            <div>
                <PageHeader
                    className={cx('header-top')}
                    title='Tính Tiền'
                    extra={[
                        <Button icon={<SearchOutlined />} key={1}>
                            Xem
                        </Button>,
                        <Button
                            type='primary'
                            icon={<CalculatorOutlined />}
                            key={2}
                            onClick={showModal}
                        >
                            Tính Tiền
                        </Button>,
                    ]}
                >
                    <div>
                        <Modal
                            title='Tính tiền'
                            open={isModalOpen}
                            onOk={form.submit}
                            onCancel={handleCancel}
                            footer={[
                                <Button key='back' onClick={handleCancel}>
                                    Đóng
                                </Button>,
                                <Button
                                    key='submit'
                                    type='primary'
                                    onClick={form.submit}
                                    htmlType='submit'
                                >
                                    Tính Tiền
                                </Button>,
                            ]}
                        >
                            <Form
                                autoComplete='off'
                                form={form}
                                labelCol={{ span: 5 }}
                                onFinish={handleSubmit}
                            >
                                <Form.Item
                                    label={<>Kỳ</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='customerName'
                                >
                                    <Select
                                        style={{ width: 375 }}
                                        placeholder='Tất cả'
                                        showSearch
                                    >
                                        <Option value={2}>Kỳ 30</Option>
                                        <Option value={3}>Kỳ 15</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<>Ngày</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='invoiceDate'
                                    initialValue={moment()}
                                >
                                    <DatePicker
                                        // defaultValue={moment()}
                                        format={'DD/MM/YYYY'}
                                        style={{ width: '375px' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<>Tháng</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='month'
                                    initialValue={moment()}
                                    // format={dateFormat}
                                >
                                    <DatePicker
                                        // defaultValue={moment()}
                                        format={dateFormat}
                                        style={{ width: '375px' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<>Nhà</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='motelID'
                                >
                                    <Select
                                        placeholder='Mời bạn chọn nhà'
                                        showSearch
                                    >
                                        {listNameMotel &&
                                            listNameMotel.map((item, index) => {
                                                return (
                                                    <Option
                                                        key={index}
                                                        value={item._id}
                                                        onClick={onClickMotel}
                                                    >
                                                        {item.name}
                                                    </Option>
                                                );
                                            })}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<>Phòng</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='roomID'
                                >
                                    <Select
                                        placeholder='Mời bạn chọn phòng'
                                        showSearch
                                    >
                                        {listNameRoom &&
                                            listNameRoom.map((item, index) => {
                                                return (
                                                    <Option
                                                        key={index}
                                                        value={item._id}
                                                    >
                                                        {item.roomName}
                                                    </Option>
                                                );
                                            })}
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </PageHeader>
            </div>

            <div className={cx('header-bottom')}>
                <Row gutter={[8, 8]}>
                    <Col span={6}>
                        <Form.Item
                            // initialValue={moment(new Date(), dateFormat)}
                            label={<>Tháng/năm</>}
                            colon={false}
                        >
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
                    key={1}
                    components={components}
                    columns={columns as ColumnTypes}
                />
            </div>
        </div>
    );
};

export default Calculate;
