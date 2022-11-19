import React from 'react';
import Header from '../Header/Header';
import Footer from '../Shared/Footer/Footer';
import PageTitle from '../Shared/PageTitle';


const AboutUs = () => {
    return (
        <div>
            <Header />
            <PageTitle title={"About"}></PageTitle>
            <div className='bg-[#F5F7FF]'>
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col md:flex-row-reverse p-0">
                        <div className='max-w-sm lg:ml-2 order-2 md:order-1'>
                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FpayraBloodDonation&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=991291448447106" width="335" height="500" style={{border:"none;overflow:hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" title='Payra'></iframe>
                        </div>
                        <div className='lg:mr-2 mt-5 lg:mt-0 order-1 md:order-2 p-2'>
                            <h1 className="text-4xl md:text-5xl  font-bold poppins-font">ABOUT US</h1>
                            <p className="py-6 lg:w-[600px] text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quasi autem ex, sunt ea corrupti doloremque officia itaque ab cum facilis ipsam quaerat a iure ullam non debitis distinctio voluptates at. Rerum aut, vitae cumque asperiores nihil nobis eaque quibusdam.</p>
                            <button className="btn btn-md">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;