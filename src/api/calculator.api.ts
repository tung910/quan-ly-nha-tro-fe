import instance from './instance';
export const listCalculator = () => {
    return instance.get('/calculator-money/list');
};

export const CalculatorMoney = (data: any) => {
    return instance.post('/calculator-money/calculator', data);
};
