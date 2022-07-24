import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './Header.css'
import { FaStream, FaTimes } from "react-icons/fa";

const Header = () => {
    return (
        <div>
            <nav>
                <div className='logo-container'>PAYRA</div>
                <input type="checkbox" id='click'/>
                <label for="click" className='menu-btn'> <FaStream/> </label>
                <ul>
                    <li className=''><HashLink to="/"> <span className='nav-link active'>হোম</span></HashLink></li>
                    <li><HashLink to="/"> <span className='nav-link'>রেজিষ্ট্রেশন করুন</span> </HashLink></li>
                    <li><HashLink to="/"> <span className='nav-link'>যোগাযোগ করুন</span> </HashLink></li>
                    <li><HashLink to="/"> <span className='nav-link'>আমাদের সম্পর্কে</span> </HashLink></li>
                    <li><HashLink to="/"> <span className='nav-link'>লগইন</span> </HashLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;