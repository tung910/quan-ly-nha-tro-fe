/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './signUp.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '~/types/User.type';
import { signUp } from '~/api/auth.api';

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit: SubmitHandler<any> = async (data: IUser) => {
        await signUp(data);
        notification.open({
            message: 'Đăng ký tài khoản thành công',
            icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        });
    };
    return (
        <div className={styles['center']}>
            <h1 className=''>Đăng ký</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className={styles['signup_link']}></div>
            </form>
        </div>
    );
};

export default SignUpPage;
