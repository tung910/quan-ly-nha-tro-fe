import React from 'react';
import { IService } from '~/types/Service.type';
import instance from './instance';

const getAllService = () => {
    return instance.get('/service/list');
};
const createServiceAPI = (data: IService) => {
    return instance.post('/service/create', { data });
};
const updateServiceAPI = (data: IService, id?: string) => {
    return instance.put('/service/edit/' + id, { data });
};
const getServiceAPI = (id: React.Key) => {
    return instance.get('/service/detail/' + id);
};
const deleteServiceAPI = (data: { data: React.Key[] }) => {
    return instance.delete('/service/delete', { data });
};

export {
    getAllService,
    createServiceAPI,
    deleteServiceAPI,
    getServiceAPI,
    updateServiceAPI,
};
