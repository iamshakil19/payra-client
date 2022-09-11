import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);







const LineChart = () => {
    const navigate = useNavigate()
    const [donorData, setDonorData] = useState([])
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/verified-donor', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                setChartData({
                    labels: data?.map((donor) => donor._id),
                    datasets: [
                        {
                            label: "Revenue",
                            data: data?.map((donor) => donor.number1),
                            fill: true,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        }
                    ]
                })
                setLoading(false)
                console.log(chartData);
            })

        
    }, [])

    if (loading) {
        return <Loading />
    }


    return (
        <div className='w-80'>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {position: "top"},
                        title: {display: true, text: "Revenue"}
                    }
                }}
            />
        </div>
    );
};

export default LineChart;