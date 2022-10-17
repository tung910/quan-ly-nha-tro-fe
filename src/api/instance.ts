/* eslint-disable camelcase */
import axios from 'axios';
import { STATUS_CODE } from '~/types/Api-Response.type';

const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
instance.interceptors.request.use(
    (config) => config,
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
        return Promise.reject(data);
    }
);
export default instance;
