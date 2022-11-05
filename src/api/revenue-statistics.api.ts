import instance from './instance';

export const revenueStatistics = (data: any) => {
    return instance.post(`/revenue-statistics/add-or-update`, { data });
};

export const getPaymentChecking = (data: any) => {
    return instance.post(`/revenue-statistics/payment-tracking`, { data });
};

export const getMonthlyRevenue = (data: { data: { year: string } }) => {
    return instance.post(`/revenue-statistics/monthly-revenue`, data);
};
