import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header'
import { BiDonateBlood } from "react-icons/bi";
import { BsChatSquareQuote, BsFillPieChartFill } from "react-icons/bs";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';

const Dashboard = () => {

    const { data: allDonorRequest, isLoading, refetch } = useQuery('donorRequest', () => fetch('http://localhost:5000/donor-request')
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }


    return (
        <div>
            <Header />

            <div>
                <div class="drawer drawer-mobile">
                    <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content bg-[#F5F7FF] px-2 pt-3 lg:px-5 lg:pt-4">
                        {/* <!-- Page content here --> */}

                        <Outlet />
                    </div>
                    <div class="drawer-side">
                        <label for="dashboard-sidebar" class="drawer-overlay"></label>
                        <ul class="menu p-4 overflow-y-auto w-60 bg-gradient-to-r from-[#538FFB] to-[#5c54fa] text-white rounded-tr-md">
                            {/* <!-- Sidebar content here --> */}
                            <p className='font-bold text-center text-2xl mb-5 poppins-font'>Dashboard</p>

                            <li ><Link to={"/dashboard"}> <span className='flex items-center poppins-font'> <BsFillPieChartFill /> <span className='ml-3 text-[16px]'>Analytics</span> </span> </Link></li>
                            <li><Link to={"/dashboard/donor-list"}><span className='flex items-center poppins-font'> <span className='text-xl'><BiDonateBlood /></span> <span className='ml-2 text-[16px]'>Donors List</span> </span></Link></li>
                            <li className='relative'>
                                <Link to={"/dashboard/donor-request"}><span className='flex items-center poppins-font'> <BsChatSquareQuote /> <span className='ml-3 text-[16px]'>Donor Request</span> </span></Link>
                                {
                                    allDonorRequest?.length > 0 &&
                                    <span class="indicator-item badge bg-orange-500 poppins-font w-2 border absolute top-0 right-0 font-bold">{allDonorRequest?.length}</span>
                                }
                            </li>
                            <li><Link to={"/dashboard/blood-request"}><span className='flex items-center poppins-font'> <RiQuestionAnswerLine /> <span className='ml-3 text-[16px]'>Blood Request</span> </span></Link></li>
                            <li><Link to={"/dashboard/user-list"}><span className='flex items-center poppins-font'> <FaUsers /> <span className='ml-3 text-[16px]'>All User</span> </span></Link></li>
                            <li><Link to={"/dashboard/admin-list"}><span className='flex items-center poppins-font'> <span className='text-lg'><MdAdminPanelSettings /></span> <span className='ml-2 text-[16px]'>All Admin</span> </span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;