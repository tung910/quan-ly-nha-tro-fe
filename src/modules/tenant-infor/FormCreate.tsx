import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import styles from './FormCreate.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';

type Props = {
    onSubmitForm: (values: string | number, name: string) => void;
    roomId: string;
};

const FormCreate = ({ onSubmitForm, roomId }: Props) => {
    const [form] = Form.useForm();

    return (
        <Form
            className={cx('form-create')}
            autoComplete='off'
            form={form}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            style={{ marginTop: 20, padding: 20 }}
        >
            {/* Row 1 */}
            <Row>
                <Col span={8}>
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
                        <Input
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            name='customerName'
                            style={{ width: 400 }}
                            autoFocus
                        />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>CMND/ CCCD</>}
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
                        <Input
                            name='citizenIdentification'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 2 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Giới Tính</>}
                        colon={false}
                        labelAlign='left'
                    >
                        <Select
                            defaultValue={1}
                            onChange={(e) => onSubmitForm(e, 'gender')}
                            showSearch
                            style={{ width: 400 }}
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                (
                                    option!.children as unknown as string
                                ).includes(input)
                            }
                        >
                            <Option value={1}>Nam</Option>
                            <Option value={2}>Nữ</Option>
                            <Option value={3}>Khác</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Ngày cấp</>}
                        colon={false}
                        labelAlign='left'
                    >
                        <Input
                            name='dateRange'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 3 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Số điện thoại</>}
                        colon={false}
                        labelAlign='left'
                    >
                        <Input
                            name='phone'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Nơi cấp</>}
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
                            onChange={(e) => onSubmitForm(e, 'issuedBy')}
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
                        colon={false}
                        labelAlign='left'
                    >
                        <Input
                            name='address'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Email</>}
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
                        <Input
                            name='email'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            style={{ width: 400 }}
                        />
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
                    >
                        <DatePicker
                            name='dateOfBirth'
                            onChange={(e) =>
                                onSubmitForm(
                                    e?.format('YYYY-MM-DD') || '',
                                    'dateOfBirth'
                                )
                            }
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Nơi sinh</>}
                        colon={false}
                        labelAlign='left'
                    >
                        <Select
                            onChange={(e) => onSubmitForm(e, 'birthPlace')}
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
                        colon={false}
                        name='motelRoomID'
                        initialValue={roomId}
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số phòng thuê của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Input
                            name='motelRoomID'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            disabled
                            style={{ width: 400 }}
                        />
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
                        <Input
                            name='priceRoom'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            suffix='VNĐ'
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 7 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Ngày bắt đầu </>}
                        colon={false}
                        labelAlign='left'
                        name='startDate'
                        initialValue={moment(new Date(), dateFormat)}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập ngày bắt đầu của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <DatePicker
                            name='startDate'
                            onChange={(e) =>
                                onSubmitForm(
                                    e?.format('YYYY-MM-DD') || '',
                                    'startDay'
                                )
                            }
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Đặt cọc</>}
                        colon={false}
                        initialValue={0}
                        name='deposit'
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tiền đặt cọc của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Input
                            name='deposit'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            suffix='VNĐ'
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 8 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Kỳ thanh toán</>}
                        colon={false}
                        labelAlign='left'
                        name='paymentPeriod'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập kỳ thanh toán của bạn!',
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                    >
                        <Select
                            defaultValue={1}
                            onChange={(e) => onSubmitForm(e, 'paymentPeriod')}
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
                            <Option value={1}>Kỳ 30</Option>
                            <Option value={2}>Kỳ 15</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Thanh toán mỗi lần</>}
                        colon={false}
                        labelAlign='left'
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
                            defaultValue={1}
                            onChange={(e) => onSubmitForm(e, 'payEachTime')}
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
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            {/* Row 9 */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<>Số xe</>}
                        colon={false}
                        labelAlign='left'
                    >
                        <Input
                            name='licensePlates'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Hình ảnh</>}
                        colon={false}
                        labelAlign='left'
                    >
                        <Input
                            name='Image'
                            onChange={(e) =>
                                onSubmitForm(e.target.value, e.target.name)
                            }
                            type='file'
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default FormCreate;
