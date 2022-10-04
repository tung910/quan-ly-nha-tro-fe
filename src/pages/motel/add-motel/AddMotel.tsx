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
import { MESSAGES } from '~/consts/message.const';
import { useEffect, useState } from 'react';
import {
    getDistrictByProvince,
    getProvince,
    getProvinces,
    getWardByDistrict,
} from '~/api/addressCheckout';
import { useForm } from 'react-hook-form';
const cx = classNames.bind(styles);

const AddMotel = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const getDataProvince = async () => {
            const { data } = await getProvinces();
            setProvinces(data);
        };
        getDataProvince();
    }, []);

    // provice render
    const handleChangeProvince = async (code: any) => {
        // console.log('a', code);
        if (code === '') {
            setDistricts([]);
            setWards([]);
        } else {
            const {
                data: { districts },
            } = await getDistrictByProvince(code);
            setDistricts(districts);
            // console.log('111', districts);
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

    // // address
    // const addressDataTotal = async (
    //     codeP: string | number,
    //     codeD: string | number,
    //     codeW: string | number
    // ) => {
    //     const province = await getProvince(+codeP);
    //     const district = await getDistrict(+codeD);
    //     const ward = await getWard(+codeW);
    //     return `${province.data.name}, ${district.data.name}, ${ward.data.name}`;
    // };
    const onFinish = async (values: MotelType) => {
        // const nameProvince = await getProvince(provinces)
        // const address =
        //     (await addressDataTotal(data.province, data.district, data.ward)) +
        //     ', ' +
        //     data.address;
        const add = async () => {
            console.log('123', values);
            await addMotel(values);

            message.success(MESSAGES.ADD_SUCCESS);
            navigate('/motel-room');
        };

        add();
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
                                <Form.Item
                                    // name='commune'
                                    label='Phường/Xã'
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
                                    <Select
                                        // defaultValue='Phường/Xã'
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
                                    // name='province'
                                    label='Tỉnh/Thành phố'
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
                                    <Select
                                        // name='province'
                                        placeholder='Tỉnh/Thành phố'
                                        style={{ width: 420 }}
                                        // mode='multiple'
                                        // maxTagCount={2}
                                        // allowClear
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
                                <Form.Item
                                    label='Quận/Huyện'
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
                                    <Select
                                        // defaultValue='Quận/Huyện'
                                        style={{ width: 420 }}
                                        placeholder='Quận/Huyện'
                                        // mode='multiple'
                                        // maxTagCount={2}
                                        // allowClear
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
                    {/* <Select
                        defaultValue='lucy'
                        style={{ width: 180 }}
                        placeholder='Choose Province'
                        // mode='multiple'
                        // maxTagCount={2}
                        // allowClear
                        onChange={(e) => handleChangeProvince(e)}
                    >
                        {provin.map((item, index) => {
                            return (
                                <Option key={index} value={provin}>
                                    {item}
                                </Option>
                            );
                        })}
                    </Select> */}
                </div>
            </Content>
        </div>
    );
};

export default AddMotel;
