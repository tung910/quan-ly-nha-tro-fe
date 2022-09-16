/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form, Input, Space, Breadcrumb, Layout, Row, Col } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { MotelType } from '~/types/Model';
import styles from './AddMotel.module.scss';
import classNames from 'classnames/bind';
import { addMotel } from '~/api/Motel';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const AddMotel = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values: MotelType) => {
        const add = async () => {
            await addMotel(values);
            alert('Bạn thêm thành công!');
            navigate('/motel-room');
        };
        add();
    };
    return (
        <div>
            <Content>
                <div>
                    <h2>Thêm mới nhà trọ</h2>
                </div>
                <div className={cx('form-add')}>
                    <Form
                        autoComplete='off'
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                        wrapperCol={{ span: 20 }}
                    >
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
                        <Form.Item className={cx('button')}>
                            <Space>
                                <Button type='primary' htmlType='submit'>
                                    Thêm mới
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </div>
    );
};

export default AddMotel;
