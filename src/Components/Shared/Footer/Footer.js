import React from 'react';
import logo from '../../../Resources/Logos/logo.png'
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineGoogle } from "react-icons/ai";
import { useForm } from "react-hook-form";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();

    const onSubmit = async data => {
        console.log(data);

    };

    return (
        <div className='bg-black py-16 px-5'>
            <div className='mb-7'>
                <h2 className='text-white text-3xl poppins-font text-center font-bold'>PAYRA</h2>
                <h2 className='text-slate-400 text-sm poppins-font text-center font-bold'>Donate Blood, Save Life</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='md:flex justify-center'>
                    <div>
                        <img src={logo} alt="" className='w-20 block mb-3' />
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Brand</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">FAQ</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">Contact</a></p>
                    </div>
                </div>
                <div className='md:flex justify-center'>
                    <div>
                        <h3 className='text-slate-200 poppins-font font-bold  text-[16px] mb-3'>EXPLORE PAYRA</h3>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">About Us</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">News & articles</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">Our Offers</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">Custom Order</a></p>
                    </div>
                </div>
                <div className='md:flex justify-center'>
                    <div>
                        <h3 className='text-slate-200 poppins-font font-bold  text-[16px] mb-3'>CUSTOMER SERVICE</h3>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">Support</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">Sale</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">Our Next Target</a></p>
                        <p ><a className='text-slate-400 poppins-font hover:text-white text-[14px]' href="#">Achievement</a></p>
                    </div>
                </div>
                <div className='md:flex justify-center'>
                    <div>
                        <h3 className='text-slate-200 poppins-font font-bold  text-[16px] mb-3'>NEWSLETTER</h3>
                        <p className='max-w-[250px] text-slate-200'>Subscribe now to receive monthly news & personalised offers!</p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex items-center mt-5'>
                                <input autoComplete='off' type="email" placeholder="Type your email"
                                    className="max-w-xs bg-transparent border py-1 px-2 text-slate-200 rounded-l-full md:max-w-[130px] lg:max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required"
                                        },
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Provide a valid email'
                                        }
                                    })}
                                />
                                <input className='border text-sm py-1.5 px-2 text-slate-100 poppins-font rounded-r-full font-semibold hover:text-black hover:bg-slate-100 cursor-pointer transition-all duration-300 ease-in-out' type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="border-b my-10 border-slate-400"></div>
            <div className='text-center'>
                <span data-tip="Link not set yet" className='tooltip text-slate-200 text-xl mx-2 border-2 cursor-pointer hover:bg-slate-200 hover:text-black transition-all duration-200 ease-in-out border-slate-200 p-1 inline-block rounded-full'><FaFacebookF /></span>
                <span data-tip="Link not set yet" className='tooltip text-slate-200 text-xl mx-2 border-2 cursor-pointer hover:bg-slate-200 hover:text-black transition-all duration-200 ease-in-out border-slate-200 p-1 inline-block rounded-full'><AiOutlineInstagram /></span>
                <span data-tip="Link not set yet" className='tooltip text-slate-200 text-xl mx-2 border-2 cursor-pointer hover:bg-slate-200 hover:text-black transition-all duration-200 ease-in-out border-slate-200 p-1 inline-block rounded-full'><AiOutlineTwitter /></span>
                <span data-tip="Link not set yet" className='tooltip text-slate-200 text-xl mx-2 border-2 cursor-pointer hover:bg-slate-200 hover:text-black transition-all duration-200 ease-in-out border-slate-200 p-1 inline-block rounded-full'><AiOutlineGoogle /></span>
            </div>
            <p className='text-center text-slate-200 mt-3'>Copyright © {currentYear} - All right reserved</p>

        </div>
    );
};

export default Footer;