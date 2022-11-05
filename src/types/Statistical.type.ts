import { RoomType } from './RoomType';

export interface IStatistical {
    statusName: string;
    areRenting: RoomType[];
    emptyRooms: RoomType[];
}
export interface IMonthlyRevenue {
    _id: string;
    totalPaymentAmount: number;
    totalPaymentUnpaid: number;
    totalBill: number;
    totalBillPaid: number;
    totalBillUnpaid: number;
    month: string;
    year: string;
}
