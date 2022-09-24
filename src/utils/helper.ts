import { useLocation } from 'react-router-dom';

const generatePriceToVND = (price: number) => {
    return price.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND',
    });
};

const useGetParam = (param: string) => {
    const { search } = useLocation();
    const result = new URLSearchParams(search).get(param) || '';
    return [result];
};

export { generatePriceToVND, useGetParam };
