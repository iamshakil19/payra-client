import React from 'react';
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';

const BloodRequest = () => {

    const [isSelected, setSelected] = useState(true);
    const navigate = useNavigate()

    const { data: incompleteBloodRequestList, isLoading } = useQuery('incompleteBloodList', () => fetch('http://localhost:5000/incomplete-blood-request', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth)
                localStorage.removeItem('accessToken')
                navigate('/')
            }
            return res.json()
        }))

    if (isLoading) {
        return <Loading />
    }


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
            <section className='px-2 sm:px-0 pt-2'>
                <div className='flex space-x-1 rounded-xl bg-[#0E1530] p-1 max-w-md mx-auto mb-4'>
                    <button onClick={handleComplete} className={`w-full rounded-lg py-2.5 text-sm font-semibold ${isSelected ? "bg-white text-[#141C39]" : "text-white "}`}>Complete</button>
                    <button onClick={handleInComplete} className={`relative w-full rounded-lg py-2.5 text-sm font-semibold ${!isSelected ? "bg-white text-[#141C39]" : "text-white "} `}>Incomplete
                        {
                            incompleteBloodRequestList?.length > 0 &&
                            <span className="indicator-item badge bg-orange-500 poppins-font w-2 border absolute top-0 right-0 font-bold">{incompleteBloodRequestList?.length}</span>
                        }
                    </button>
                </div>
            </section>

            <Outlet />
        </div>
    );
};

export default BloodRequest;