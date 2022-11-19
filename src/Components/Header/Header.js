import React from 'react';
import './Header.css'
import { FaStream } from "react-icons/fa";
import ActiveRoute from '../Shared/ActiveRoute';
import { Link } from 'react-router-dom';
import logo from "../../Resources/Logos/logo.png"
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import userImage from '../../Resources/user.png'
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
    const location = useLocation()
    const [user, loading] = useAuthState(auth);
    const [admin] = useAdmin(user)



    const handleLogout = () => {
        signOut(auth)
        localStorage.removeItem('accessToken')
    }

    if (loading) {
        return <div class="flex items-center justify-center ml-2 h-[70px]">
            <div class="w-10 h-10 border-b-2 border-red-500 rounded-full animate-spin"></div>
        </div>
    }

    return (
        <div className='top-0 sticky z-50'>
            <nav>
                {
                    location.pathname.includes('dashboard') && <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden text-xl cursor-pointer ">
                        <AiOutlineMenu />
                    </label>
                }
                <div className='logo-container'> <Link to={"/"}>
                    <img className='w-20' src={logo} alt="" />
                </Link></div>

                <input type="checkbox" id='click' />
                <label htmlFor="click" className='menu-btn'> <AiOutlineMenu /> </label>
                <ul>
                    <li><span className='nav-link text-center custom-width hover:text-red-500'> <ActiveRoute to="/home"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>হোম</span></ActiveRoute></span></li>
                    <li><span className='nav-link'><ActiveRoute to="/donorRegistration"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>রেজিষ্ট্রেশন করুন</span></ActiveRoute></span></li>
                    <li><span className='nav-link'><ActiveRoute to="/contact"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>যোগাযোগ করুন</span></ActiveRoute></span></li>

                    <li><span className='nav-link'><ActiveRoute to="/aboutUs"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>আমাদের সম্পর্কে</span></ActiveRoute></span></li>

                    {
                        user && <>
                            {admin ?
                                <li className='lg:hidden'><span className='nav-link lg:hidden'><ActiveRoute to="/dashboard"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>ড্যাশবোর্ড</span></ActiveRoute></span></li>
                                :
                                <li className='lg:hidden'><span className='nav-link lg:hidden'><ActiveRoute to="/profile"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>প্রোফাইল</span></ActiveRoute></span></li>
                            }
                        </>
                    }

                    {user && <li onClick={handleLogout} className="lg:hidden"><span className='nav-link lg:bg-[#17203F]'><span className='lg:text-white cursor-pointer'>লগ আউট</span></span></li>
                    }
                    {!user &&
                        <li><span className='nav-link lg:bg-[#FE3C47]'><ActiveRoute to="/login"><span className='lg:text-white'>লগইন</span></ActiveRoute></span></li>
                    }
                    {user &&
                        <div className="dropdown dropdown-end hidden lg:block ml-3">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL ? user.photoURL : userImage} alt="" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">

                                {admin ?
                                    <li className='font-semibold'> <Link to={"/dashboard"}>Dashboard</Link> </li>
                                    :
                                    <li className='font-semibold'>
                                        <Link to="/profile" className="justify-between">
                                            Profile
                                            <span className="badge bg-green-500 border-0">New</span>
                                        </Link>
                                    </li>
                                }
                                <li className='font-semibold'> <Link to={"/"}>Leader Board</Link> </li>

                                <li onClick={handleLogout} className="font-semibold text-red-500"> <a>Logout</a> </li>
                            </ul>
                        </div>}
                </ul>
            </nav>
        </div>
    );
};

export default Header;