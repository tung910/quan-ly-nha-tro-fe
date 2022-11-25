import {
    CalculatorOutlined,
    DeleteOutlined,
    DollarCircleOutlined,
    EyeOutlined,
    PrinterOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    PageHeader,
    Row,
    Select,
    Space,
    Table,
    Typography,
    message,
} from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
    CalculatorMoney,
    CalculatorMoneyAll,
    deleteCalculator,
    getCalculator,
    listCalculator,
    paymentMoney,
    sendEmail,
} from '~/api/calculator.api';
import { getDataPowerByMotelRoomId } from '~/api/data-power.api';
import { getDataWaterByMotelRoomId } from '~/api/data-water.api';
import { getAllMotel } from '~/api/motel.api';
import { revenueStatistics } from '~/api/revenue-statistics.api';
import { getRoom, getRooms } from '~/api/room.api';
import notification from '~/components/notification';
import { DateFormat } from '~/constants/const';
import { MESSAGES } from '~/constants/message.const';
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';
import { generatePriceToVND } from '~/utils/helper';

import styles from './Calculate.module.scss';

const cx = classNames.bind(styles);
const { Option } = Select;
const { Text } = Typography;
type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Calculate = () => {
    const [form] = Form.useForm();
    const [formSearch] = Form.useForm();
    const [formPayment] = Form.useForm();

    const [listNameMotel, setListNameMotel] = useState<MotelType[]>([]);
    const [listNameRoom, setListNameRoom] = useState<RoomType[]>([]);
    const [calculators, setCalculators] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalReceipt, setIsModalReceipt] = useState(false);
    const [prepayment, setPrepayment] = useState(false);
    const [room, setRoom] = useState<RoomType>();
    const [bill, setBill] = useState<any>([]);
    const [payer, setPayer] = useState<any>();
    const [idCalculator, setIdCalculator] = useState<string>('');
    const thisMonth = moment(new Date()).format('MM');

    const ColumnsData: ColumnTypes[number][] = [
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: (id: string, item: any) => {
                return (
                    <Space>
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<EyeOutlined />}
                            onClick={() => seeTheBill(id)}
                            title='Xem hóa đơn'
                        ></Button>
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<DollarCircleOutlined />}
                            onClick={() => {
                                getPayer(id);
                            }}
                            disabled={+item?.remainAmount === 0 ? true : false}
                            title='Nhập số tiền đã thu'
                        />
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<PrinterOutlined />}
                            onClick={() => setIsModalReceipt(!isModalReceipt)}
                            title='In hóa đơn'
                        />

                        <Button
                            htmlType='submit'
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(id)}
                            title='Xóa'
                            disabled={+item?.remainAmount === 0 ? true : false}
                            danger
                        />
                    </Space>
                );
            },
        },
        {
            title: 'Nhà',
            dataIndex: ['motelID', 'name'],
            key: 'name',
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
            render: (totalAmount: number) => {
                return <>{generatePriceToVND(+totalAmount)}</>;
            },
        },
        {
            title: 'Đã trả',
            dataIndex: 'payAmount',
            key: 'payAmount',
            render: (payAmount: number) => {
                return <>{generatePriceToVND(+payAmount)}</>;
            },
        },
        {
            title: 'Còn lại',
            dataIndex: 'remainAmount',
            key: 'remainAmount',
            render: (remainAmount: number) => {
                return <>{generatePriceToVND(+remainAmount)}</>;
            },
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const onClickMotel = async (value: string) => {
        const { data } = await getRooms(value);
        setListNameRoom(data);
    };
    const onClickRoom = async (value: string) => {
        const { data } = await getRoom(value);
        setRoom(data);
    };

    const onCalculator = async (values: any) => {
        if (room?._id && room?.isRent === true) {
            const dataRoom = {
                motelRoomID: room._id,
                month: moment(values.month).format('MM'),
            };
            const dataPower = await getDataPowerByMotelRoomId(dataRoom);
            const dataWater = await getDataWaterByMotelRoomId(dataRoom);
            values = {
                data: [
                    {
                        ...values,
                        motelRoomID: room._id,
                        motelID: room.motelID,
                        dataPowerID: dataPower.data._id,
                        dataWaterID: dataWater.data._id,
                        roomRentalDetailID: room.roomRentID,
                        invoiceDate: moment(values.invoiceDate).format(
                            DateFormat.DATE_DEFAULT
                        ),
                        month: moment(values.month).format('MM'),
                        year: moment(values.month).format('YYYY'),
                    },
                ],
            };

            await CalculatorMoney(values);

            const { data } = await listCalculator({
                month: thisMonth,
            });

            setCalculators(data);
        } else {
            alert('Mời bạn chọn lại!');
        }

        form.resetFields();
        setIsModalOpen(false);
    };
    const onCalculatorAll = async () => {
        await CalculatorMoneyAll({
            date: moment(new Date()).format(DateFormat.DATE_DEFAULT),
        });
        const { data } = await listCalculator({
            month: thisMonth,
        });
        setCalculators(data);
        setIsModalOpen(false);
    };
    const getPayer = async (id: string) => {
        setPrepayment(true);
        setIdCalculator(id);
        const { data } = await getCalculator(id);
        setPayer(data[0].roomRentalDetailID.customerName);
    };
    const seeTheBill = async (id: string) => {
        setIsModalReceipt(true);
        const { data } = await getCalculator(id);
        setBill(data);
    };
    const handleSendEmail = async (id: string | any) => {
        try {
            await sendEmail(id);
            notification({ message: 'Gửi email thành công' });
        } catch (error) {
            //
        }
    };
    const onPayment = async (values: any) => {
        const month = moment(values.dateOfPayment).format(DateFormat.DATE_M);
        const year = moment(values.dateOfPayment).format(DateFormat.DATE_Y);

        const { data } = await getCalculator(idCalculator);

        data.map(async (item: any) => {
            if (values.payAmount > item.remainAmount) {
                Modal.error({
                    title: 'Thông báo',
                    content:
                        'Số tiền trả lớn hơn số tiền phải trả. Mời nhập lại!',
                });
                formPayment.resetFields();
            } else {
                values = {
                    ...values,
                    dateOfPayment: moment(values.dateOfPayment).format(
                        DateFormat.DATE_DEFAULT
                    ),
                    payAmount: item.payAmount + values.payAmount,
                    remainAmount:
                        item.totalAmount - (values.payAmount + item.payAmount),
                    month: item.month,
                    totalAmount: item.totalAmount,
                };
                if (values.remainAmount === 0) {
                    values = {
                        ...values,
                        paymentStatus: true,
                    };
                }
                await Promise.all([
                    paymentMoney(values, idCalculator),
                    revenueStatistics({
                        month,
                        year,
                    }),
                ]);

                const getList = async () => {
                    const { data } = await listCalculator({
                        month: values.month,
                    });

                    setCalculators(data);
                };
                getList();
                setPrepayment(false);
                formPayment.resetFields();
            }
        });
    };

    const onSearch = (values: any) => {
        const calculatorData = async () => {
            const { data } = await listCalculator({
                month: moment(values.month).format('MM'),
                motelID: values.motelID,
            });

            setCalculators(data);
        };
        calculatorData();
    };
    const handleDelete = async (id: string) => {
        Modal.confirm({
            centered: true,
            title: `Bạn có đồng ý xóa không ?`,
            cancelText: 'Cancel',
            okText: 'Xóa',
            onOk: async () => {
                await deleteCalculator(id);
                setCalculators(
                    calculators.filter((item: any) => item._id !== id)
                );
                message.success(MESSAGES.DEL_SUCCESS);
            },
        });
    };

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const [motelRoom, calculatorData] = await Promise.all([
                    getAllMotel(),
                    listCalculator({
                        month: thisMonth,
                    }),
                ]);
                setListNameMotel(motelRoom.data);
                setCalculators(calculatorData.data);
            } catch (error) {
                // message.error(error);
            }
        };
        handleFetchData();
    }, []);

    return (
        <div>
            <div>
                <PageHeader
                    className={cx('header-top')}
                    title='Tính Tiền'
                    extra={[
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
                    <Modal
                        title='Thông báo'
                        open={isModalOpen}
                        onOk={form.submit}
                        onCancel={handleCancel}
                        footer={[
                            <Button key='back' onClick={handleCancel}>
                                Hủy
                            </Button>,
                            <Button
                                key='link'
                                type='primary'
                                onClick={onCalculatorAll}
                            >
                                Tính tất cả
                            </Button>,
                            <Button
                                key='submit'
                                type='primary'
                                onClick={form.submit}
                            >
                                Tính
                            </Button>,
                        ]}
                    >
                        <>
                            <Form
                                autoComplete='off'
                                form={form}
                                labelCol={{ span: 5 }}
                                onFinish={onCalculator}
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
                                        format={DateFormat.DATE_DEFAULT}
                                        style={{ width: '375px' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    labelAlign='left'
                                    label={<>Tháng/năm</>}
                                    colon={false}
                                    name='month'
                                >
                                    <DatePicker
                                        defaultValue={moment()}
                                        clearIcon={null}
                                        format={'MM/YYYY'}
                                        picker='month'
                                        style={{ width: '375px' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<>Nhà</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='motelID'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn!',
                                        },
                                    ]}
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
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn!',
                                        },
                                    ]}
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
                            </Form>
                            <p>Bạn có muốn tính tiền tháng này không?</p>
                        </>
                    </Modal>
                </PageHeader>
            </div>

            <div className={cx('header-bottom')}>
                <Form
                    autoComplete='off'
                    form={formSearch}
                    labelCol={{ span: 6 }}
                    onFinish={onSearch}
                >
                    <Row gutter={[8, 8]}>
                        <Col span={6}>
                            <Form.Item
                                label={<>Tháng/năm</>}
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
                                label={<>Kỳ</>}
                                name='paymentPeriod'
                                colon={false}
                            >
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
                            <Form.Item
                                label={<>Nhà</>}
                                name='motelID'
                                colon={false}
                            >
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
                            <Form.Item colon={false}>
                                <Button
                                    type='primary'
                                    icon={<SearchOutlined />}
                                    htmlType='submit'
                                >
                                    Xem
                                </Button>
                                ,
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div>
                <Table
                    columns={ColumnsData}
                    dataSource={calculators}
                    summary={(pageData) => {
                        let totalAmountUnpaid = 0;
                        let totalPaymentAmount = 0;

                        pageData.forEach(({ remainAmount, payAmount }: any) => {
                            totalAmountUnpaid += remainAmount;
                            totalPaymentAmount += payAmount;
                        });
                        if (
                            totalAmountUnpaid === 0 &&
                            totalPaymentAmount === 0
                        ) {
                            return;
                        }
                        return (
                            <>
                                <Table.Summary.Row
                                    style={{ fontWeight: 'bold' }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={6}>
                                        <Text>Tổng</Text>
                                    </Table.Summary.Cell>

                                    <Table.Summary.Cell index={1}>
                                        <Text type='danger'>
                                            {' '}
                                            {generatePriceToVND(
                                                +totalAmountUnpaid
                                            )}
                                        </Text>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        );
                    }}
                    rowKey='_id'
                />
                <Modal
                    open={isModalReceipt}
                    title='Hóa đơn'
                    onOk={() => setIsModalReceipt(false)}
                    onCancel={() => setIsModalReceipt(false)}
                    footer={[
                        <Button type='primary' key='button_1'>
                            Tải file PDF
                        </Button>,
                        <Button
                            type='ghost'
                            key='button_2'
                            onClick={() => handleSendEmail(bill[0]._id)}
                        >
                            Gửi mail
                        </Button>,
                        <Button
                            type='primary'
                            key='button_3'
                            onClick={() => setIsModalReceipt(false)}
                            danger
                        >
                            Đóng
                        </Button>,
                    ]}
                >
                    <h1>Hóa đơn</h1>
                    <hr />
                    {bill &&
                        bill.map((item: any) => {
                            return (
                                <div key={item._id}>
                                    <p>
                                        1.Khách hàng:{' '}
                                        {item.roomRentalDetailID.customerName}
                                    </p>
                                    <p>
                                        2.Phòng:{' '}
                                        {item.roomRentalDetailID.roomName}
                                    </p>
                                    <p>
                                        3.Sử dụng điện:{' '}
                                        {item.dataPowerID.useValue} số
                                    </p>
                                    <p>
                                        4.sử dụng nước:{' '}
                                        {item.dataWaterID.useValue} khối
                                    </p>
                                    <hr />
                                    <p>
                                        <b>
                                            Tổng tiền:{' '}
                                            {generatePriceToVND(
                                                +item.totalAmount
                                            )}{' '}
                                            VND
                                        </b>
                                    </p>
                                    <hr />
                                    <p>
                                        <b>Người thanh toán: {item.payer}</b>
                                    </p>
                                </div>
                            );
                        })}
                </Modal>
                <div>
                    <Modal
                        title='Nhập tiền trả'
                        open={prepayment}
                        onOk={formPayment.submit}
                        onCancel={() => {
                            setPrepayment(false);
                        }}
                    >
                        <>
                            <Form
                                autoComplete='off'
                                form={formPayment}
                                labelCol={{ span: 5 }}
                                onFinish={onPayment}
                            >
                                <Form.Item
                                    label={<>Ngày nộp:</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='dateOfPayment'
                                    initialValue={moment()}
                                >
                                    <DatePicker
                                        format={DateFormat.DATE_DEFAULT}
                                        style={{ width: '375px' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<>Số tiền</>}
                                    labelAlign='left'
                                    name='payAmount'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
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
                                        parser={(value) =>
                                            ` ${value}`.replace(
                                                /\$\s?|(,*)/g,
                                                ''
                                            )
                                        }
                                        addonAfter='VNĐ'
                                    />
                                </Form.Item>
                                {payer && (
                                    <Form.Item
                                        label={<>Người nộp</>}
                                        labelAlign='left'
                                        name='payer'
                                        initialValue={payer}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không được để trống',
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: '375px' }} />
                                    </Form.Item>
                                )}

                                <Form.Item
                                    label={<>Thanh toán</>}
                                    labelAlign='left'
                                    name='paymentMethod'
                                >
                                    <Select
                                        style={{ width: 375 }}
                                        defaultValue={1}
                                    >
                                        <Option value={1}>Tiền mặt</Option>
                                        <Option value={2}>Chuyển khoản</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<>Ghi chú</>}
                                    labelAlign='left'
                                    name='note'
                                >
                                    <Input style={{ width: '375px' }} />
                                </Form.Item>
                            </Form>
                        </>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Calculate;
