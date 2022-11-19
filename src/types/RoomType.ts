export interface RoomType {
    _id: string;
    roomName: string;
    width: number;
    height: number;
    unitPrice: number;
    maxPerson: number;
    motelID: string;
    description: string;
    isRent: boolean;
    isDebit: boolean;
    customerName: string;
    roomRentID: string;
    images?: any;
}
