import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


const DonorList = () => {
    const [isSelected, setSelected] = useState(true);
    const navigate = useNavigate()

    const handleComplete = () => {
        setSelected(true)
        navigate("/dashboard/donor-list")
    }
    const handleInComplete = () => {
        setSelected(false)
        navigate("/dashboard/donor-list/unavailableDonor")
    }
    return (
        <div>
            <div>
                <section className='px-2 sm:px-0 pt-2'>
                    <div className='flex space-x-1 rounded-xl bg-[#0E1530] p-1 max-w-md mx-auto mb-4'>
                        <button onClick={handleComplete} className={`w-full rounded-lg py-2.5 text-sm font-semibold ${isSelected ? "bg-white text-[#141C39]" : "text-white "}`}>Available</button>
                        <button onClick={handleInComplete} className={`relative w-full rounded-lg py-2.5 text-sm font-semibold ${!isSelected ? "bg-white text-[#141C39]" : "text-white "} `}>Unavailable</button>
                    </div>
                </section>

                <Outlet />
            </div>
        </div>
    );
};

export default DonorList;