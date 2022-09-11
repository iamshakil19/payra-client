import React from 'react';
import DoughnutChart from './ChartGroup/DoughnutChart';
import LineChart from './ChartGroup/LineChart';

const Analytics = () => {
    return (
        <div>
            <div>
                <DoughnutChart/>
                <LineChart/>
            </div>
            
        </div>
    );
};

export default Analytics;