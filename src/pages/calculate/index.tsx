import classNames from 'classnames/bind';
import styles from './Calculate.module.scss';
import { useEffect, useState } from 'react';
import {
    Button,
    Col,
    PageHeader,
    Row,
    Form,
    DatePicker,
    Select,
    message,
    DatePickerProps,
    Space,
} from 'antd';
import {
    SearchOutlined,
    CalculatorOutlined,
    EyeOutlined,
    DollarCircleOutlined,
    PrinterOutlined,
} from '@ant-design/icons';
import { getStatisticalRoomStatus } from '~/api/room.api';
import { MotelType } from '~/types/MotelType';
import { getAllMotel } from '~/api/motel.api';
import moment from 'moment';
import { Calculator, listCalculator } from '~/api/calculator.api';
import Table from '~/components/table';
import Modal from '~/components/modal';

const cx = classNames.bind(styles);
const { Option } = Select;
type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Calculate = () => {
    const [form] = Form.useForm();

    const [listNameMotel, setListNameMotel] = useState<MotelType[]>([]);
    const [listStatusRoom, setListStatusRoom] = useState([]);
    const [calculator, setCalculator] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalReceipt, setIsModalReceipt] = useState(false);
    const [month, setMonth] = useState('');

    const ColumnsData: ColumnTypes[number][] = [
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: () => {
                return (
                    <Space>
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<EyeOutlined />}
                            onClick={() => setIsModalReceipt(!isModalReceipt)}
                            title='Xem hóa đơn'
                        ></Button>
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<DollarCircleOutlined />}
                            onClick={() => setIsModalReceipt(!isModalReceipt)}
                            title='Nhập số tiền đã thu'
                        />
                        <Button
                            htmlType='submit'
                            type='primary'
                            icon={<PrinterOutlined />}
                            onClick={() => setIsModalReceipt(!isModalReceipt)}
                            title='In hóa đơn'
                        />
                    </Space>
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // form.resetFields();
    };
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

    const handleChangeMonth: DatePickerProps['onChange'] = (
        date,
        dateString
    ) => {
        setMonth(dateString);
    };

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const [motelRoom, calculatorData, statisticalRoomStatus] =
                    await Promise.all([
                        getAllMotel(),
                        listCalculator(),
                        getStatisticalRoomStatus(),
                    ]);
                setListNameMotel(motelRoom.data);
                setCalculator(calculatorData.data);
                setListStatusRoom(statisticalRoomStatus.data);
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
                    <Modal
                        title='Thông báo'
                        open={isModalOpen}
                        onOk={onCalculator}
                        onCancel={handleCancel}
                    >
                        <>
                            <Form
                                autoComplete='off'
                                form={form}
                                labelCol={{ span: 5 }}
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
                                    <DatePicker style={{ width: '375px' }} />
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
                                    ></Select>
                                </Form.Item>
                            </Form>
                            <p>Bạn có muốn tính tiền tháng này không?</p>
                        </>
                    </Modal>
                </PageHeader>
            </div>

            <div className={cx('header-bottom')}>
                <Row gutter={[8, 8]}>
                    <Col span={6}>
                        <Form.Item label={<>Tháng/năm</>} colon={false}>
                            <DatePicker
                                defaultValue={moment()}
                                clearIcon={null}
                                format={'MM/YYYY'}
                                name='date'
                                picker='month'
                                onChange={handleChangeMonth}
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
                <Table columns={ColumnsData} dataSource={calculator} />
                <Modal
                    open={isModalReceipt}
                    title='Hóa đơn'
                    onOk={() => setIsModalReceipt(false)}
                    onCancel={() => setIsModalReceipt(false)}
                    footer={[
                        <Button type='primary' key='button_1'>
                            Tải file PDF
                        </Button>,
                        <Button type='ghost' key='button_1'>
                            Gửi mail
                        </Button>,
                        <Button
                            type='primary'
                            key='button_2'
                            onClick={() => setIsModalReceipt(false)}
                            danger
                        >
                            Đóng
                        </Button>,
                    ]}
                >
                    <h1>Hóa đơn</h1>
                </Modal>
                <Button
                    type='primary'
                    icon={<CalculatorOutlined />}
                    key={2}
                    onClick={showModal}
                >
                            hoa don
                </Button>
                {/* <button onClick={showModal}>xemmm</button>   */}
            </div>
        </div>
    );
};

export default Calculate;
