import instance from './instance';
export const listCalculator = () => {
    return instance.get('/calculator-money/list');
};
export const listCalculatorByMonth = (month: any) => {
    return instance.post('/calculator-money/list', { data: month });
};

export const CalculatorMoney = (data: any) => {
    return instance.post('/calculator-money/calculator', data);
};
export const deleteCalculator = (id: string) => {
    return instance.delete(`/calculator-money/delete/${id}`);
};
