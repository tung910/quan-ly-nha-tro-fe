import instance from './instance';
import { TypeCustomer } from '../types/Customer';
export const addCustomer = (
    customer: TypeCustomer,
    service: any,
    member: any,
    contract: any
) => {
    return instance.post('/customer', [
        {
            CustomerInfo: customer,
            Service: service,
            Member: member,
            Contract: contract,
        },
    ]);
};
