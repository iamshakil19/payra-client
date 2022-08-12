import React, { useState } from 'react';
import './Header.css'
import { FaStream } from "react-icons/fa";
import ActiveRoute from '../Shared/ActiveRoute';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <div className='top-0 sticky z-50'>
            <nav>
                <div className='logo-container'> <Link to={"/"}>PAYRA</Link></div>
                <input type="checkbox" id='click' />
                <label for="click" className='menu-btn'> <FaStream /> </label>
                <ul>
                    <li><span className='nav-link active text-center custom-width'> <ActiveRoute to="/home">হোম</ActiveRoute></span></li>
                    <li><span className='nav-link active'><ActiveRoute to="/donorRegistration">রেজিষ্ট্রেশন করুন</ActiveRoute></span></li>
                    <li><span className='nav-link active'><ActiveRoute to="/contact">যোগাযোগ করুন</ActiveRoute></span></li>
                    <li><span className='nav-link active'><ActiveRoute to="/aboutUs">আমাদের সম্পর্কে</ActiveRoute></span></li>
                    <li><span className='nav-link active'><ActiveRoute to="/login">লগইন</ActiveRoute></span></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;