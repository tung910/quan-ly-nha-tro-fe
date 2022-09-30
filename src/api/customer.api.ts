import instance from './instance';

export const listCustomerToRoom = () => {
    return instance.get('/room-rental-detail/list');
};

export const addCustomerToRoom = (data: any) => {
    return instance.post('/room-rental-detail/create', { data });
};

export const getDetailCustomerToRoom = (id: string) => {
    return instance.get(`/room-rental-detail/${id}`);
};
