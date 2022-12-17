import { notification } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import { setIsLoading } from '~/feature/service/appSlice';
import { IUser } from '~/types/User.type';

import { signIn } from '../userSlice';
import styles from './signin.module.scss';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navidate = useNavigate();
    const onSubmit: SubmitHandler<any> = async (data: IUser) => {
        dispatch(setIsLoading(true));
        try {
            let url = '/';
            const a = await dispatch(signIn(data)).unwrap();
            if (a.user.role === 0) {
                url = '/user/motel-room';
            }
            await notification.success({
                message: 'Đăng nhập thành công',
            });
            dispatch(setIsLoading(false));
            return navidate(url);
        } catch (error: any) {
            dispatch(setIsLoading(false));
        }
    };
    return (
        <div className={styles['wrapper']}>
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
                        {/*  Bạn chưa có tài khoản?{' '}
                        <Link
                            to='/sign-up'
                            className={styles['signup_link-btn']}
                        >
                            Đăng kí
                        </Link> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
