import { RoomType } from '~/types/RoomType';
import instance from './instance';
export const getRooms = (id: string) => {
    return instance.get(`/motel-room/list?roomId=${id}`);
};
export const addRoom = (room: RoomType) => {
    return instance.post(`/motel-room/create`, { data: room });
};
export const removeRoom = (id: string) => {
    return instance.delete(`/motel-room/delete/${id}`);
};
