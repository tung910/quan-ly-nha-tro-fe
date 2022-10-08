import instance from './instance';

const exportWordContract = (roomRental: string) => {
    return instance.get(`/export-word-contract/${roomRental}`);
};

export { exportWordContract };
