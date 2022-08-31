import React from 'react';
import { useState } from 'react'

const BloodRequest = () => {

    const [isSelected, setSelected] = useState(true);

    const handleComplete = () => {
        setSelected(true)
    }
    const handleInComplete = () => {
        setSelected(false)
    }

    return (
        <div>
            <div>
                <section className='px-2 sm:px-0 py-3'>
                    <div className='flex space-x-1 rounded-xl bg-[#0E1530] p-1 max-w-md mx-auto mb-4'>
                        <button onClick={handleComplete} className={`w-full rounded-lg py-2.5 text-sm font-semibold ${isSelected ? "bg-white text-blue-700" : "text-white "}`}>Complete</button>
                        <button onClick={handleInComplete} className={`w-full rounded-lg py-2.5 text-sm font-semibold ${!isSelected ? "bg-white text-blue-700" : "text-white "} `}>Incomplete</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BloodRequest;