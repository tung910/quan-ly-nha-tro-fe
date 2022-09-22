import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
// eslint-disable-next-line no-duplicate-imports
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
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
