import { MotelType } from '~/types/MotelType';
import instance from './instance';

export const getAllMotel = () => {
    return instance.get('/motel/list');
};
export const getMotel = (id: string) => {
    return instance.get(`/motels/${id}`);
};
export const addMotel = (motel: MotelType) => {
    return instance.post('/motel/create', motel);
};
export const removeMotel = (id: string) => {
    return instance.delete(`/motel/delete/${id}`);
};
export const updateMotel = (motel: MotelType) => {
    const url = `/motels/${motel._id}`;
    return instance.put(url, motel);
};
