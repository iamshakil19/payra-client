import React from 'react';
import logo from '../../../Resources/Logos/logo.png'
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineGoogle } from "react-icons/ai";
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='bg-black py-16 px-5'>
            <div className='mb-7'>
                <h2 className='text-white text-3xl poppins-font text-center font-bold'>PAYRA</h2>
                <h2 className='text-slate-400 text-sm poppins-font text-center font-bold'>Lorem ipsum dolor sit amet consectetur</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <div className='sm:flex justify-center'>
                    <div>
                        <img src={logo} alt="" className='w-20 block sm:mx-auto' />
                        <p className='text-slate-200 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eaque voluptatibus dignissimos amet, consectetur quisquam eos dicta et blanditiis debitis!</p>
                    </div>
                </div>
                <div className='sm:flex justify-center'>
                    <div>
                        <h3 className='text-slate-200 poppins-font font-bold  text-[16px] mb-3'>EXPLORE PHONE CREATION</h3>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                    </div>
                </div>
                <div className='sm:flex justify-center'>
                    <div>
                        <h3 className='text-slate-200 poppins-font font-bold  text-[16px] mb-3'>CUSTOMER SERVICE</h3>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                    </div>
                </div>
                <div className='sm:flex justify-center'>
                    <div>
                        <h3 className='text-slate-200 poppins-font font-bold  text-[16px] mb-3'>NEWSLETTER</h3>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                    </div>
                </div>
            </div>
            <div className="border-b my-10 border-slate-400"></div>
            <div className='text-center'>
                <span data-tip="Link not set yet" className='tooltip text-white text-xl mx-2 border-2 cursor-pointer hover:bg-slate-100 hover:text-black transition-all duration-200 ease-in-out border-slate-100 p-1 inline-block rounded-full'><FaFacebookF/></span>
                <span data-tip="Link not set yet" className='tooltip text-white text-xl mx-2 border-2 cursor-pointer hover:bg-slate-100 hover:text-black transition-all duration-200 ease-in-out border-slate-100 p-1 inline-block rounded-full'><AiOutlineInstagram/></span>
                <span data-tip="Link not set yet" className='tooltip text-white text-xl mx-2 border-2 cursor-pointer hover:bg-slate-100 hover:text-black transition-all duration-200 ease-in-out border-slate-100 p-1 inline-block rounded-full'><AiOutlineTwitter/></span>
                <span data-tip="Link not set yet" className='tooltip text-white text-xl mx-2 border-2 cursor-pointer hover:bg-slate-100 hover:text-black transition-all duration-200 ease-in-out border-slate-100 p-1 inline-block rounded-full'><AiOutlineGoogle/></span>
            </div>
            <p className='text-center text-slate-100 mt-3'>Copyright © {currentYear} - All right reserved</p>

        </div>
    );
};

export default Footer;