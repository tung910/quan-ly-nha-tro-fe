import { RoomType } from './RoomType';

export interface IStatistical {
    statusName: string;
    areRenting: RoomType[];
    emptyRooms: RoomType[];
}
