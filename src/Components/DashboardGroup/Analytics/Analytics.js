import React from 'react';
import DoughnutChart from './ChartGroup/DoughnutChart';
import LineChart from './ChartGroup/LineChart';

const Analytics = () => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <DoughnutChart/>
                <LineChart/>
            </div>
            
        </div>
    );
};

export default Analytics;