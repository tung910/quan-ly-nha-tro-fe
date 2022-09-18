import { Button, Form, Input, Space, Row, Col } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { RollbackOutlined } from '@ant-design/icons';

import { MotelType } from '~/types/MotelType';
import styles from './EditMotel.module.scss';
import classNames from 'classnames/bind';
import { getMotel, updateMotel } from '~/api/motel.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import HeaderPage from '~/components/page-header';
const cx = classNames.bind(styles);

const EditMotel = () => {
    const [form] = Form.useForm<MotelType>();
    const id = (useParams().id as string) || '';
    const navigate = useNavigate();

    const onFinish = async (values: MotelType) => {
        values.id = id;

        try {
            await updateMotel(values);
            alert('Bạn sửa thành công!');
            navigate('/motel-room');
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const readMotel = async () => {
            const { data } = await getMotel(id);
            form.setFieldsValue(data);
        };

        readMotel();
    }, []);
    return (
        <div>
            <Content>
                <div className={cx('form-edit')}>
                    <Form
                        autoComplete='off'
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                        wrapperCol={{ span: 20 }}
                    >
                        <HeaderPage
                            title={'Cập nhật nhà trọ'}
                            btn1=' Quay lại'
                            btn2=' Cập nhật'
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
                                    name='province'
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
                                    <Input placeholder='Tỉnh' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name='district'
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
                                    <Input placeholder='Quận/Huyện' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='ward'
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
                                    <Input placeholder='Phường/Xã' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
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
                    </Form>
                </div>
            </Content>
        </div>
    );
};

export default EditMotel;
