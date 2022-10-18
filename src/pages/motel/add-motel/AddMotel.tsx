import { Form, Input, Row, Col, message, Select } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import { MotelType } from '~/types/MotelType';
import styles from './AddMotel.module.scss';
import classNames from 'classnames/bind';
const { Option } = Select;
import { addMotel } from '~/api/motel.api';
import { useNavigate } from 'react-router-dom';
import HeaderPage from '~/components/page-header';
import { MESSAGES } from '~/constants/message.const';
import { useEffect, useState } from 'react';
import {
    getDistrict,
    getDistrictByProvince,
    getProvince,
    getProvinces,
    getWard,
    getWardByDistrict,
} from '~/api/addressCheckout';
const cx = classNames.bind(styles);

const AddMotel = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState<MotelType[]>([]);
    const [districts, setDistricts] = useState<MotelType[]>([]);
    const [wards, setWards] = useState<MotelType[]>([]);

    useEffect(() => {
        const getDataProvince = async () => {
            const { data } = await getProvinces();
            setProvinces(data);
        };
        getDataProvince();
    }, []);

    // provice render
    const handleChangeProvince = async (code: any) => {
        if (code === '') {
            setDistricts([]);
            setWards([]);
        } else {
            const {
                data: { districts },
            } = await getDistrictByProvince(code);
            setDistricts(districts);
        }
    };
    const handleChangeDistrict = async (code: number | string) => {
        if (code === '') {
            setWards([]);
        } else {
            const {
                data: { wards },
            } = await getWardByDistrict(code);
            setWards(wards);
        }
    };
    const onFinish = async (values: MotelType) => {
        const dataProvince = await getProvince(values.province);
        const dataDistrict = await getDistrict(values.district);
        const dataWard = await getWard(values.commune);

        const dataAddress =
            dataProvince.data.name +
            ', ' +
            dataDistrict.data.name +
            ', ' +
            dataWard.data.name +
            ', ' +
            values.address;
        try {
            await addMotel({ ...values, address: dataAddress });
            message.success(MESSAGES.ADD_SUCCESS);
            navigate('/motel-room');
        } catch (error) {
            message.error(MESSAGES.ERROR);
        }
    };

    return (
        <div>
            <Content>
                <div></div>
                <div className={cx('form-add')}>
                    <Form
                        autoComplete='off'
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                        wrapperCol={{ span: 20 }}
                    >
                        <HeaderPage
                            title={'Thêm mới nhà trọ'}
                            btn1=' Quay lại'
                            btn2=' Thêm mới'
                            iconButton={<RollbackOutlined />}
                            href='/motel-room'
                        ></HeaderPage>
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Form.Item
                                    name='name'
                                    label='Tên nhà trọ'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
                                        },
                                        {
                                            type: 'string',
                                            min: 3,
                                            message: 'Phải lớn hơn 3 ký tự!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập tên nhà trọ' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name='commune' label='Phường/Xã'>
                                    <Select
                                        placeholder='Phường/Xã'
                                        style={{ width: 420 }}
                                        onChange={(e) =>
                                            handleChangeDistrict(e)
                                        }
                                    >
                                        {wards.map((item, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={item?.code}
                                                >
                                                    {item?.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name='province'
                                    label='Tỉnh/Thành phố'
                                >
                                    <Select
                                        placeholder='Tỉnh/Thành phố'
                                        style={{ width: 420 }}
                                        onChange={(e) =>
                                            handleChangeProvince(e)
                                        }
                                    >
                                        {provinces.map((item, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={item?.code}
                                                >
                                                    {item?.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='address'
                                    label='Địa chỉ'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
                                        },
                                        {
                                            type: 'string',
                                            min: 3,
                                            message: 'Phải lớn hơn 3 ký tự!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Quận/Huyện' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item name='district' label='Quận/Huyện'>
                                    <Select
                                        style={{ width: 420 }}
                                        placeholder='Quận/Huyện'
                                        onChange={(e) =>
                                            handleChangeDistrict(e)
                                        }
                                    >
                                        {districts.map((item, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={item?.code}
                                                >
                                                    {item?.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Content>
        </div>
    );
};

export default AddMotel;
