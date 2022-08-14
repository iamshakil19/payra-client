import React, { useState } from 'react';
import './Header.css'
import { FaStream } from "react-icons/fa";
import ActiveRoute from '../Shared/ActiveRoute';
import { Link } from 'react-router-dom';
import logo from "../../Resources/Logos/logo.png"

const Header = () => {

    return (
        <div className='top-0 sticky z-50'>
            <nav>
                <div className='logo-container'> <Link to={"/"}>
                    <img className='w-20' src={logo} alt="" />
                </Link></div>
                <input type="checkbox" id='click' />
                <label for="click" className='menu-btn'> <FaStream /> </label>
                <ul>
                    <li><span className='nav-link text-center custom-width hover:text-red-500'> <ActiveRoute to="/home"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>হোম</span></ActiveRoute></span></li>
                    <li><span className='nav-link'><ActiveRoute to="/donorRegistration"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>রেজিষ্ট্রেশন করুন</span></ActiveRoute></span></li>
                    <li><span className='nav-link'><ActiveRoute to="/contact"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>যোগাযোগ করুন</span></ActiveRoute></span></li>
                    <li><span className='nav-link'><ActiveRoute to="/aboutUs"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>আমাদের সম্পর্কে</span></ActiveRoute></span></li>
                    <li><span className='nav-link'><ActiveRoute to="/dashboard"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>ড্যাশবোর্ড</span></ActiveRoute></span></li>
                    <li><span className='nav-link'><ActiveRoute to="/login"><span className='hover:text-[#FE3C47] duration-300 ease-in-out transition-all'>লগইন</span></ActiveRoute></span></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;