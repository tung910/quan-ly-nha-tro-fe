import instance from './instance';
export const getUserById = (id: string) => {
    return instance.get(`/users/${id}`);
};
