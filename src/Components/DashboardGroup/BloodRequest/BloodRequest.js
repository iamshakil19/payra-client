import React from 'react';
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
const BloodRequest = () => {

    const [isSelected, setSelected] = useState(true);
    const navigate = useNavigate()

    const handleComplete = () => {
        setSelected(true)
        navigate("/dashboard/blood-request")
    }
    const handleInComplete = () => {
        setSelected(false)
        navigate("/dashboard/blood-request/incomplete-blood-request")
    }

    return (
        <div>
            <div>
                <section className='px-2 sm:px-0 pt-2'>
                    <div className='flex space-x-1 rounded-xl bg-[#0E1530] p-1 max-w-md mx-auto mb-4'>
                        <button onClick={handleComplete} className={`w-full rounded-lg py-2.5 text-sm font-semibold ${isSelected ? "bg-white text-[#141C39]" : "text-white "}`}>Complete</button>
                        <button onClick={handleInComplete} className={`w-full rounded-lg py-2.5 text-sm font-semibold ${!isSelected ? "bg-white text-[#141C39]" : "text-white "} `}>Incomplete</button>
                    </div>
                </section>

                <Outlet/>
            </div>
        </div>
    );
};

export default BloodRequest;