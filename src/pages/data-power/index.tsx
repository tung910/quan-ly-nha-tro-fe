import {
    CheckOutlined,
    DollarCircleOutlined,
    SaveOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    InputNumber,
    Modal,
    PageHeader,
    Row,
    Select,
    Table,
} from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import classNames from 'classnames/bind';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { editDataPower, listDataPower } from '~/api/data-power.api';
import { getAllMotel } from '~/api/motel.api';
import { getStatisticalRoomStatus } from '~/api/room.api';
import { useAppDispatch } from '~/app/hooks';
import notification from '~/components/notification';
import { DateFormat } from '~/constants/const';
import { MESSAGES } from '~/constants/message.const';
import { setIsLoading } from '~/feature/service/appSlice';
import { IDataPower } from '~/types/DataPower.type';
import { MotelType } from '~/types/MotelType';
import { generatePriceToVND } from '~/utils/helper';

import styles from './DataPower.module.scss';

const cx = classNames.bind(styles);
const { Option } = Select;

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
    dataIndex: keyof IDataPower;
    record: IDataPower;
    handleSave: (record: IDataPower) => void;
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
                    ? values.newValue - record.oldValue || 0
                    : record.newValue - values.oldValue || 0,
            });
        } catch (errInfo) {
            // console.warn('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item style={{ margin: 0 }} name={dataIndex} initialValue={0}>
                <InputNumber
                    min={0}
                    ref={inputRef}
                    onPressEnter={save}
                    onBlur={save}
                />
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

const ColumnsDataPower: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: any;
})[] = [
    {
        title: 'Nh??',
        dataIndex: ['motelID', 'name'],
        key: 'motelID',
    },
    {
        title: 'Ph??ng',
        dataIndex: 'roomName',
        key: 'roomName',
    },
    {
        title: 'Kh??ch thu??',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Ch??? s??? c??',
        dataIndex: 'oldValue',
        key: 'oldValue',
        editable: true,
        render: (oldValue) => {
            return (
                <>
                    <InputNumber value={oldValue} disabled />
                </>
            );
        },
    },
    {
        title: 'Ch??? s??? m???i',
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
        title: 'S??? d???ng',
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
                        S???a
                    </Button>
                </>
            );
        },
    },
];
function handleSubmitData(record: any) {
    if (record.useValue < 0) {
        Modal.error({
            title: 'Th??ng b??o',
            content: 'Ch??? s??? ??i???n m???i ph???i l???n h??n ch??? s??? ??i???n c??',
        });
    } else {
        Modal.confirm({
            centered: true,
            title: `B???n c?? ?????ng ?? l??u ch??? s??? ??i???n ${
                record.roomName
            } trong th??ng ${moment(new Date()).format(
                DateFormat.DATE_M_Y
            )} kh??ng ?`,
            cancelText: 'Cancel',
            okText: 'L??u',
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
        price: record.price,
    };
    await editDataPower({ data: tempData });
    notification({ message: MESSAGES.SAVE_SUCCESS });
};

function handleSaveAll(dataPower: any) {
    const result = dataPower.map((item: any) => item.useValue);

    const newData = result.find((item: any) => item! < 0);

    if (newData) {
        return Modal.error({
            title: 'Th??ng b??o',
            content: 'Ch??? s??? ??i???n m???i ph???i l???n h??n ch??? s??? ??i???n c??',
        });
    } else {
        return Modal.confirm({
            centered: true,
            title: `B???n c?? ?????ng ?? l??u ch??? s??? ??i???n c???a th??ng ${moment(
                new Date()
            ).format(
                DateFormat.DATE_M_Y
            )} cho to??n b??? c??c ph??ng c???a nh?? ??ang ch???n kh??ng ?`,
            cancelText: 'Cancel',
            okText: 'L??u',
            onOk: () => handleSaveAllData(dataPower),
        });
    }
}

const handleSaveAllData = (dataPower: any) => {
    dataPower.map(async (item: any) => {
        await editDataPower({ data: item });
    });
    notification({ message: MESSAGES.SAVE_SUCCESS });
};

const PowerOnly = () => {
    const [formSearch] = Form.useForm();
    const [formPayment] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [dataPower, setDataPower] = useState<IDataPower[]>([]);
    const [listNameMotel, setListNameMotel] = useState<MotelType[]>([]);
    const [listStatusRoom, setListStatusRoom] = useState([]);
    const [showModalPrice, setshowModalPrice] = useState(false);
    const dispatch = useAppDispatch();

    const thisMonth = moment(new Date()).format('MM');

    useEffect(() => {
        const handleGetData = async () => {
            try {
                const data = await Promise.all([
                    getAllMotel(),
                    getStatisticalRoomStatus(),
                ]);
                const [{ data: motels }, { data: statusRooms }] = data;
                setListNameMotel(motels);
                setListStatusRoom(statusRooms);
            } catch (error) {
                throw Error(error as any);
            }
        };
        handleGetData();
    }, []);

    useEffect(() => {
        const listMotelRoom = async () => {
            const { data } = await listDataPower({ month: thisMonth });
            setDataPower(data);
            setLoading(false);
        };
        listMotelRoom();
    }, [thisMonth]);

    const onUpdatePrice = (values: any) => {
        Modal.confirm({
            centered: true,
            title: `B???n c?? ?????ng ?? l??u gi?? ti???n ??i???n kh??ng ?`,
            cancelText: 'Cancel',
            okText: 'L??u',
            onOk: () => confirmSubmit(values),
        });
    };

    const confirmSubmit = async (values: any) => {
        dispatch(setIsLoading(true));

        await editDataPower({
            data: {
                _id: 1,
                price: values.price,
                isUpdatePrice: true,
            },
        });

        const result = dataPower.map((item) => {
            return {
                ...item,
                price: values.price,
            };
        });
        setDataPower(result);

        formPayment.resetFields();
        setshowModalPrice(false);
        dispatch(setIsLoading(false));
        notification({ message: MESSAGES.EDIT_SUCCESS });
    };

    const handleSave = (row: IDataPower) => {
        const newData = [...dataPower];
        const index = newData.findIndex((item) => row._id === item._id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataPower(newData);
    };

    const onSearch = (values: any) => {
        const calculatorData = async () => {
            const { data } = await listDataPower({
                month: moment(values.month).format(DateFormat.DATE_M),
                motelID: values.motelID,
            });
            setDataPower(data);
        };
        calculatorData();
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = ColumnsDataPower.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IDataPower) => ({
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
                    title='Ch??? s??? ??i???n'
                    extra={[
                        <Button
                            onClick={() => handleSaveAll(dataPower)}
                            type='primary'
                            icon={<CheckOutlined />}
                            key={2}
                        >
                            L??u th??ng tin
                        </Button>,
                    ]}
                ></PageHeader>
            </div>

            <div className={cx('header-bottom')}>
                <Form
                    autoComplete='off'
                    form={formSearch}
                    labelCol={{ span: 8 }}
                    onFinish={onSearch}
                >
                    <Row gutter={[8, 8]}>
                        <Col span={6}>
                            <Form.Item
                                label={<>Th??ng/n??m</>}
                                name='month'
                                colon={false}
                                initialValue={moment()}
                            >
                                <DatePicker
                                    clearIcon={null}
                                    format={'MM/YYYY'}
                                    picker='month'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={<>Tr???ng th??i nh??</>}
                                colon={false}
                            >
                                <Select
                                    style={{ width: 150 }}
                                    placeholder='T???t c???'
                                    showSearch
                                >
                                    {listStatusRoom &&
                                        listStatusRoom.map(
                                            (item: any, index) => {
                                                return (
                                                    <Option key={index}>
                                                        {item.statusName}
                                                    </Option>
                                                );
                                            }
                                        )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={<>Nh??</>}
                                name='motelID'
                                colon={false}
                            >
                                <Select
                                    style={{ width: 150 }}
                                    placeholder='T???t c???'
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
                            <Form.Item colon={false}>
                                <Button
                                    type='primary'
                                    icon={<SearchOutlined />}
                                    htmlType='submit'
                                >
                                    Xem
                                </Button>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<DollarCircleOutlined />}
                                    style={{ marginLeft: 10 }}
                                    onClick={() => setshowModalPrice(true)}
                                >
                                    S???a gi?? ti???n
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div>
                <i>
                    (*) Gi?? ti???n ??i???n sinh ho???t c??? ?????nh l??{' '}
                    {generatePriceToVND(dataPower[0]?.price)} ?????ng/kWh
                </i>
                <Table
                    components={components}
                    dataSource={dataPower}
                    columns={columns as ColumnTypes}
                    rowKey='_id'
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
                <div>
                    <Modal
                        title='Gi?? ti???n ??i???n'
                        open={showModalPrice}
                        onCancel={() => {
                            setshowModalPrice(false), formPayment.resetFields();
                        }}
                        onOk={formPayment.submit}
                    >
                        <>
                            <Form
                                form={formPayment}
                                onFinish={onUpdatePrice}
                                autoComplete='off'
                                labelCol={{ span: 5 }}
                            >
                                <Form.Item
                                    label={<>Gi?? ti???n ??i???n</>}
                                    labelAlign='left'
                                    name='price'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Kh??ng ???????c ????? tr???ng',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: '375px' }}
                                        formatter={(value) =>
                                            ` ${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        parser={(value: any) =>
                                            value.replace(/\$\s?|(,*)/g, '')
                                        }
                                        addonAfter={'VND'}
                                        maxLength={6}
                                        min={0}
                                    />
                                </Form.Item>
                            </Form>
                        </>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default PowerOnly;
