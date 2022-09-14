import React from 'react';
import AdminActivity from './Activity/AdminActivity';
import RecentBloodDonation from './Activity/RecentBloodDonation';
import RecentDonor from './Activity/RecentDonor';
import DoughnutChart from './ChartGroup/DoughnutChart';
import RadarChart from './ChartGroup/RadarChart';


const Analytics = () => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
                <DoughnutChart />
                <RadarChart />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-5'>
                <RecentDonor />
                <RecentBloodDonation />
                <AdminActivity />
            </div>
        </div>
    );
};

export default Analytics;