import instance from './instance';

export const revenueStatistics = (data: any) => {
    return instance.post(`/revenue-statistics/add-or-update`, { data });
};

export const getPaymentChecking = (data: any) => {
    return instance.post(`/revenue-statistics/payment-tracking`, { data });
};
