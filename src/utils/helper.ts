const generatePriceToVND = (price: number) => {
    return price.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND',
    });
};

export { generatePriceToVND };
