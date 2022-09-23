export type TypeCustomer = {
    id?: string;
    customerName: string;
    citizenIdentification: number;
    dateRange: string;
    phone: string;
    issuedBy: string;
    address: string;
    gender: number;
    email: string;
    dateOfBirth: string;
    birthPlace: string;
    licensePlates: string;
    motelRoomID: string;
    priceRoom: number;
    startDate: string;
    deposit: number;
    payEachTime: number;
    paymentPeriod: number;
};

export type TypeServiceCustomer = {
    key?: string;
    name: string;
    price: number;
    number: number;
};
