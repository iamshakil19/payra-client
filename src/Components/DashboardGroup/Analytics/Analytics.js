import React from 'react';
import DoughnutChart from './ChartGroup/DoughnutChart';
import RadarChart from './ChartGroup/RadarChart';


const Analytics = () => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <DoughnutChart />
                <RadarChart />
            </div>

        </div>
    );
};

export default Analytics;