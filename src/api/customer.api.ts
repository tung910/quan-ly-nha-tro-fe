import instance from './instance';
export const addCustomerToRoom = (data: any) => {
    return instance.post('/room-rental-detail/create', { data });
};
export const getCustomerToRoom = (id: string) => {
    return instance.get(`/room-rental-detail/${id}`);
};
