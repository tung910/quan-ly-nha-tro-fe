import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '~/api/auth.api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { logOut } from '~/feature/user/userSlice';

const { confirm } = Modal;
const ChangeInformation = () => {
    const user = useAppSelector((state: any) => state.user.user);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const formValue = await form.validateFields();
            if (formValue.passwordNew !== formValue.confirmPassword) {
                form.setFields([
                    {
                        name: 'confirmPassword',
                        errors: ['Vui lòng kiểm tra lại'],
                    },
                ]);
                return;
            }
            const value = {
                password: formValue.passwordNew,
            };
            const res = await changePassword(user._id, value);
            if (res.data) {
                confirm({
                    title: 'Đổi mật khẩu thành công',
                    icon: <ExclamationCircleFilled />,
                    content: 'Vui lòng đăng nhập lại để tiếp tục',
                    onOk() {
                        dispatch(logOut());
                        localStorage.clear();
                        navigate('/login');
                    },
                });
            }
        } catch (error) {
            //
        }
    };
    return (
        <>
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
        </>
    );
};

export default ChangeInformation;
