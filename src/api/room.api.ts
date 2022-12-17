import { RoomType } from '~/types/RoomType';

import instance from './instance';

export const getRooms = (id: string) => {
    return instance.get(`/motel-room/list?roomId=${id}`);
};
export const getListRooms = (query?: string) => {
    let url = '';
    if (query) {
        url = '?isRent=' + query;
    }
    return instance.get(`/motel-room/list` + url);
};
export const addRoom = (room: RoomType) => {
    return instance.post(`/motel-room/create`, { data: room });
};
export const removeRoom = (id: string) => {
    return instance.delete(`/motel-room/delete/${id}`);
};
export const getRoom = (id: string) => {
    return instance.get(`/motel-room/detail/${id}`);
};
export const editRoom = (room: RoomType) => {
    return instance.put(`/motel-room/edit/${room._id}`, { data: room });
};
export const getStatisticalRoomStatus = () => {
    return instance.get('/motel-room/statistical/room-status');
};
export const payHostel = (data: any) => {
    return instance.put(`/motel-room/pay-hostel`, { data: data });
};
