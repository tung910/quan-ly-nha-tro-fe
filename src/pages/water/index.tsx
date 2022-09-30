/* eslint-disable no-duplicate-imports */
/* eslint-disable no-console */
import {
    Button,
    Col,
    PageHeader,
    Row,
    Form,
    DatePicker,
    Select,
    Input,
} from 'antd';
const { Option } = Select;
import { SearchOutlined, CheckOutlined, SaveOutlined } from '@ant-design/icons';
import Table from '~/components/table';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { getListRooms } from '~/api/room.api';
import styles from './Water.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const ColumsDataWater: ColumnsType = [
    {
        title: 'Nhà',
        dataIndex: 'motelId',
    },
    {
        title: 'Phòng',
        dataIndex: 'roomName',
    },
    {
        title: 'Khách thuê',
        dataIndex: 'customerName',
    },
    {
        title: 'CS nước cũ',
        dataIndex: 'OldValue',
        render: (OldValue: any) => {
            return (
                <>
                    <Input value={OldValue} />
                </>
            );
        },
    },
    {
        title: 'CS nước mới',
        dataIndex: 'NewValue',
        render: (NewValue: any) => {
            return (
                <>
                    <Input value={NewValue} />
                </>
            );
        },
    },
    {
        title: 'Sử dụng',
        dataIndex: 'UseValue',
    },
    {
        title: '',
        dataIndex: 'recond',
        render: (text: any, recond: any) => {
            return (
                <>
                    <Button type='primary' icon={<SaveOutlined />}>
                        Lưu
                    </Button>
                </>
            );
        },
    },
];

const WaterPage = () => {
    const [dataPower, setDataPower] = useState([]);
    useEffect(() => {
        const listMotelRoom = async () => {
            const { data } = await getListRooms();
            const newData = data.map((item: any) => {
                const result = {
                    ...item,
                    OldValue: 0,
                    NewValue: 0,
                    UseValue: 0,
                };
                return result;
            });
            setDataPower(newData);
        };
        listMotelRoom();
    }, []);
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
                        <Button type='primary' icon={<CheckOutlined />} key={2}>
                            Lưu thông tin
                        </Button>,
                    ]}
                ></PageHeader>
            </div>
            <div className=''>
                <div className={cx('header-bottom')}>
                    <Row gutter={[8, 8]}>
                        <Col span={6}>
                            <Form.Item label={<>Tháng/năm</>} colon={false}>
                                <DatePicker name='date' />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={<>Kỳ</>} colon={false}>
                                <Select
                                    style={{ width: 150 }}
                                    defaultValue={1}
                                    showSearch
                                >
                                    <Option value={1}>Tất cả</Option>
                                    <Option value={2}>Kỳ 30</Option>
                                    <Option value={3}>Kỳ 15</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={<>Nhà</>} colon={false}>
                                <Select
                                    style={{ width: 150 }}
                                    defaultValue={1}
                                    showSearch
                                >
                                    <Option value={1}>Tất cả</Option>
                                    <Option value={2}>Kỳ 30</Option>
                                    <Option value={3}>Kỳ 15</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={<>Trạng thái nhà</>}
                                colon={false}
                            >
                                <Select
                                    style={{ width: 150 }}
                                    defaultValue={1}
                                    showSearch
                                >
                                    <Option value={1}>Tất cả</Option>
                                    <Option value={2}>Kỳ 30</Option>
                                    <Option value={3}>Kỳ 15</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className=''>
                    <b>Lưu ý:</b>
                    <br></br> - Bạn phải gán dịch vụ thuộc loại nước cho khách
                    thuê trước thì phần chỉ số này mới được tính cho phòng đó
                    khi tính tiền.<br></br>- Đối với lần đầu tiên sử dụng phần
                    mềm bạn sẽ phải nhập chỉ số cũ và mới cho tháng sử dụng đầu
                    tiên, các tháng tiếp theo phần mềm sẽ tự động lấy chỉ số mới
                    tháng trước làm chỉ số cũ tháng sau.
                </div>
                <div className=''>
                    <b>
                        {' '}
                        <input type='checkbox' /> Cảnh báo chỉ số nước cũ lớn
                        hơn chỉ số nước mới
                    </b>
                </div>{' '}
                <br></br>
            </div>
            <div>
                <Table columns={ColumsDataWater} dataSource={dataPower} />
            </div>
        </div>
    );
};

export default WaterPage;
