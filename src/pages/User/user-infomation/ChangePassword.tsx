import { Button, Form, Input } from 'antd';

const ChangeInformation = () => {
    const [form] = Form.useForm();
    const handleSubmit = (e: any) => {
        const profile = {
            ...e,
        };
    };
    return (
        <Form
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 24 }}
            style={{ marginTop: 10, padding: 10 }}
            autoComplete='off'
            form={form}
            onFinish={handleSubmit}
        >
            <Form.Item
                label={<>Nhập mật khẩu cũ</>}
                colon={true}
                labelAlign='left'
                name='passwordOld'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu cũ của bạn!',
                    },
                ]}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Input.Password style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
                label={<>Nhập mật khẩu mới</>}
                colon={true}
                labelAlign='left'
                name='passwordNew'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới của bạn!',
                    },
                ]}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Input.Password style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
                label={<>Nhập lại mật khẩu mới</>}
                colon={true}
                labelAlign='left'
                name='confirmPassword'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập lại mật khẩu mới của bạn!',
                    },
                ]}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Input.Password style={{ width: 400 }} />
            </Form.Item>
            <Button type='primary' htmlType='submit'>
                Lưu thông tin
            </Button>
        </Form>
    );
};

export default ChangeInformation;
