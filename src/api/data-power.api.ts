import instance from './instance';

export const listDataPower = (month: any) => {
    return instance.post('/data-power/list', { data: month });
};

export const editDataPower = (data: any) => {
    return instance.put(`/data-power/edit/${data.data._id}`, data);
};
export const getDataPowerByMotelRoomId = (data: any) => {
    return instance.post(`/data-power/detail`, { data });
};
