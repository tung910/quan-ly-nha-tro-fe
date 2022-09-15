import instance from './instance';

export const getAllMotel = () => {
    return instance.get('/motels');
};
