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
import { Card } from 'antd';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Revenue = () => {
    const [chartData, setChartData] = useState<any>({
        datasets: [],
    });

    useEffect(() => {
        setChartData({
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Doanh thu (VNĐ)',
                    data: [0, 200, 400, 600, 800, 1000, 1200, 1400],
                    backgroundColor: 'red',
                },
            ],
        });
    }, []);
    return (
        <div>
            <Card title='Doanh thu (VNĐ)' bordered={true}>
                <Bar data={chartData} />
            </Card>
        </div>
    );
};

export default Revenue;
