import { IUser } from '~/types/User.type';
import instance from './instance';

const loginApi = (user: IUser) => {
    return instance.post('/signin', user);
};

const signUp = (user: IUser) => {
    return instance.post('/signup', user);
};

export { loginApi, signUp };
