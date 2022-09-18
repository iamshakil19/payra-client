import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Header/Header'
import { BiDonateBlood } from "react-icons/bi";
import { BsChatSquareQuote, BsFillPieChartFill } from "react-icons/bs";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaSearch, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import avatarImage from '../../../Resources/avatarImage.jpg'
import { MdPermContactCalendar } from "react-icons/md";
import './Dashboard.css'
import PageTitle from '../../Shared/PageTitle';
import { signOut } from 'firebase/auth';
import useAdmin from '../../Hooks/useAdmin';


const Dashboard = () => {
    const navigate = useNavigate("")
    let location = useLocation();
    const [user, loading, error] = useAuthState(auth);

    const [admin, adminLoading, adminRole] = useAdmin(user)


    const { data: allDonorRequest, donorLoading } = useQuery('donorRequest', () => fetch('http://localhost:5000/donor-request', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth)
                localStorage.removeItem('accessToken')
                navigate('/')
            }
            return res.json()
        }))

    const { data: incompleteBloodRequestList, bloodLoading } = useQuery('incompleteBloodList', () => fetch('http://localhost:5000/incomplete-blood-request', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth)
                localStorage.removeItem('accessToken')
                navigate('/')

            }
            return res.json()
        }))

    if (donorLoading || bloodLoading || adminLoading || loading) {
        return <Loading />
    }

    return (
        <div>
            <Header />
            <PageTitle title={"Dashboard"}></PageTitle>
            <div className=''>
                <div className="drawer drawer-mobile custom-height">
                    <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content bg-[#F5F7FF] px-2 pt-3 lg:px-5 lg:pt-4">
                        {/* <!-- Page content here --> */}
                        <div className='lg:flex lg:justify-between mb-2'>

                            <div className='lg:flex items-center hidden '>
                                <div class="avatar online">
                                    <div class="w-11 rounded-full shadow-gray-500 shadow-lg cursor-pointer border-slate-300 border">
                                        <img src={user?.photoURL ? user.photoURL : avatarImage} alt="" />
                                    </div>
                                </div>
                                <div className='ml-3'>
                                    <p className='poppins-font font-bold text-[#17203F]'>{user?.displayName}</p>
                                    <p className='poppins-font text-sm font-extrabold opacity-80 text-[#17203F] capitalize'>{adminRole === "superAdmin" ? "Super Admin" : adminRole}</p>
                                </div>
                            </div>
                            {location.pathname.includes('donor-list') && <div className=''>
                                <form action="" className='search-bar'>
                                    <input autoComplete='off' type="text" placeholder='Search by name' name='donorSearchText' />
                                    <button type='submit'><span className='search-icon'> <FaSearch /> </span></button>
                                </form>
                            </div>}
                            {location.pathname.includes('user-list') && <div className=''>
                                <form action="" className='search-bar'>
                                    <input autoComplete='off' type="text" placeholder='Search by email' name='userSearchText' />
                                    <button type='submit'><span className='search-icon'> <FaSearch /> </span></button>
                                </form>
                            </div>}

                        </div>

                        <Outlet />

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 overflow-y-auto w-60 bg-gradient-to-r from-[#0d142e] to-[#17203F] text-white rounded-tr-md">
                            {/* <!-- Sidebar content here --> */}
                            <p className='font-bold text-center text-2xl mb-5 poppins-font'>Dashboard</p>

                            <li ><Link to={"/dashboard"}> <span className='flex items-center poppins-font'> <BsFillPieChartFill /> <span className='ml-3 text-[16px]'>Analytics</span> </span> </Link></li>
                            <li><Link to={"/dashboard/donor-list"}> <span className='flex items-center poppins-font'> <span className='text-xl'><BiDonateBlood /></span> <span className='ml-2 text-[16px]'>Donors List</span> </span></Link></li>

                            <li className='relative'>
                                <Link to={"/dashboard/donor-request"}><span className='flex items-center poppins-font'> <BsChatSquareQuote /> <span className='ml-3 text-[16px]'>Donor Request</span> </span></Link>
                                {
                                    allDonorRequest?.length > 0 &&
                                    <span className="indicator-item badge bg-orange-500 poppins-font w-2 border absolute top-0 right-0 font-bold">{allDonorRequest?.length}</span>
                                }
                            </li>
                            <li className='relative'><Link to={"/dashboard/blood-request"}><span className='flex items-center poppins-font'> <RiQuestionAnswerLine /> <span className='ml-3 text-[16px]'>Blood Request</span> </span></Link>
                                {
                                    incompleteBloodRequestList?.length > 0 &&
                                    <span className="indicator-item badge bg-orange-500 poppins-font w-2 border absolute top-0 right-0 font-bold">{incompleteBloodRequestList?.length}</span>
                                }
                            </li>
                            <li><Link to={"/dashboard/add-contact"}><span className='flex items-center poppins-font'> <MdPermContactCalendar /> <span className='ml-3 text-[16px]'>Add Contact</span> </span></Link></li>
                            <li><Link to={"/dashboard/user-list"}><span className='flex items-center poppins-font'> <FaUsers /> <span className='ml-3 text-[16px]'>All User</span> </span></Link></li>
                            <li><Link to={"/dashboard/admin-list"}><span className='flex items-center poppins-font'> <span className='text-lg'><MdAdminPanelSettings /></span> <span className='ml-2 text-[16px]'>All Admin</span> </span></Link></li>

                            <div className='flex items-center mt-12 px-4 lg:hidden'>
                                <div class="avatar online">
                                    <div class="w-10 rounded-full cursor-pointer">
                                        <img src={user?.photoURL ? user.photoURL : avatarImage} alt="" />
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