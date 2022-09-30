import instance from './instance';

export const login = (user: any) => {
    // console.log(user);
    return instance.post('/signin', user);
};
