import React from 'react';
import styles from './signin.module.scss';
import { useNavigate } from 'react-router-dom';
import { login } from '~/api/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '~/types/Auth';

type InputUser = {
    email: string;
    password: string;
};
const LoginPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit: SubmitHandler<any> = async (data: IUser) => {
        // try {
        await login(data);
        // } catch (error) {
        //     console.log(error);
        // }
        // alert('')
    };
    return (
        <div className={styles['center']}>
            <h1 className=''>Đăng nhập</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['txt_field']}>
                    <input
                        type='text'
                        {...register('email', {
                            required: true,
                        })}
                    />
                    {errors?.email?.type === 'required' && (
                        <span className={styles['my-error']}>
                            Email is required
                        </span>
                    )}
                    {/* <span></span> */}
                    <label htmlFor=''>Email đăng nhập</label>
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
                            Password is required
                        </span>
                    )}
                    <label htmlFor=''>Mật khẩu</label>
                </div>
                <div className={styles['pass']}>Forgot Password?</div>
                <button className={styles['btn_login']} type='submit'>
                    Đăng nhập
                </button>
                <div className={styles['signup_link']}>
                    Bạn chưa có tài khoản? <a href='#'>Đăng kí</a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
