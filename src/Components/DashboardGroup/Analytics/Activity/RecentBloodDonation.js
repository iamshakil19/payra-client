import React from 'react';
import { BiDonateHeart } from "react-icons/bi";
const RecentBloodDonation = () => {
    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg'>
            <p className='text-[#141C39] text-xl poppins-font font-semibold mb-4 flex items-center'> <span className='mr-3 text-red-500 text-2xl'><BiDonateHeart/> </span>Recent Blood Donation</p>
        </div>
    );
};

export default RecentBloodDonation;