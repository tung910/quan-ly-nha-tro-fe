import { useEffect, useState } from 'react';
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
import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
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
