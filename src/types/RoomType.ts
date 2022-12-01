export interface RoomType {
    _id: string;
    roomName: string;
    area: number;
    unitPrice: number;
    maxPerson: number;
    motelID: string;
    description: string;
    isRent: boolean;
    isDebit: boolean;
    customerName: string;
    roomRentID: string;
    images?: any;
    width?: string | number;
    height?: string | number;
}
