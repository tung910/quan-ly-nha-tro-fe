import instance from './instance';
export const addCustomerToRoom = (data: any) => {
    return instance.post('/room-rental-detail/create', { data });
};
