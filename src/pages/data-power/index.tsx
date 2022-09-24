import classNames from 'classnames/bind';
import styles from './DataPower.module.scss';
import { ColumnsType } from 'antd/lib/table';
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
import { SearchOutlined, CheckOutlined, SaveOutlined } from '@ant-design/icons';
import Table from '~/components/table';

const cx = classNames.bind(styles);
const { Option } = Select;
const ColumnsDataPower: ColumnsType = [
    {
        title: 'Nhà',
        dataIndex: 'motelID',
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
        title: 'Chỉ số cũ',
        dataIndex: 'OldValue',
        render: (OldValue: any) => {
            return (
                <>
                    <Input />
                </>
            );
        },
    },
    {
        title: 'Chỉ số mới',
        dataIndex: 'NewValue',
        render: (NewValue: any) => {
            return (
                <>
                    <Input />
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
const PowerOnly = () => {
    return (
        <div>
            <div>
                <PageHeader
                    className={cx('header-top')}
                    title='Chỉ số điện'
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
                        <Form.Item label={<>Trạng thái nhà</>} colon={false}>
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

            <div>
                <Table dataSource={[]} columns={ColumnsDataPower} />
            </div>
        </div>
    );
};

export default PowerOnly;
