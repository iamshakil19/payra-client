import React from 'react';
import Header from '../Header/Header';
import Footer from '../Shared/Footer/Footer';
import PageTitle from '../Shared/PageTitle';
import aboutImg from '../../Resources/about-us.gif'


const AboutUs = () => {
    return (
        <div>
            <Header />
            <PageTitle title={"About"}></PageTitle>
            <div className='bg-[#F5F7FF]'>
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className='max-w-sm lg:ml-2'>
                            <img src={aboutImg} className="object-cover rounded-lg shadow-2xl " alt='' />
                        </div>
                        <div className='lg:mr-2 mt-5 lg:mt-0'>
                            <h1 className="text-4xl md:text-5xl  font-bold poppins-font">ABOUT US</h1>
                            <p className="py-6 lg:w-[600px] text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quasi autem ex, sunt ea corrupti doloremque officia itaque ab cum facilis ipsam quaerat a iure ullam non debitis distinctio voluptates at. Rerum aut, vitae cumque asperiores nihil nobis eaque quibusdam.</p>
                            <button className="btn btn-md">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;