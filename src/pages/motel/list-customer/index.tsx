import {
    CheckOutlined,
    DeleteOutlined,
    RollbackOutlined,
} from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Input,
    PageHeader,
    Select,
    Space,
    Tooltip,
} from 'antd';
import classNames from 'classnames/bind';
import Table from '~/components/table';
import { generatePriceToVND } from '~/utils/helper';

import styles from './ListCustomer.module.scss';

const { Option } = Select;

const cx = classNames.bind(styles);

const ColumnsListCustomer: any = [
    {
        title: 'Phòng số',
        dataIndex: '',
    },
    {
        title: 'Khu vực',
        dataIndex: '',
    },
    {
        title: 'Họ tên',
        dataIndex: '',
        render: (name: string) => {
            return <Input>{name}</Input>;
        },
    },
    {
        title: 'Số điện thoại',
        dataIndex: '',
        render: (phoneNumber: number) => {
            return <Input>{phoneNumber}</Input>;
        },
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: '',
        render: (date: any) => {
            return <DatePicker value={date} />;
        },
    },
    {
        title: 'Tiền phòng',
        dataIndex: '',
        render: (price: number) => {
            return <Input>{generatePriceToVND(price)}</Input>;
        },
    },
    {
        title: 'Đặt cọc',
        dataIndex: '',
        render: (deposit: number) => {
            return <Input>{generatePriceToVND(deposit)}</Input>;
        },
    },
    {
        title: 'Kỳ thanh toán',
        dataIndex: '',
        render: (paymentPeriod: number) => {
            return (
                <Select showSearch>
                    <Option value={1}>{paymentPeriod}</Option>
                </Select>
            );
        },
    },
    {
        title: '',
        width: '5%',
        render: (id: any) => {
            return (
                <Space>
                    <Tooltip title='Xóa'>
                        <Button
                            type='primary'
                            danger
                            icon={<DeleteOutlined />}
                        ></Button>
                    </Tooltip>
                </Space>
            );
        },
    },
];
const ListCustomer = () => {
    return (
        <div>
            <div>
                <PageHeader
                    className={cx('page-header')}
                    ghost={true}
                    title='Khách thuê'
                    extra={[
                        <Select key={1} defaultValue='1'>
                            <Option value='1'>Tất cả</Option>
                            <Option value='2'>Tầng 1</Option>
                        </Select>,
                        <Button key={2} icon={<RollbackOutlined />}>
                            Quay lại
                        </Button>,
                        <Button type='primary' key={3} icon={<CheckOutlined />}>
                            Lưu thông tin
                        </Button>,
                    ]}
                ></PageHeader>
            </div>
            <div>
                <Table dataSource={[]} columns={ColumnsListCustomer} />
            </div>
        </div>
    );
};

export default ListCustomer;
