import React from 'react';
import styles from './signin.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '~/types/User.type';
import { Link } from 'react-router-dom';
import { signIn } from '../userSlice';
import { useAppDispatch } from '~/app/hooks';
import { loginApi } from '~/api/auth.api';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit: SubmitHandler<any> = async (data: IUser) => {
        const res = await loginApi(data);
        console.log(res);
    };
    return (
        <div className={styles['center']}>
            <h1 className=''>Đăng nhập</h1>
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
                <div className={styles['pass']}>Forgot Password?</div>
                <button className={styles['btn_login']} type='submit'>
                    Đăng nhập
                </button>
                <div className={styles['signup_link']}>
                    Bạn chưa có tài khoản?{' '}
                    <Link to='/sign-up' className={styles['signup_link-btn']}>
                        Đăng kí
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
