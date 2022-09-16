import instance from './instance';

export const addCustomer = (customer: any) => {
    return instance.post('/customer', customer);
};
