import instance from './instance';
import { TypeCustomer } from '../types/Customer';
export const addCustomer = (data: any) => {
    return instance.post('/customer', {
        data,
    });
};

export const addCustomerToRoom = (data: any) => {
    return instance.post('/room-rental-detail/create', { data });
};
export const getCustomerToRoom = (id: string) => {
    return instance.get(`/room-rental-detail/${id}`);
};
