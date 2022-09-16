import { type } from 'os';
import React from 'react';
import styles from './signin.module.scss';

const SignIn = () => {
    return (
        <div className={styles['center']}>
            <h1 className=''>Đăng nhập</h1>
            <form action='' method='post'>
                <div className={styles['txt_field']}>
                    <input type='text' required />
                    <span></span>
                    <label htmlFor=''>Tên đăng nhập</label>
                </div>
                <div className={styles['txt_field']}>
                    <input type='password' required />
                    <span></span>

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

export default SignIn;
