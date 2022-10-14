import instance from './instance';

export const createRoomDeposit = (data: any) => {
    return instance.post('/room-deposit/add-or-update', data);
};

export const listSearchRoomDeposit = (data: any) => {
    return instance.post('/room-deposit/list', data);
};

export const deleteRoomDeposit = (id: string) => {
    return instance.delete(`/room-deposit/delete/${id}`);
};

export const getlistSearchRoomDeposit = (id: string) => {
    return instance.get(`/room-deposit/detail/${id}`);
};

export const updateRoomDeposit = (data: any) => {
    return instance.post(`/room-deposit/add-or-update?id=${data._id}`, data);
};
