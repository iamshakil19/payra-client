import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../../Resources/blood-bg.jpg'
import '../Banner/Banner.css'
const Banner = () => {
    const navigate = useNavigate()

    const navigateToRequestForBlood = () => {
        navigate("/contact")
    }
    const navigateToDonorRegistration = () => {
        navigate("/donorRegistration")
    }

    return (
        <div className='min-h-screen banner-container flex justify-center items-center'>
            <div ata-aos="zoom-out">
                <h2 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center px-5 banner-title mb-5'>রক্ত দিন জীবন বাঁচান</h2>
                <p className='text-white px-5 text-center banner-text mb-10 text-lg'>কেউ এগিয়ে আসুন! জরুরি ভিত্তিতে একজন মায়ের জন্য "রংপুরে" A+ রক্ত দরকার: ক্যান্সারের রোগীর জন্য আজকের [২৫-০৫-২০২২] মধ্যে ২ ব্যাগ "এ পজেটিভ" রক্ত দরকার।</p>

                <div className='text-center md:flex md:justify-center'>
                    <div className='mb-5 md:mb-0 md:mx-4'>
                        <button onClick={navigateToRequestForBlood} className='button h-11 md:h-12 w-48'>যোগাযোগ করুন</button>
                    </div>
                    <div>
                        <button onClick={navigateToDonorRegistration} className='button md:mx-4 h-11 md:h-12 w-48'>রেজিষ্ট্রেশন করুন</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;