import instance from './instance';

export const listDataWater = (month: any) => {
    return instance.post('/data-water/list', { data: month });
};

export const editDataWater = (data: any) => {
    return instance.put(`/data-water/edit/${data.data._id}`, data);
};
export const getDataWaterByMotelRoomId = (data: any) => {
    return instance.post(`/data-water/detail/`, { data });
};
