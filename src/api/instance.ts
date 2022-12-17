/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable camelcase */
import { notification } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { store } from '~/app/store';
import { STATUS_CODE } from '~/types/Api-Response.type';

const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config: AxiosRequestConfig<any> | any) => {
        const { user } = store.getState();
        config.headers['Authorization'] = `Bearer ${user?.token || ''}`;
        config.headers['AuthId'] = String(user?.user?._id || '');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        if ((data.status_code = STATUS_CODE.OK)) {
            return data.result;
        }
    },
    (error) => {
        const { data } = error.response;
        notification.error({ message: data?.messages || 'Some error' });
        return Promise.reject(data);
    }
);
export default instance;
