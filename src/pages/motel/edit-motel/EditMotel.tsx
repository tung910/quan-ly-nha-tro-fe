import { RollbackOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, message } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getDistrict,
    getDistrictByProvince,
    getProvince,
    getProvinces,
    getWard,
    getWardByDistrict,
} from '~/api/addressCheckout';
import { getMotel, updateMotel } from '~/api/motel.api';
import notification from '~/components/notification';
import HeaderPage from '~/components/page-header';
import { MESSAGES } from '~/constants/message.const';
import { MotelType } from '~/types/MotelType';

import styles from './EditMotel.module.scss';

const { Option } = Select;

const cx = classNames.bind(styles);

const EditMotel = () => {
    const [form] = Form.useForm();
    const id = (useParams().id as string) || '';
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
    useEffect(() => {
        const readMotel = async () => {
            const { data } = await getMotel(id);
            form.setFieldsValue(data);
        };
        readMotel();
    }, [id]);

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
        values._id = id;
        try {
            await updateMotel(values);
            notification({ message: MESSAGES.EDIT_SUCCESS });
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
                            title={'C???p nh???t nh?? tr???'}
                            btn1=' Quay l???i'
                            btn2=' C???p nh???t'
                            iconButton={<RollbackOutlined />}
                            href='/motel-room'
                        ></HeaderPage>
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Form.Item
                                    name='name'
                                    label='T??n nh?? tr???'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Kh??ng ???????c ????? tr???ng',
                                        },
                                        {
                                            type: 'string',
                                            min: 3,
                                            message: 'Ph???i l???n h??n 3 k?? t???!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nh???p t??n nh?? tr???' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name='commune' label='Ph?????ng/X??'>
                                    <Select
                                        placeholder='Ph?????ng/X??'
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
                                    label='T???nh/Th??nh ph???'
                                >
                                    <Select
                                        placeholder='T???nh/Th??nh ph???'
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
                                    label='?????a ch???'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Kh??ng ???????c ????? tr???ng',
                                        },
                                        {
                                            type: 'string',
                                            min: 3,
                                            message: 'Ph???i l???n h??n 3 k?? t???!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Qu???n/Huy???n' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item name='district' label='Qu???n/Huy???n'>
                                    <Select
                                        style={{ width: 420 }}
                                        placeholder='Qu???n/Huy???n'
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

export default EditMotel;
