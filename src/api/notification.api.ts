import instance from './instance';

interface AddOrUpdate {
    userId?: string;
    detail: { access: boolean } & any;
    isUpdate?: boolean;
    notificationId?: string;
}

const addOrUpdateNotification = (data: AddOrUpdate) => {
    return instance.post('/notifications/add-or-update', { data });
};

const getNotifications = (query: string) => {
    return instance.get('/notifications/list?' + query);
};

export { addOrUpdateNotification, getNotifications };
