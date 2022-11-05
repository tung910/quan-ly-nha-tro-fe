import { Card } from 'antd';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { memo } from 'react';
import { Pie } from 'react-chartjs-2';

import { StateRoomStatus } from '.';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
interface Props {
    roomStatus: StateRoomStatus;
}
const RoomStatus = ({ roomStatus }: Props) => {
    const { areRenting, emptyRooms } = roomStatus;
    const pie = {
        labels: [areRenting?.statusName, emptyRooms?.statusName],
        datasets: [
            {
                data: [
                    areRenting?.areRenting.length,
                    emptyRooms?.emptyRooms.length,
                ],
                backgroundColor: ['green', 'red'],
            },
        ],
    };

    return (
        <div>
            <Card title='Trạng thái phòng' bordered={true}>
                <Pie data={pie}></Pie>
            </Card>
        </div>
    );
};

export default memo(RoomStatus);
