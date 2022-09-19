import instance from './instance';

const getAllService = () => {
    return instance.get('/service/list');
};

export { getAllService };
