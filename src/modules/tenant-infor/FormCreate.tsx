/* eslint-disable indent */
import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './FormCreate.module.scss';
import { useEffect } from 'react';
import { getDetailCustomerToRoom } from '~/api/customer.api';
import { DATE_FORMAT } from '~/consts/const';
const cx = classNames.bind(styles);

const { Option } = Select;
type Props = {
    onSave: (values: any) => void;
    roomRentID: string;
    form: any;
    roomName: string;
    provinces: any;
};

const FormCreate = ({
    onSave,
    roomRentID,
    roomName,
    form,
    provinces,
}: Props) => {
    useEffect(() => {
        if (roomRentID) {
            const dataRoom = async () => {
                const { data } = await getDetailCustomerToRoom(roomRentID);

                form.setFieldsValue({
                    ...data,
                    dateOfBirth: data.dateOfBirth
                        ? moment(data.dateOfBirth, DATE_FORMAT)
                        : '',
                    startDate: data.startDate
                        ? moment(data.startDate, DATE_FORMAT)
                        : moment(new Date(), DATE_FORMAT),
                });
            };
            dataRoom();
        }
    }, []);

    return (
        <Form
            className={cx('form-create')}
            autoComplete='off'
            form={form}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            style={{ marginTop: 20, padding: 20 }}
            onFinish={onSave}
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
                        <Input style={{ width: 400 }} autoFocus />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>CMND/ CCCD</>}
                        colon={false}
                        labelAlign='left'
                        name='citizenIdentification'
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
                        labelAlign='left'
                        name='gender'
                    >
                        <Select
                            placeholder='Mời chọn giới tính'
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
                        name='dateRange'
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
                        colon={false}
                        labelAlign='left'
                        name='phone'
                    >
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Nơi cấp</>}
                        colon={false}
                        labelAlign='left'
                        name='issuedBy'
                    >
                        <Select
                            placeholder='Mời chọn nơi cấp'
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
                            {provinces.map((item: any, index: any) => {
                                return (
                                    <Option key={index} value={item?.name}>
                                        {item?.name}
                                    </Option>
                                );
                            })}
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
                        name='address'
                    >
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Email</>}
                        colon={false}
                        labelAlign='left'
                        name='email'
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
                        name='dateOfBirth'
                    >
                        <DatePicker
                            format={DATE_FORMAT}
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Nơi sinh</>}
                        colon={false}
                        labelAlign='left'
                        name='birthPlace'
                    >
                        <Select
                            placeholder='Mời chọn nơi sinh'
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
                            {provinces.map((item: any, index: any) => {
                                return (
                                    <Option key={index} value={item?.name}>
                                        {item?.name}
                                    </Option>
                                );
                            })}
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
                        name='roomName'
                        initialValue={roomName}
                        labelAlign='left'
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
                    >
                        <InputNumber
                            formatter={(value) =>
                                ` ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                )
                            }
                            parser={(value: any) =>
                                value.replace(/\$\s?|(,*)/g, '')
                            }
                            addonAfter={'VND'}
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
                        initialValue={moment()}
                    >
                        <DatePicker
                            format={DATE_FORMAT}
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
                    >
                        <InputNumber
                            formatter={(value) =>
                                ` ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                )
                            }
                            parser={(value: any) =>
                                value.replace(/\$\s?|(,*)/g, '')
                            }
                            addonAfter='VNĐ'
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
                    >
                        <Select
                            placeholder='Mời chọn kỳ thanh toán'
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
                        name='payEachTime'
                    >
                        <Select
                            placeholder='Mời chọn thanh toán mỗi lần'
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
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                </Col>
                <Col span={8} offset={4}>
                    <Form.Item
                        label={<>Hình ảnh</>}
                        colon={false}
                        labelAlign='left'
                    >
                        <Input type='file' style={{ width: 400 }} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default FormCreate;
