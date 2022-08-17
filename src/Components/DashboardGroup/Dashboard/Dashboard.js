import React from 'react';
import Header from '../../Header/Header';
import { FaChartLine, FaUsers } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import { MdAdminPanelSettings, MdBloodtype } from "react-icons/md";
import { BsChatSquareQuote } from "react-icons/bs";
import { GiHummingbird } from "react-icons/gi";
import './Dashboard.css'
const Dashboard = () => {

    return (
        <div>
            <Header />
            <div className='body'>
                <div className="container">
                    <div className="navigation">
                    
                        <ul>
                            <li>
                                <a href="#" className=''>
                                    <span className='icon text-3xl'><GiHummingbird /></span>
                                    <span className='title text-xl font-semibold'>Payra Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className=''>
                                    <span className='icon text-2xl'><FaChartLine /></span>
                                    <span className='title'>Analytics</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className=''>
                                    <span className='icon text-2xl'><BiDonateBlood /></span>
                                    <span className='title'>Donor List</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className=''>
                                    <span className='icon text-2xl'><MdBloodtype /></span>
                                    <span className='title'>Donor Request</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className=''>
                                    <span className='icon text-2xl'><BsChatSquareQuote /></span>
                                    <span className='title'>Blood Request</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className=''>
                                    <span className='icon text-2xl'><FaUsers /></span>
                                    <span className='title'>All User</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className=''>
                                    <span className='icon text-2xl'><MdAdminPanelSettings /></span>
                                    <span className='title'>Admin List</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;