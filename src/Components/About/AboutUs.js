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
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FpayraBloodDonation&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=991291448447106" width="335" height="500" style={{ border: "none;overflow:hidden" }} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" title='Payra'></iframe>
                        </div>
                        <div className='lg:mr-2 mt-5 lg:mt-0 order-1 md:order-2 p-2'>
                            <h1 className="text-4xl md:text-5xl  font-bold poppins-font">ABOUT US</h1>
                            <p className="py-6 lg:w-[600px] text-justify bangla-font">
                                <span className='text-xl text-red-500 font-semibold'>"পায়রা"</span> একটি রক্ত দাতা স্বেচ্ছা সেবী সংগঠন, যার মূল উদ্দেশ্য রক্তের জন্য ভোগা রোগীদের বা তার আত্মীয় স্বজনদের সহজে রক্তের যোগান দেওয়া। রক্ত দানকারী স্বেচ্ছাসেবীরা আমাদের ওয়েব সাইটে রেজিষ্ট্রেশন করলে নির্দিষ্ট সময় পরে আমাদের অ্যাডমিনরা তার সাথে যোগাযোগ করে রক্ত দানের জন্য উৎসাহি করবেন।
                                <br />
                                <br />
                                আমরা নানান সময়ে দেখেছি কত মানুষের নির্দিষ্ট একটি গ্রুপের রক্তের জন্য হাহাকার। কিন্তু দেখা গেছে ঐ রক্তের দাতার আভাব নেই কিন্তু সঠিক যোগাযোগের অভাবে রোগীকে / রক্ত সংগ্রহকারীকে ভুগতে হয়। আমরা সেই সমস্যা সমাধান করার চেষ্টা করছি মাত্র। রক্ত সংগ্রহকারী আমাদের অ্যাডমিনদের ফোনে অথবা ওয়েবসাইটের নির্দিষ্ট ফর্ম পূরণ করে জানালে অ্যাডমিনরাই রক্তদাতা খুজে দিবেন অনতিবিলম্বে।
                                <br />
                                <br />
                                আল্লাহর দেওয়া সবচেয়ে বড় নিয়ামত সুস্থতাকে কাজে লাগিয়ে অসুস্থ / অসহায় রোগীর পাশে দাঁড়িয়ে কাজ করতে চায় আমাদের প্লাটফর্ম শান্তির প্রতীক "পায়রা"।</p>
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