import { IUser } from '../types/User.type';
export const authenticated = (user: IUser, next: () => void) => {
    localStorage.setItem('user', JSON.stringify(user));
    next();
};
export const isAuthenticate = () => {
    // eslint-disable-next-line curly
    if (!localStorage.getItem('user')) { return; }
    return JSON.parse(localStorage.getItem('user') as string);

};
