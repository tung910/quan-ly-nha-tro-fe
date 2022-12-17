export interface IBooking {
    _id?: string;
    bookingDate: string;
    motelId: string;
    motelRoomId: string;
    fullName: string;
    telephone: number;
    bookingAmount: number;
    dateOfArrival: string;
    hasCancel?: boolean;
    hasCheckIn?: boolean;
    cancelDate?: Date;
    checkInDate?: Date;
    note?: string;
}
