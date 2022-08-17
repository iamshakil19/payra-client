import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <div class="drawer drawer-mobile">
                <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content">

                    {/* <!-- Page content here --> */}

                    <h2 className='text-3xl font-bold text-red-500'>Dashboard</h2>
                    <Outlet></Outlet>

                </div>
                <div class="drawer-side">
                    <label for="dashboard-sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">

                        {/* <!-- Sidebar content here --> */}

                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/dashboard/donor-list">Donor List</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;