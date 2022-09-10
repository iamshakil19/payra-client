import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    plugins: {
        legend: {
            position: "bottom"
        }
    }
}

const oPositive = 100;


export const data = {
    labels: ['O +', 'O -', 'A +', 'A -', 'B+', 'b -', 'AB +', 'AB -'],
    datasets: [
        {
            label: 'Blood Group',
            data: [`${oPositive}`, 80, 95, 55, 112, 15, 39, 135],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
const DoughnutChart = () => {
    return (
        <div className='w-80'>
            <Doughnut data={data} options={options}
            />
        </div>

    )

};

export default DoughnutChart;