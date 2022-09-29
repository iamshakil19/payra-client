import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Banner/Banner.css'
import PageTitle from '../Shared/PageTitle';
const Banner = () => {
    const navigate = useNavigate()

    const navigateToRequestForBlood = () => {
        navigate("/contact")
    }
    const navigateToDonorRegistration = () => {
        navigate("/donorRegistration")
    }

    return (
        <div className='custom-height banner-container flex justify-center items-center relative'>
            <PageTitle title={"Home"}></PageTitle>
            <div ata-aos="zoom-out">
                <h2 className='text-white text-4xl md:text-5xl lg:text-6xl text-center px-5 banner-title mb-5'>রক্ত দিন জীবন বাঁচান</h2>
                <p className='text-white px-5 text-center banner-text mb-10 text-lg'>সময় তুমি হার মেনেছ রক্তদানের কাছে, দশটি মিনিট করলে খরচ একটি জীবন বাঁচে ।</p>

                <div className='text-center md:flex md:justify-center'>
                    <div className='mb-5 md:mb-0 md:mx-4'>
                        <button onClick={navigateToRequestForBlood} className='button h-11 md:h-12 w-48'>যোগাযোগ করুন</button>
                    </div>
                    <div>
                        <button onClick={navigateToDonorRegistration} className='button md:mx-4 h-11 md:h-12 w-48'>রেজিষ্ট্রেশন করুন</button>
                    </div>
                </div>
            </div>

            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpayradonation&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=991291448447106"  width="340" height="130" style={{border: "none;overflow:hidden", borderRadius: "5px", position: "absolute"}} className=" bottom-0 right-auto sm:right-2 mb-2" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" title='payra'></iframe>

        </div>
    );
};

export default Banner;