import { MotelType } from '~/types/MotelType';
import instance from './instance';

export const getAllMotel = () => {
    return instance.get('/motels');
};
export const getMotel = (id: string) => {
    return instance.get(`/motels/${id}`);
};
export const addMotel = (motel: MotelType) => {
    return instance.post('/motels', motel);
};
export const removeMotel = (id: string) => {
    return instance.delete(`/motels/${id}`);
};
export const updateMotel = (motel: MotelType) => {
    const url = `/motels/${motel.id}`;
    return instance.put(url, motel);
};
