import { MotelType } from '~/types/Model';
import instance from './instance';

export const getAllMotel = () => {
    return instance.get('/motels');
};
export const addMotel = (motel: MotelType) => {
    return instance.post('/motels', motel);
};
