import React from 'react';
import Header from '../Header/Header';
import './BloodDonorRegistration.css'
import donorImg from '../../Resources/blood-img-1.png'

const BloodDonorRegistration = () => {
    return (
        <div className='donor-registration-bg'>
            <Header></Header>

            <div class="hero min-h-screen">
                <div class="hero-content flex-col lg:flex-row">
                    <img src={donorImg} class="max-w-lg rounded-lg shadow-2xl hidden lg:block" />
                    <div>
                        <h1 class="text-5xl font-bold my-font text-white tracking-wide">আপনার তথ্য দিন</h1>
                        <p class="py-6">sdfsdfsdfsdfsdffsdfsfsdfsfsdfds</p>
                        <button class="btn">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BloodDonorRegistration;