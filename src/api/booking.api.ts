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
