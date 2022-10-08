export interface IUser {
    id?: string;
    name?: string;
    phone: string;
    email: string;
    password?: string;
    citizenIdentificationNumber?: number;
    address?: string;
    dateOfBirth?: string;
    dateRange?: string;
    issuedBy?: string;
}
