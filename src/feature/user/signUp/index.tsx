/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, verifyOtp } from '~/api/auth.api';
import { useAppDispatch } from '~/app/hooks';
import { setIsLoading } from '~/feature/service/appSlice';
import { IUser } from '~/types/User.type';

import styles from './signUp.module.scss';

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<any> = async (data: IUser) => {
        dispatch(setIsLoading(true));
        try {
            await signUp(data);
            const otp = prompt(
                'Vui lòng kiểm tra email của bạn và nhập mã vào bên dưới'
            );
            if (!otp) {
                return;
            }
            await verifyOtp({ email: data.email, otp });
            dispatch(setIsLoading(false));
            await notification.open({
                message: 'Đăng ký tài khoản thành công',
                icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
            });
            navigate('/login');
        } catch (error: any) {
            dispatch(setIsLoading(false));
        }
    };
    return (
        <div className={styles['wrapper']}>
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
