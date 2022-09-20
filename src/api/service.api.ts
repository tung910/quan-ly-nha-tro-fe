import { IService } from '~/types/Service.type';
import instance from './instance';

const getAllService = () => {
    return instance.get('/service/list');
};
const createServiceAPI = (data: IService) => {
    return instance.post('/service/create', { data });
};

export { getAllService, createServiceAPI };
