import { useEffect, useState } from 'react';
import { Card } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const RoomStatus = () => {
    const [chartData, setChartData] = useState<any>({
        datasets: [],
    });
    useEffect(() => {
        setChartData({
            labels: ['Phòng trống', 'Đang thuê'],
            datasets: [
                {
                    data: [20, 80],
                    backgroundColor: ['red', 'green'],
                },
            ],
        });
    }, []);
    return (
        <div>
            <Card title='Trạng thái phòng' bordered={true}>
                <div style={{ width: 270, marginLeft: 130 }}>
                    <Pie data={chartData}></Pie>
                </div>
            </Card>
        </div>
    );
};

export default RoomStatus;
