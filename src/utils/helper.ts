import { useLocation } from 'react-router-dom';

const generatePriceToVND = (
    price?: number,
    option?: Intl.NumberFormatOptions
) => {
    if (!option) {
        return price?.toLocaleString('vi');
    }
    if (!price) {
        return '';
    }
    return price?.toLocaleString('vi', {
        currency: 'VND',
        style: 'currency',
    });
};

const useGetParam = (param: string) => {
    const { search } = useLocation();
    const result = new URLSearchParams(search).get(param) || '';
    return [result];
};

export { generatePriceToVND, useGetParam };
