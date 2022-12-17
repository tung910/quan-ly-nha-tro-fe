/* eslint-disable no-use-before-define */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Form, InputNumber, Space, notification } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, verifyOtp } from '~/api/auth.api';
import { useAppDispatch } from '~/app/hooks';
import { setIsLoading } from '~/feature/service/appSlice';
import { IUser } from '~/types/User.type';

import styles from './signUp.module.scss';

interface Props {
    form: FormInstance<any>;
}
const DescriptionOTP = ({ form }: Props) => {
    return (
        <>
            <Form form={form}>
                <Form.Item name='otp'>
                    <InputNumber maxLength={6} style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </>
    );
};

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [api, contextHolder]: any = notification.useNotification();

    const onSubmit: SubmitHandler<any> = async (data: IUser) => {
        dispatch(setIsLoading(true));
        try {
            await signUp(data);
            openNotification(data.email);
        } catch (error: any) {
            dispatch(setIsLoading(false));
        }
    };
    const handleCheckOtp = async (email: string) => {
        const otp = form.getFieldValue('otp');
        if (otp) {
            try {
                await verifyOtp({ email, otp });
                dispatch(setIsLoading(false));
                notification.open({
                    message: 'Đăng ký tài khoản thành công',
                    icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                });
                navigate('/login');
            } catch (error: any) {
                form.setFields([
                    {
                        name: 'otp',
                        errors: [error.messages],
                    },
                ]);
            }
        } else {
            form.setFields([
                {
                    name: 'otp',
                    errors: ['Vui lòng không bỏ trống trường này'],
                },
            ]);
            return;
        }
    };

    const openNotification = (email: string) => {
        const key = `open${Date.now()}`;

        const btn = (
            <Space>
                <Button
                    type='primary'
                    size='small'
                    onClick={() => handleCheckOtp(email)}
                >
                    Gửi
                </Button>
            </Space>
        );
        api.open({
            message:
                'Vui lòng kiểm tra email của bạn và nhập mã vừa nhận vào bên dưới',
            description: <DescriptionOTP form={form} />,
            btn,
            key,
            onClose: close,
            duration: 0,
        });
    };

    return (
        <div className={styles['wrapper']}>
            {contextHolder}
            <div className={styles['center']}>
                <h1 className=''>Đăng ký</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles['txt_field']}>
                        <input
                            type='text'
                            {...register('name', {
                                required: true,
                            })}
                        />
                        {errors?.email?.type === 'required' && (
                            <span className={styles['my-error']}>
                                Vui lòng không bỏ trống trường này
                            </span>
                        )}
                        {/* <span></span> */}
                        <label htmlFor=''>Tên đăng nhập</label>
                    </div>
                    <div className={styles['txt_field']}>
                        <input
                            type='email'
                            {...register('email', {
                                required: true,
                            })}
                        />
                        {errors?.email?.type === 'required' && (
                            <span className={styles['my-error']}>
                                Vui lòng không bỏ trống trường này
                            </span>
                        )}
                        {/* <span></span> */}
                        <label htmlFor=''>Email đăng nhập</label>
                    </div>
                    <div className={styles['txt_field']}>
                        <input
                            type='number'
                            {...register('phone', {
                                required: true,
                            })}
                        />
                        {errors?.email?.type === 'required' && (
                            <span className={styles['my-error']}>
                                Vui lòng không bỏ trống trường này
                            </span>
                        )}
                        <label htmlFor=''>Số điện thoại</label>
                    </div>
                    <div className={styles['txt_field']}>
                        <input
                            type='password'
                            {...register('password', {
                                required: true,
                            })}
                        />
                        {errors?.password?.type === 'required' && (
                            <span className={styles['my-error']}>
                                Vui lòng không bỏ trống trường này
                            </span>
                        )}
                        <label htmlFor=''>Mật khẩu</label>
                    </div>
                    <button className={styles['btn_login']} type='submit'>
                        Đăng Ký
                    </button>
                    <div className={styles['signup_link']}>
                        Bạn đã có tài khoản?{' '}
                        <Link to='/login' className={styles['signup_link-btn']}>
                            Đăng nhập
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
