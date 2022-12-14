import {
    CalculatorOutlined,
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
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CalculatorMoneyAll,
    calculatorMoney,
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
    const [calculators, setCalculators] = useState<any>([]);
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
                            title='Xem h??a ????n'
                        ></Button>
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<DollarCircleOutlined />}
                            onClick={() => {
                                getPayer(id);
                            }}
                            disabled={+item?.remainAmount === 0 ? true : false}
                            title='Nh???p s??? ti???n ???? thu'
                        />
                    </Space>
                );
            },
        },
        {
            title: 'In ho?? ????n',
            dataIndex: 'roomRentalDetailID',
            key: 'roomRentalDetailID',
            render: (roomRentalDetailID) => {
                return (
                    <>
                        {roomRentalDetailID && (
                            <Tooltip title='In ho?? ????n'>
                                <Button
                                    type='primary'
                                    icon={
                                        <Link
                                            to={`/invoice-print?idCalculator=${calculators[0]?._id}`}
                                            target='_blank'
                                        >
                                            <PrinterOutlined />
                                        </Link>
                                    }
                                ></Button>
                            </Tooltip>
                        )}
                    </>
                );
            },
        },
        {
            title: 'Nh??',
            dataIndex: ['motelID', 'name'],
            key: 'name',
        },
        {
            title: 'Ph??ng',
            dataIndex: ['roomRentalDetailID', 'roomName'],
            key: 'roomName',
        },
        {
            title: 'Kh??ch thu??',
            dataIndex: ['roomRentalDetailID', 'customerName'],
            key: 'customerName',
        },
        {
            title: 'S??? ti???n',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (totalAmount: number) => {
                return <>{generatePriceToVND(+totalAmount)}</>;
            },
        },
        {
            title: '???? tr???',
            dataIndex: 'payAmount',
            key: 'payAmount',
            render: (payAmount: number) => {
                return <>{generatePriceToVND(+payAmount)}</>;
            },
        },
        {
            title: 'C??n n???',
            dataIndex: 'remainAmount',
            key: 'remainAmount',
            render: (remainAmount: number) => {
                return <>{generatePriceToVND(+remainAmount)}</>;
            },
        },
        /*   {
            title: 'Tr???ng th??i',
            dataIndex: '_id',
            key: '_id',
            render: (_: string, item: any) => {
                const tag = {
                    message: !item?.roomRentalDetailID?.userID?.status
                        ? item?.roomRentalDetailID?.userID?.message
                        : '??ang ???',
                    color: !item?.roomRentalDetailID?.userID?.status
                        ? 'red'
                        : 'green',
                };

                return <Tag color={tag.color}>{tag.message}</Tag>;
            },
            width: '5%',
        }, */
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
                        motelRoomId: values.roomID,
                    },
                ],
            };

            await calculatorMoney(values);

            const { data } = await listCalculator({
                month: thisMonth,
            });

            setCalculators(data);
        } else {
            alert('M???i b???n ch???n l???i!');
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
            notification({ message: 'G???i email th??nh c??ng' });
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
                    title: 'L???i',
                    content:
                        'S??? ti???n tr??? l???n h??n s??? ti???n ph???i tr???. M???i nh???p l???i!',
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
                    title='T??nh Ti???n'
                    extra={[
                        <Button
                            type='primary'
                            icon={<CalculatorOutlined />}
                            key={2}
                            onClick={showModal}
                        >
                            T??nh Ti???n
                        </Button>,
                    ]}
                >
                    <Modal
                        title='Thanh to??n'
                        open={isModalOpen}
                        onOk={form.submit}
                        onCancel={handleCancel}
                        footer={[
                            <Button key='back' onClick={handleCancel}>
                                H???y
                            </Button>,
                            <Button
                                key='link'
                                type='primary'
                                onClick={onCalculatorAll}
                            >
                                T??nh t???t c???
                            </Button>,
                            <Button
                                key='submit'
                                type='primary'
                                onClick={form.submit}
                            >
                                T??nh
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
                                    label={<>Ng??y</>}
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
                                    label={<>Th??ng/n??m</>}
                                    colon={false}
                                    name='month'
                                    initialValue={moment()}
                                >
                                    <DatePicker
                                        clearIcon={null}
                                        format={'MM/YYYY'}
                                        picker='month'
                                        style={{ width: '375px' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<>Nh??</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='motelID'
                                >
                                    <Select
                                        placeholder='M???i b???n ch???n nh??'
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
                                    label={<>Ph??ng</>}
                                    colon={false}
                                    labelAlign='left'
                                    name='roomID'
                                >
                                    <Select
                                        placeholder='M???i b???n ch???n ph??ng'
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
                            <p>B???n c?? mu???n t??nh ti???n th??ng n??y kh??ng?</p>
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
                                label={<>K???</>}
                                name='paymentPeriod'
                                colon={false}
                            >
                                <Select
                                    style={{ width: 150 }}
                                    placeholder='T???t c???'
                                    showSearch
                                >
                                    <Select.Option value={2}>
                                        K??? 30
                                    </Select.Option>
                                    <Select.Option value={3}>
                                        K??? 15
                                    </Select.Option>
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
                                    <Table.Summary.Cell index={0} colSpan={7}>
                                        <Text>T???ng</Text>
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
                    pagination={{ pageSize: 8 }}
                />
                <Modal
                    open={isModalReceipt}
                    title='H??a ????n'
                    onOk={() => setIsModalReceipt(false)}
                    onCancel={() => setIsModalReceipt(false)}
                    footer={[
                        <Button type='primary' key='button_1'>
                            T???i file PDF
                        </Button>,
                        <Button
                            type='ghost'
                            key='button_2'
                            onClick={() => handleSendEmail(bill[0]._id)}
                        >
                            G???i mail
                        </Button>,
                        <Button
                            type='primary'
                            key='button_3'
                            onClick={() => setIsModalReceipt(false)}
                            danger
                        >
                            ????ng
                        </Button>,
                    ]}
                >
                    {bill &&
                        bill.map((item: any) => {
                            return (
                                <div key={item._id}>
                                    <p>
                                        1.Kh??ch h??ng:{' '}
                                        {item.roomRentalDetailID.customerName}
                                    </p>
                                    <p>
                                        2.Ph??ng:{' '}
                                        {item.roomRentalDetailID.roomName}
                                    </p>
                                    <p>
                                        3.S??? d???ng ??i???n:{' '}
                                        {item.dataPowerID.useValue} kWh/s???
                                    </p>
                                    <p>
                                        4.S??? d???ng n?????c:{' '}
                                        {item.dataWaterID.useValue} kh???i
                                    </p>
                                    <p>
                                        5.Ti???n n??? th??ng tr?????c:{' '}
                                        {generatePriceToVND(
                                            +item.previousRemain
                                        )}{' '}
                                        VND
                                    </p>
                                    <hr />
                                    <p>
                                        <b>
                                            T???ng ti???n:{' '}
                                            {generatePriceToVND(
                                                +item.totalAmount
                                            )}{' '}
                                            VND
                                        </b>
                                    </p>
                                    <hr />
                                    <p>
                                        <b>Ng?????i thanh to??n: {item.payer}</b>
                                    </p>
                                </div>
                            );
                        })}
                </Modal>
                <div>
                    <Modal
                        title='Nh???p ti???n tr???'
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
                                    label={<>Ng??y n???p:</>}
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
                                    label={<>S??? ti???n</>}
                                    labelAlign='left'
                                    name='payAmount'
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
                                        addonAfter='VND'
                                        maxLength={10}
                                        min={0}
                                    />
                                </Form.Item>
                                {payer && (
                                    <Form.Item
                                        label={<>Ng?????i n???p</>}
                                        labelAlign='left'
                                        name='payer'
                                        initialValue={payer}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Kh??ng ???????c ????? tr???ng',
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: '375px' }} />
                                    </Form.Item>
                                )}

                                <Form.Item
                                    label={<>Thanh to??n</>}
                                    labelAlign='left'
                                    name='paymentMethod'
                                    initialValue={1}
                                >
                                    <Select style={{ width: 375 }}>
                                        <Option value={1}>Ti???n m???t</Option>
                                        <Option value={2}>Chuy???n kho???n</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<>Ghi ch??</>}
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
