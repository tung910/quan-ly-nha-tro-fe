import instance from './instance';

export const listDataWater = () => {
    return instance.get('/data-water/list');
};

export const editDataWater = (data: any) => {
    return instance.put(`/data-water/edit/${data.data._id}`, data);
};
