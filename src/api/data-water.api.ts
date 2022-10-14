import instance from './instance';

export const listDataWater = () => {
    return instance.get('/data-water/list');
};

export const editDataWater = (data: any) => {
    return instance.put(`/data-water/edit/${data.data._id}`, data);
};
export const getDataWaterByMotelRoomId = (id: string) => {
    return instance.get(`/data-water/detail/${id}`);
};
