import instance from './instance';

export const listCalculator = (month?: any, roomId?: string) => {
    let url = '';
    let options = {};
    if (roomId) {
        url = '?roomId=' + roomId;
    }
    if (month) {
        options = {
            data: month,
        };
    }
    return instance.post('/calculator-money/list' + url, options);
};
export const getCalculator = (id: string) => {
    return instance.get(`/calculator-money/detail/${id}`);
};
export const calculatorMoney = (data: any) => {
    return instance.post('/calculator-money/calculator', data);
};
export const CalculatorMoneyAll = (data: any) => {
    return instance.post('/calculator-money/calculator-all', { data });
};
export const deleteCalculator = (id: string) => {
    return instance.delete(`/calculator-money/delete/${id}`);
};
export const sendEmail = (id: string) => {
    return instance.get('/calculator-money/sendMailBill/' + id);
};
export const paymentMoney = (data: any, id: string) => {
    return instance.put(`/calculator-money/payment/${id}`, { data });
};
