import instance from './instance';
export const getRooms = (id: string) => {
    return instance.get(`/motels/${id}?_embed=rooms`);
};
