import { Button, Card, Col, Form, Image, Input, Row } from 'antd';

type Props = {
    user: any;
};
const ChangeInformation = ({ user }: Props) => {
    return (
        <div>
            <Row gutter={[16, 16]} style={{ padding: 40 }}>
                <Col span={8}>
                    <Card
                        title={
                            <span style={{ fontSize: 18 }}>Trang cá nhân</span>
                        }
                        bordered={true}
                        style={{
                            width: 300,
                            textAlign: 'center',
                        }}
                    >
                        <p style={{ marginTop: 30 }}>
                            <Image src='https://znews-photo.zingcdn.me/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg' />
                        </p>
                        <p
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 30,
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
                                Thay đổi mật khẩu
                            </span>
                        }
                        bordered={true}
                        style={{ width: 700 }}
                    >
                        <Form
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 16 }}
                            style={{
                                margin: '15px 10px',
                                padding: 10,
                            }}
                            autoComplete='off'
                        >
                            <Form.Item
                                label={<>Nhập mật khẩu cũ</>}
                                colon={true}
                                labelAlign='left'
                                name='passwordold'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập mật khẩu cũ của bạn!',
                                    },
                                ]}
                                validateTrigger={['onBlur', 'onChange']}
                            >
                                <Input style={{ width: 300 }} />
                            </Form.Item>
                            <Form.Item
                                label={<>Nhập mật khẩu mới</>}
                                colon={true}
                                labelAlign='left'
                                name='passwordnew'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập mật khẩu mới của bạn!',
                                    },
                                ]}
                                validateTrigger={['onBlur', 'onChange']}
                            >
                                <Input style={{ width: 300 }} />
                            </Form.Item>
                            <Form.Item
                                label={<>Nhập lại mật khẩu mới</>}
                                colon={true}
                                labelAlign='left'
                                name='confirmpassword'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập lại mật khẩu mới của bạn!',
                                    },
                                ]}
                                validateTrigger={['onBlur', 'onChange']}
                            >
                                <Input style={{ width: 300 }} />
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
