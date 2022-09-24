export interface IService {
    _id?: string;
    isActive?: boolean;
    serviceName: string;
    unitPrice?: number;
    serviceTypeId: number;
    serviceTypeName?: string;
    quantity?: number;
    note?: string;
}
