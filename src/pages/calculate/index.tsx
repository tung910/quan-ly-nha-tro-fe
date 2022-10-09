import classNames from 'classnames/bind';
import styles from './Calculate.module.scss';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    PageHeader,
    Row,
    Form,
    DatePicker,
    Select,
    Table,
    Modal,
} from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import {
    SearchOutlined,
    CalculatorOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { getStatisticalRoomStatus, getRooms, getRoom } from '~/api/room.api';
import { IDataWater } from '~/types/DataWater.type';
import { MotelType } from '~/types/MotelType';
// import { IService } from '~/types/Service.type';
import { getAllMotel } from '~/api/motel.api';
import moment from 'moment';
// import { RoomType } from '~/types/RoomType';
// import { getDetailCustomerToRoom } from '~/api/customer.api';
// import { IDataPower } from '~/types/DataPower.type';
// import { DATE_FORMAT } from '~/consts/const';
import { Calculator, listCalculator } from '~/api/calculator.api';

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

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const ColumnsData: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: any;
})[] = [
    {
        title: '',
        dataIndex: 'recond',
        key: 'recond',
        render: (text, record) => {
            return (
                <>
                    <Button
                        htmlType='submit'
                        type='primary'
                        icon={<EyeOutlined />}
                    ></Button>
                </>
            );
        },
    },
    {
        title: 'Nhà',
        dataIndex: 'motelName',
        key: 'motelName',
    },
    {
        title: 'Phòng',
        dataIndex: ['roomRentalDetailID', 'roomName'],
        key: 'roomName',
    },
    {
        title: 'Khách thuê',
        dataIndex: ['roomRentalDetailID', 'customerName'],
        key: 'customerName',
    },
    {
        title: 'Số tiền',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
    },
    {
        title: 'Đã trả',
        dataIndex: 'payAmount',
        key: 'payAmount',
    },
    {
        title: 'Còn lại',
        dataIndex: 'remainAmount',
        key: 'remainAmount',
    },
];

const Calculate = () => {
    const [form] = Form.useForm();

    const [listNameMotel, setListNameMotel] = useState<MotelType[]>([]);
    const [listStatusRoom, setListStatusRoom] = useState([]);
    const [calculator, setCalculator] = useState([]);
    // const [listNameRoom, setListNameRoom] = useState<RoomType[]>([]);
    // const [power, setPower] = useState<IDataPower>();
    // const [water, setWater] = useState<IDataWater>();
    // const [idRoom, setIdRoom] = useState<string>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const showModal = () => {
    //     setIsModalOpen(true);
    // };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // form.resetFields();
    };

    // const onClickMotel = (value: string) => {
    //     const getListRoom = async () => {
    //         const { data } = await getRooms(value);
    //         setListNameRoom(data);
    //     };
    //     getListRoom();
    // };
    // const onClickRoom = (value: string) => {
    //     setIdRoom(value);
    // };

    // const handleSubmit = (values: any) => {
    //     if (idRoom) {
    //         const getRoomRental = async (id: string) => {
    //             const { data } = await getDetailCustomerToRoom(id);
    //             data.service.map((item: IService) => {
    //                 if (item.serviceName === 'Điện') {
    //                     console.log('Điện', item.unitPrice);
    //                 }
    //                 if (item.serviceName === 'Nước') {
    //                     console.log('Nước', item.unitPrice);
    //                 }
    //                 if (item.serviceName === 'Giữ xe') {
    //                     console.log('Xe', item.unitPrice);
    //                 }
    //             });
    //         };
    //         const Room = async () => {
    //             const { data } = await getRoom(idRoom);
    //             setPower({
    //                 newValue: 10,
    //                 oldValue: 0,
    //                 useValue: 10,
    //             });
    //             getRoomRental(data.roomRentID);
    //         };
    //         Room();
    //     }

    //     setIsModalOpen(false);
    //     form.resetFields();
    //     const data = {
    //         ...values,
    //         invoiceDate: moment(values.invoiceDate).format(DATE_FORMAT),
    //         month: moment(values.month).format('MM'),
    //         year: moment(values.month).format('YYYY'),
    //     };
    //     console.log(data);
    // };
    const onCalculator = async () => {
        const { data } = await listCalculator();
        data.map(async (item: any) => {
            if (item.totalAmount === 0) {
                await Calculator();
                const { data } = await listCalculator();
                setCalculator(data);
            }
        });
        if (!data) {
            await Calculator();
            const { data } = await listCalculator();
            setCalculator(data);
        }

        setIsModalOpen(false);
    };

    useEffect(() => {
        const getListMotel = async () => {
            const { data } = await getAllMotel();
            setListNameMotel(data);
        };
        getListMotel();
        const getCalculator = async () => {
            const { data } = await listCalculator();
            setCalculator(data);
        };
        getCalculator();
        const getListDataStatus = async () => {
            const { data } = await getStatisticalRoomStatus();
            setListStatusRoom(data);
        };
        getListDataStatus();
    }, []);

    const components = {
        body: {
            row: EditableRow,
        },
    };

    const columns = ColumnsData.map((col) => {
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
                            title='Thông báo'
                            open={isModalOpen}
                            onOk={onCalculator}
                            onCancel={handleCancel}
                            // footer={[
                            //     <Button key='back' onClick={handleCancel}>
                            //         Đóng
                            //     </Button>,
                            //     <Button
                            //         key='submit'
                            //         type='primary'
                            //         onClick={form.submit}
                            //         htmlType='submit'
                            //     >
                            //         Tính Tiền
                            //     </Button>,
                            // ]}
                        >
                            {/* <Form
                                autoComplete='off'
                                form={form}
                                labelCol={{ span: 5 }}
                                onFinish={handleSubmit}
                            >
                                <Form.Item
                                    label={<>Kỳ</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='paymentPeriod'
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
                                        style={{ width: '375px' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<>Tháng</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='month'
                                    initialValue={moment()}
                                >
                                    <DatePicker style={{ width: '375px' }} />
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
                                        onChange={onClickMotel}
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
                                <Form.Item
                                    label={<>Phòng</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='roomID'
                                >
                                    <Select
                                        placeholder='Mời bạn chọn phòng'
                                        showSearch
                                        onChange={onClickRoom}
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
                            </Form> */}
                            <p>Bạn có muốn tính tiền tháng này không?</p>
                        </Modal>
                    </div>
                </PageHeader>
            </div>

            <div className={cx('header-bottom')}>
                <Row gutter={[8, 8]}>
                    <Col span={6}>
                        <Form.Item label={<>Tháng/năm</>} colon={false}>
                            <DatePicker
                                defaultValue={moment()}
                                format={'MM/YYYY'}
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
                    columns={columns as ColumnTypes}
                    dataSource={calculator}
                />
            </div>
        </div>
    );
};

export default Calculate;
