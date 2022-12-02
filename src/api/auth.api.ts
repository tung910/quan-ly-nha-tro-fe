import { IUser } from '~/types/User.type';

import instance from './instance';

const loginApi = (user: IUser) => {
    return instance.post('/signin', user);
};

const logOutApi = () => {
    return instance.delete('/logout');
};

const signUp = (user: IUser) => {
    return instance.post('/signup', user);
};
const verifyOtp = (user: { email: string; otp: string }) => {
    return instance.post('/verify-otp', user);
};
const getAllAccount = () => {
    return instance.get('/users');
};
const changePassword = (id: string, password: { password: string }) => {
    return instance.put(`/users/${id}`, password);
};
const deleteAccount = (id: string) => {
    return instance.delete(`/users/delete/${id}`);
};
const updateProfile = (userId: string, data: any) => {
    return instance.put(`/update-info/${userId}`, data);
};

export {
    loginApi,
    signUp,
    verifyOtp,
    getAllAccount,
    changePassword,
    deleteAccount,
    logOutApi,
    updateProfile,
};
