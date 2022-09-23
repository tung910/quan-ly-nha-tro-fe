import instance from './instance';
import { TypeCustomer } from '../types/Customer';
export const addCustomer = (data: any) => {
    return instance.post('/customer', {
        data,
    });
};
export const getService = () => {
    return instance.get('/service');
};
