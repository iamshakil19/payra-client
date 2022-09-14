import { signOut } from 'firebase/auth';
import React from 'react';
import { ImFire } from "react-icons/im";
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

const RecentDonor = () => {

    const navigate = useNavigate()
    const { data: allDonorList, isLoading, refetch } = useQuery('donorList', () => fetch('http://localhost:5000/verified-donor', {
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

    const latest5Donor = allDonorList.slice(0, 5)
    console.log(latest5Donor);

    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg'>
            <p className='text-[#141C39] text-xl poppins-font font-semibold mb-4 flex items-center'> <span className='mr-3 text-red-500'><ImFire/> </span> New Donors</p>

            {
                latest5Donor?.map(newDonor => <div className='grid grid-cols-3 border-b py-1.5'> <p className='bangla-font'>{newDonor.name}</p> <p className='bangla-font text-center'>{newDonor.gender}</p> <p className='capitalize poppins-font text-red-500 font-bold text-center'>{newDonor.bloodGroup}</p> </div> )
            }
        </div>
    );
};

export default RecentDonor;