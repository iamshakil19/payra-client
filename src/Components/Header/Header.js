import React, { useState } from 'react';
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

const Header = () => {
    const location = useLocation()
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user)

    const handleLogout = () => {
        signOut(auth)
        localStorage.removeItem('accessToken')
    }

    return (
        <div className='top-0 sticky z-50'>
            <nav>
                {
                    location.pathname.includes('dashboard') && <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden text-xl cursor-pointer text-red-500">
                        <FaStream />
                    </label>
                }
                <div className='logo-container'> <Link to={"/"}>
                    <img className='w-20' src={logo} alt="" />
                </Link></div>

                <input type="checkbox" id='click' />
                <label htmlFor="click" className='menu-btn'> <FaStream /> </label>
                <ul>
                    <li><span className='nav-link text-center custom-width hover:text-red-500'> <ActiveRoute to="/home"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>হোম</span></ActiveRoute></span></li>
                    <li><span className='nav-link'><ActiveRoute to="/donorRegistration"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>রেজিষ্ট্রেশন করুন</span></ActiveRoute></span></li>
                    <li><span className='nav-link'><ActiveRoute to="/contact"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>যোগাযোগ করুন</span></ActiveRoute></span></li>

                    {admin && <li><span className='nav-link'><ActiveRoute to="/aboutUs"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>আমাদের সম্পর্কে</span></ActiveRoute></span></li>}



                    <li><span className='nav-link'><ActiveRoute to="/dashboard"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>ড্যাশবোর্ড</span></ActiveRoute></span></li>

                    <li><span className='nav-link'><ActiveRoute to="/profile"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>প্রোফাইল</span></ActiveRoute></span></li>


                    {user ?
                        <li onClick={handleLogout} className=""><span className='nav-link lg:bg-[#17203F]'><span className='lg:text-white cursor-pointer'>লগ আউট</span></span></li>
                        :
                        <li><span className='nav-link lg:bg-[#FE3C47]'><ActiveRoute to="/login"><span className='lg:text-white'>লগইন</span></ActiveRoute></span></li>
                    }

                </ul>
            </nav>
        </div>
    );
};

export default Header;