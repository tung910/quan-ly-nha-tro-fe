import instance from './instance';

export const listDataPower = () => {
    return instance.get('/data-power/list');
};

export const editDataPower = (data: any) => {
    return instance.put(`/data-power/edit/${data.data._id}`, data);
};
