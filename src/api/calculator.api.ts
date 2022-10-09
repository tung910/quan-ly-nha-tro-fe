import instance from './instance';
export const listCalculator = () => {
    return instance.get('/calculator-money/list');
};

export const Calculator = () => {
    return instance.put('/calculator-money/calculator');
};
