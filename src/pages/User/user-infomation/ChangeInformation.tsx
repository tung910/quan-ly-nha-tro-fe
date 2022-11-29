import { Button, Card, Col, Form, FormInstance, Image, Input, Row } from 'antd';

type Props = {
    user: any;
    form: FormInstance<any>;
};
const ChangeInformation = ({ user, form }: Props) => {
    return (
        <div>
            <Row
                gutter={[16, 16]}
                style={{
                    marginTop: 20,
                    padding: 20,
                    border: '1px solid rgb(205, 205, 205)',
                }}
            >
                <Col span={8}>
                    <Card
                        title={
                            <span style={{ fontSize: 18 }}>Trang cá nhân</span>
                        }
                        bordered={true}
                        style={{ width: 300, textAlign: 'center' }}
                    >
                        <p style={{ marginTop: 30 }}>
                            <Image
                                src='https://znews-photo.zingcdn.me/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
                                loading='lazy'
                            />
                        </p>
                        <p
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 30,
                                marginBottom: 110,
                            }}
                        >
                            {user?.name}
                        </p>
                    </Card>
                </Col>

                <Col span={6}>
                    <Card
                        title={
                            <span style={{ fontSize: 18 }}>
                                Thay đổi thông tin cá nhân
                            </span>
                        }
                        bordered={true}
                        style={{ width: 700 }}
                    >
                        <Form
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 16 }}
                            style={{ marginTop: 10, padding: 10 }}
                            autoComplete='off'
                            form={form}
                        >
                            <Form.Item
                                label={<>Họ và tên</>}
                                colon={true}
                                labelAlign='left'
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập họ và tên người dùng!',
                                    },
                                ]}
                                validateTrigger={['onChange']}
                            >
                                <Input style={{ width: 400 }} />
                            </Form.Item>
                            <Form.Item
                                label={<>Email</>}
                                colon={true}
                                labelAlign='left'
                                name='email'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập email người dùng!',
                                    },
                                ]}
                                validateTrigger={['onChange']}
                            >
                                <Input style={{ width: 400 }} disabled />
                            </Form.Item>
                            <Form.Item
                                label={<>Số điện thoại</>}
                                colon={true}
                                labelAlign='left'
                                name='phone'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập số điện thoại người dùng!',
                                    },
                                ]}
                                validateTrigger={['onChange']}
                            >
                                <Input style={{ width: 400 }} />
                            </Form.Item>
                            <Form.Item
                                label={<>Số CMND</>}
                                colon={true}
                                labelAlign='left'
                                name='citizenIdentificationNumber'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập chứng minh nhân dân người dùng!',
                                    },
                                ]}
                                validateTrigger={['onChange']}
                            >
                                <Input style={{ width: 400 }} />
                            </Form.Item>

                            <Form.Item
                                label={<>Địa chỉ</>}
                                colon={true}
                                labelAlign='left'
                                name='address'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập địa chỉ người dùng!',
                                    },
                                ]}
                                validateTrigger={['onBlur', 'onChange']}
                            >
                                <Input style={{ width: 400 }} />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Lưu thông tin
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ChangeInformation;
