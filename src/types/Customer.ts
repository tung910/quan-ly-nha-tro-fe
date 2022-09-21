export type TypeCustomer = {
    id?: string;
    name: string;
    cmnd: string;
    dateRange: string;
    phoneNumber: string;
    issuedBy: string;
    address: string;
    gender: number;
    email: string;
    dateOfBirth: string;
    birthPlace: string;
    carNumber: string;
    numberRoom: number;
    priceRoom: number;
    startDay: string;
    deposit: number;
    paymentPeriod: number;
    payment: number;
};

export type TypeServiceCustomer = {
    key?: string;
    name: string;
    price: number;
    number: number;
};
