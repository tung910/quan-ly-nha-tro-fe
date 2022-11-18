import { SearchOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Modal,
    PageHeader,
    Row,
    Select,
    Table,
} from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { listCalculator } from '~/api/calculator.api';
import { getAllMotel } from '~/api/motel.api';
import { getListRooms, getRooms } from '~/api/room.api';
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';
import { generatePriceToVND } from '~/utils/helper';
import styles from './PaymentHistory.module.scss';

const cx = classNames.bind(styles);
const PaymentHistory = () => {
    const [form] = Form.useForm();
    const [listMotels, setListMotels] = useState<MotelType[]>([]);
    const [listRooms, setListRooms] = useState<RoomType[]>([]);
    const [dataSource, setdataSource] = useState<any>([]);
    const thisMonth = moment(new Date()).format('MM');

    const columns = [
        {
            title: 'Nhà',
            dataIndex: ['motelID', 'name'],
            key: 'motelID',
        },
        {
            title: 'Phòng',
            dataIndex: ['roomRentalDetailID', 'roomName'],
            key: 'roomRentalDetailID',
        },
        {
            title: 'Người thanh toán',
            dataIndex: ['roomRentalDetailID', 'customerName'],
            key: 'roomRentalDetailID',
        },
        {
            title: 'Chỉ số điện',
            dataIndex: ['dataPowerID', 'useValue'],
            key: 'dataPowerID',
        },
        {
            title: 'Chỉ số nước',
            dataIndex: ['dataWaterID', 'useValue'],
            key: 'dataWaterID',
        },
        {
            title: 'Tháng thanh toán',
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: 'Tiền đã thanh toán',
            dataIndex: 'payAmount',
            key: 'payAmount',
            render: (payAmount: number) => {
                return <>{generatePriceToVND(+payAmount)}đ</>;
            },
        },
        {
            title: 'Tiền chưa thanh toán',
            dataIndex: 'remainAmount',
            key: 'remainAmount',
            render: (remainAmount: number) => {
                return <>{generatePriceToVND(+remainAmount)}đ</>;
            },
        },
        {
            title: 'Tổng tiền thanh toán',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (totalAmount: number) => {
                return <>{generatePriceToVND(+totalAmount)}đ</>;
            },
        },
    ];

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const [listMotels, listRooms, dataSource] = await Promise.all([
                    getAllMotel(),
                    getListRooms(),
                    listCalculator({
                        month: thisMonth,
                    }),
                ]);
                setListMotels(listMotels.data);
                setListRooms(listRooms.data);
                setdataSource(dataSource.data);
            } catch (error) {
                // message.error(error);
            }
        };
        handleFetchData();
    }, [thisMonth]);

    const handleSelectRoom = async (id: any) => {
        const { data } = await getRooms(id);

        setListRooms(data);
    };

    const onSearch = (values: any) => {
        const calculatorData = async () => {
            const { data } = await listCalculator({
                month: moment(values.month).format('MM'),
                motelID: values.motelID,
                // motelRoomId: values.motelRoomId,
            });
            setdataSource(data);

            if (data) {
                Modal.success({
                    title: 'Tìm kiếm',
                    content: `Hiện tại đang có ${data.length} kết quả`,
                });
            }
        };
        calculatorData();
    };

    return (
        <div>
            <div>
                <PageHeader
                    className={cx('title-header')}
                    ghost={true}
                    title='Lịch sử thanh toán'
                />
            </div>

            <div className={cx('header-bottom')}>
                <Form
                    autoComplete='off'
                    form={form}
                    style={{ padding: 20 }}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
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
                                name='motelId'
                                label={<>Nhà</>}
                                colon={false}
                            >
                                <Select
                                    style={{ width: 150 }}
                                    defaultValue='Tất cả'
                                    showSearch
                                    onChange={handleSelectRoom}
                                >
                                    {listMotels &&
                                        listMotels.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </Select.Option>
                                            );
                                        })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name='motelRoomId'
                                label={<>Phòng</>}
                                colon={false}
                            >
                                <Select
                                    style={{ width: 150 }}
                                    defaultValue='Tất cả'
                                    showSearch
                                >
                                    {listRooms &&
                                        listRooms.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={item._id}
                                                >
                                                    {item.roomName}
                                                </Select.Option>
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
                <>
                    <span style={{ float: 'right' }}>
                        {dataSource.length === 0
                            ? 'Không có kết quả nào được tìm thấy...'
                            : `Hiện tại đang có ${dataSource.length} kết quả`}
                    </span>
                    <Table dataSource={dataSource} columns={columns} />
                </>
            </div>
        </div>
    );
};

export default PaymentHistory;
