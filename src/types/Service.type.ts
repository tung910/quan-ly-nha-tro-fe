export interface IService {
    _id?: string;
    isActive: boolean | null;
    serviceName: string;
    unitPrice: number | null;
    serviceTypeId: number;
    serviceTypeName: string;
}
