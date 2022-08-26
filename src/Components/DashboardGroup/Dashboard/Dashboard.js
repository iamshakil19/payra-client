import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header'
import { BiDonateBlood } from "react-icons/bi";
import { BsChatSquareQuote, BsFillPieChartFill } from "react-icons/bs";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaSearch, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import avatarImage from '../../../Resources/avatarImage.jpg'
import './Dashboard.css'

const Dashboard = () => {

    const [user, loading, error] = useAuthState(auth);

    const { data: allDonorRequest, isLoading, refetch } = useQuery('donorRequest', () => fetch('http://localhost:5000/donor-request')
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }


    return (
        <div>
            <Header />

            <div>
                <div className="drawer drawer-mobile">
                    <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content bg-[#F5F7FF] px-2 pt-3 lg:px-5 lg:pt-4">
                        {/* <!-- Page content here --> */}
                        <div className='lg:flex lg:justify-between mb-2'>
                            <div className='hidden lg:block'>text</div>
                            <div className=''>
                                <form action="" className='search-bar'>
                                    <input autoComplete='off' type="text" placeholder='Search by donor name' name='searchText' />
                                    <button type='submit'><span className='search-icon'> <FaSearch/> </span></button>
                                </form>
                            </div>
                            <div className='lg:flex items-center hidden '>
                                <div class="avatar online">
                                    <div class="w-10 rounded-full shadow-gray-500 shadow-lg cursor-pointer">
                                        <img src={user ? user?.photoURL : avatarImage} alt="" />
                                    </div>
                                </div>
                                <div className='ml-3'>
                                    <p className='poppins-font font-bold text-[#17203F]'>{user?.displayName}</p>
                                    <p className='poppins-font text-sm font-extrabold opacity-80 text-[#17203F]'>Admin</p>
                                </div>
                            </div>

                        </div>
                        <Outlet />
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 overflow-y-auto w-60 bg-gradient-to-r from-[#0d142e] to-[#17203F] text-white rounded-tr-md">
                            {/* <!-- Sidebar content here --> */}
                            <p className='font-bold text-center text-2xl mb-5 poppins-font'>Dashboard</p>

                            <li ><Link to={"/dashboard"}> <span className='flex items-center poppins-font'> <BsFillPieChartFill /> <span className='ml-3 text-[16px]'>Analytics</span> </span> </Link></li>
                            <li><Link to={"/dashboard/donor-list"}><span className='flex items-center poppins-font'> <span className='text-xl'><BiDonateBlood /></span> <span className='ml-2 text-[16px]'>Donors List</span> </span></Link></li>
                            <li className='relative'>
                                <Link to={"/dashboard/donor-request"}><span className='flex items-center poppins-font'> <BsChatSquareQuote /> <span className='ml-3 text-[16px]'>Donor Request</span> </span></Link>
                                {
                                    allDonorRequest?.length > 0 &&
                                    <span className="indicator-item badge bg-orange-500 poppins-font w-2 border absolute top-0 right-0 font-bold">{allDonorRequest?.length}</span>
                                }
                            </li>
                            <li><Link to={"/dashboard/blood-request"}><span className='flex items-center poppins-font'> <RiQuestionAnswerLine /> <span className='ml-3 text-[16px]'>Blood Request</span> </span></Link></li>
                            <li><Link to={"/dashboard/user-list"}><span className='flex items-center poppins-font'> <FaUsers /> <span className='ml-3 text-[16px]'>All User</span> </span></Link></li>
                            <li><Link to={"/dashboard/admin-list"}><span className='flex items-center poppins-font'> <span className='text-lg'><MdAdminPanelSettings /></span> <span className='ml-2 text-[16px]'>All Admin</span> </span></Link></li>

                            <div className='flex items-center mt-12 px-4 lg:hidden'>
                                <div class="avatar online">
                                    <div class="w-10 rounded-full cursor-pointer">
                                        <img src={user ? user?.photoURL : avatarImage} alt="" />
                                    </div>
                                </div>
                                <div className='ml-3'>
                                    <p className='poppins-font font-bold text-white text-sm'>{user?.displayName}</p>
                                    <p className='poppins-font text-sm font-extrabold opacity-70 text-white'>Admin</p>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;