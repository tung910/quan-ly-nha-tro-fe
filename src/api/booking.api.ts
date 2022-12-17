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

export const getRoomDeposit = (roomDepositId: string, roomId = '') => {
    let url = '';
    if (roomDepositId) {
        url = `?roomDepositId=${roomDepositId}`;
    }
    if (roomId) {
        url = `?roomId=${roomId}`;
    }
    return instance.get(`/room-deposit/detail${url}`);
};

export const updateRoomDeposit = (data: any) => {
    return instance.post(`/room-deposit/add-or-update?id=${data._id}`, data);
};

export const updateStatusRoomDeposit = (id: string, data: any) => {
    return instance.patch(`/room-deposit/add-or-update/${id}`, data);
};
