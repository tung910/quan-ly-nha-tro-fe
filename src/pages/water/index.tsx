/* eslint-disable no-duplicate-imports */
/* eslint-disable no-console */
import { Button, Checkbox, PageHeader, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
import { SaveOutlined } from '@ant-design/icons';
import Table from '~/components/table';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { fetchService } from '~/feature/service/serviceSlice';
import { generatePriceToVND } from '~/utils/helper';
import styles from './Water.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const columnsService: ColumnsType = [
    {
        title: 'Nhà',
        dataIndex: 'serviceName',
    },
    {
        title: 'Phòng',
        dataIndex: 'serviceTypeName',
    },
    {
        title: 'Khách thuê',
        dataIndex: 'unitPrice',
        render: (price) => {
            return <>{generatePriceToVND(price)}</>;
        },
    },
    {
        title: 'CS nước cũ',
        dataIndex: 'unitPrice',
        render: (price) => {
            return <>{generatePriceToVND(price)}</>;
        },
    },
    {
        title: 'CS nước mới',
        dataIndex: 'unitPrice',
        render: (price) => {
            return <>{generatePriceToVND(price)}</>;
        },
    },
    {
        title: 'Sử dụng',
        dataIndex: 'unitPrice',
        render: (price) => {
            return <>{generatePriceToVND(price)}</>;
        },
    },
    {
        title: '',
        width: '5%',
        dataIndex: '_id',
        render: (id) => {
            return (
                <Space>
                    <Tooltip title='lưu'>
                        <Link to={'edit/' + id}>
                            <Button
                                type='primary'
                                icon={<SaveOutlined />}
                            ></Button>
                        </Link>
                    </Tooltip>
                </Space>
            );
        },
    },
];

const WaterPage = () => {
    const dispatch = useAppDispatch();
    const serviceStore = useAppSelector((state) => state.service.value);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        type: selectedRowKeys,
        onChange: onSelectChange,
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    useEffect(() => {
        dispatch(fetchService());
    }, [dispatch]);

    return (
        <div>
            <div>
                <PageHeader ghost={true} title='Chỉ số nước'></PageHeader>
            </div>
            <div className=''>
                <div className={cx('grid-date')}>
                    <div className=''>
                        <label>
                            Tháng/năm: &nbsp;
                            <Space direction='vertical'>
                                <DatePicker onChange={onChange} />
                            </Space>
                        </label>
                    </div>
                    <div className=''>
                        <label>
                            Kì: &nbsp;
                            <Select
                                defaultValue='lucy'
                                style={{ width: 150 }}
                                onChange={handleChange}
                            >
                                <Option value='jack'>1</Option>
                                <Option value='lucy'>2</Option>
                                <Option value='lucy'>3</Option>
                                <Option value='lucy'>Tất cả</Option>
                            </Select>
                        </label>
                    </div>
                    <div className=''>
                        <label>
                            Nhà: &nbsp;
                            <Select
                                defaultValue='lucy'
                                style={{ width: 150 }}
                                onChange={handleChange}
                            >
                                <Option value='jack'> Tầng 1</Option>
                                <Option value='lucy'> Tầng 2</Option>
                                <Option value='lucy'> Tầng 3</Option>
                                <Option value='lucy'>Tất cả</Option>
                            </Select>
                        </label>
                    </div>
                    <div className=''>
                        <label>
                            Trạng thái phòng: &nbsp;
                            <Select
                                defaultValue='lucy'
                                style={{ width: 150 }}
                                onChange={handleChange}
                            >
                                <Option value='jack'>Đã cho thuê</Option>
                                <Option value='lucy'>Còn trống</Option>
                                <Option value='lucy'>Tất cả</Option>
                            </Select>
                        </label>
                    </div>
                </div>
                <b>Lưu ý:</b>
                <br></br> - Bạn phải gán dịch vụ thuộc loại nước cho khách thuê
                trước thì phần chỉ số này mới được tính cho phòng đó khi tính
                tiền.<br></br>- Đối với lần đầu tiên sử dụng phần mềm bạn sẽ
                phải nhập chỉ số cũ và mới cho tháng sử dụng đầu tiên, các tháng
                tiếp theo phần mềm sẽ tự động lấy chỉ số mới tháng trước làm chỉ
                số cũ tháng sau.
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
                <Table
                    columns={columnsService}
                    dataSource={serviceStore}
                    rowSelection={rowSelection}
                />
            </div>
        </div>
    );
};

export default WaterPage;
