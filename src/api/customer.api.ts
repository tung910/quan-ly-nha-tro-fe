import instance from './instance';

export const listCustomerToRoom = () => {
    return instance.get('/room-rental-detail/list');
};

export const addCustomerToRoom = (data: any) => {
    return instance.post('/room-rental-detail/create', { data });
};
export const editCustomerToRoom = (data: any) => {
    return instance.put(`/room-rental-detail/edit/${data._id}`, { data });
};

export const getDetailCustomerToRoom = (id: string) => {
    return instance.get(`/room-rental-detail/${id}`);
};
export const changeRoom = (data: any, id: string) => {
    return instance.post(`/room-rental-detail/change-room/${id}`, data);
};
