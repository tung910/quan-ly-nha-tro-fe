import { Button, Col, Form, Image, Input, PageHeader, Row } from 'antd';
import classNames from 'classnames/bind';
import styles from './UserInfor.module.scss';
import { CheckOutlined, UndoOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const UserInformation = () => {
    const [form] = Form.useForm();
    return (
        <div>
            <div>
                <PageHeader ghost={true} title='Thông tin khách thuê' />
            </div>

            <div>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete='off'
                    form={form}
                >
                    <Row>
                        <Col span={8} style={{ flex: 0 }}>
                            <Image
                                className={cx('image')}
                                width={300}
                                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                            />
                            <Input
                                type='file'
                                style={{ width: 300, margin: 30, padding: 10 }}
                            />
                        </Col>
                        <Col span={12} className={cx('col')}>
                            <Row gutter={[16, 16]} className={cx('width-row')}>
                                <Col span={12}>
                                    <Form.Item
                                        label={<>Họ và tên</>}
                                        colon={false}
                                        labelAlign='left'
                                        name='customerName'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng nhập tên người dùng của bạn!',
                                            },
                                        ]}
                                        validateTrigger={['onBlur', 'onChange']}
                                    >
                                        <Input autoFocus />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<>Số điện thoại</>}
                                        colon={false}
                                        labelAlign='left'
                                        name='phoneNumber'
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row
                                gutter={[16, 16]}
                                className={cx('width-row-bottom')}
                            >
                                <Col span={12}>
                                    <Form.Item
                                        label={<>Email</>}
                                        colon={false}
                                        labelAlign='left'
                                        name='email'
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<>Số điện thoại</>}
                                        colon={false}
                                        labelAlign='left'
                                        name='phoneNumber'
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row
                                gutter={[16, 16]}
                                className={cx('width-row-bottom')}
                            >
                                <Col span={12}>
                                    <Form.Item
                                        label={<>Email</>}
                                        colon={false}
                                        labelAlign='left'
                                        name='email'
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<>Số điện thoại</>}
                                        colon={false}
                                        labelAlign='left'
                                        name='phoneNumber'
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row
                                gutter={[16, 16]}
                                className={cx('width-row-bottom')}
                            >
                                <Col span={12}>
                                    <Form.Item
                                        label={<>Email</>}
                                        colon={false}
                                        labelAlign='left'
                                        name='email'
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<>Số điện thoại</>}
                                        colon={false}
                                        labelAlign='left'
                                        name='phoneNumber'
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row style={{ float: 'right', marginRight: 80 }}>
                        <Button
                            type='default'
                            icon={<UndoOutlined />}
                            style={{ float: 'right', marginRight: 20 }}
                        >
                            Nhập lại
                        </Button>

                        <Button type='primary' icon={<CheckOutlined />}>
                            Lưu thông tin
                        </Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default UserInformation;
