import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { useState } from 'react';
import moment from 'moment';
import styles from './FormCreate.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const initialState = {
    name: '',
    cmnd: '',
    dateLevel: '',
    PhoneNumber: '',
    issuedBy: '',
    address: '',
    email: '',
    datePicker: '',
    birthplace: '',
    carNumber: '',
};
const FormCreate = () => {
    const [form] = Form.useForm();
    const [dataInput, setdataInput] = useState(initialState);

    const onFinish = (values: any) => {
        const dataForm = {
            ...values,
            datePicker: values['datePicker'].format('YYYY-MM-DD'),
            startDay: values['startDay'].format('YYYY-MM-DD'),
        };
        const FormData = fetch('http://localhost:3001/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataForm),
        }).then((res) => res.json());
    };
    return (
        <Form
            className={cx('form-create')}
            autoComplete='off'
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ marginTop: 20, padding: 20 }}
            onFinish={onFinish}
        >
            {/* Row 1 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Họ và tên</>}
                        name='name'
                        colon={false}
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Vui lòng nhập tên người dùng của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Input style={{ width: 400 }} autoFocus />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>CMND/ CCCD</>}
                        name='cmnd'
                        colon={false}
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập CMND/ CCCD của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 2 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Giới Tính</>}
                        colon={false}
                        name='gender'
                        labelAlign='left'
                        initialValue={'Nam'}
                    >
                        <Select
                            showSearch
                            style={{ width: 400 }}
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                (
                                    option!.children as unknown as string
                                ).includes(input)
                            }
                        >
                            <Option value='1'>Nam</Option>
                            <Option value='2'>Nữ</Option>
                            <Option value='3'>Khác</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Ngày cấp</>}
                        name='dateLevel'
                        colon={false}
                        labelAlign='left'
                    >
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 3 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Số điện thoại</>}
                        name='PhoneNumber'
                        colon={false}
                        labelAlign='left'
                    >
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Nơi cấp</>}
                        name='issuedBy'
                        colon={false}
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập nơi cấp của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Select
                            showSearch
                            style={{ width: 400 }}
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                (
                                    option!.children as unknown as string
                                ).includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA!.children as unknown as string)
                                    .toLowerCase()
                                    .localeCompare(
                                        (
                                            optionB!
                                                .children as unknown as string
                                        ).toLowerCase()
                                    )
                            }
                        >
                            <Option value='1'>Not Identified</Option>
                            <Option value='2'>Closed</Option>
                            <Option value='3'>Communicated</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 4 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Địa chỉ thường trú</>}
                        name='address'
                        colon={false}
                        labelAlign='left'
                    >
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Email</>}
                        name='email'
                        colon={false}
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 5 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Ngày sinh</>}
                        colon={false}
                        labelAlign='left'
                        name='datePicker'
                    >
                        <DatePicker style={{ width: 400 }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Nơi sinh</>}
                        name='birthplace'
                        colon={false}
                        labelAlign='left'
                    >
                        <Select
                            showSearch
                            style={{ width: 400 }}
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                (
                                    option!.children as unknown as string
                                ).includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA!.children as unknown as string)
                                    .toLowerCase()
                                    .localeCompare(
                                        (
                                            optionB!
                                                .children as unknown as string
                                        ).toLowerCase()
                                    )
                            }
                        >
                            <Option value='1'>Not Identified</Option>
                            <Option value='2'>Closed</Option>
                            <Option value='3'>Communicated</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 6 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Thuê phòng số </>}
                        name='numberRoom'
                        initialValue={1}
                        colon={false}
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số phòng thuê của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Input disabled style={{ width: 400 }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Tiền phòng</>}
                        name='priceRoom'
                        initialValue={3000000}
                        colon={false}
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tiền phòng của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Input suffix='VNĐ' style={{ width: 400 }} />
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 7 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Ngày bắt đầu </>}
                        name='startDay'
                        colon={false}
                        labelAlign='left'
                        initialValue={moment('2015-06-06', dateFormat)}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập ngày bắt đầu của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <DatePicker disabled style={{ width: 400 }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Đặt cọc</>}
                        name='deposit'
                        initialValue={0}
                        colon={false}
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tiền đặt cọc của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Input suffix='VNĐ' style={{ width: 400 }} />
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 8 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Kỳ thanh toán</>}
                        name='PaymentPeriod'
                        colon={false}
                        labelAlign='left'
                        initialValue={'Kỳ 30'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập kỳ thanh toán của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Select
                            showSearch
                            style={{ width: 400 }}
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                (
                                    option!.children as unknown as string
                                ).includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA!.children as unknown as string)
                                    .toLowerCase()
                                    .localeCompare(
                                        (
                                            optionB!
                                                .children as unknown as string
                                        ).toLowerCase()
                                    )
                            }
                        >
                            <Option value='1'>Kỳ 30</Option>
                            <Option value='2'>Kỳ 15</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Thanh toán mỗi lần</>}
                        name='payment'
                        colon={false}
                        labelAlign='left'
                        initialValue={1}
                        rules={[
                            {
                                required: true,
                                message:
                                    'Vui lòng nhập tháng thanh toán của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Select
                            showSearch
                            suffixIcon='Tháng'
                            style={{ width: 400 }}
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                (
                                    option!.children as unknown as string
                                ).includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA!.children as unknown as string)
                                    .toLowerCase()
                                    .localeCompare(
                                        (
                                            optionB!
                                                .children as unknown as string
                                        ).toLowerCase()
                                    )
                            }
                        >
                            <Option value='1'>1</Option>
                            <Option value='2'>2</Option>
                            <Option value='3'>3</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 9 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Số xe</>}
                        name='carNumber'
                        colon={false}
                        labelAlign='left'
                    >
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Hình ảnh</>}
                        name='Image'
                        colon={false}
                        labelAlign='left'
                    >
                        <Input type='file' style={{ width: 400 }} />
                    </Form.Item>
                </Col>
            </Row>
            <Button icon={<RollbackOutlined />} className={cx('btn-back')}>
                Quay lại
            </Button>
            <Button
                htmlType='submit'
                type='primary'
                className={cx('btn-submit')}
                icon={<CheckOutlined />}
            >
                Lưu Thông Tin
            </Button>
        </Form>
    );
};

export default FormCreate;
