import { signOut } from 'firebase/auth';
import React from 'react';
import { BiDonateHeart } from "react-icons/bi";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';
const RecentBloodDonation = () => {

    const navigate = useNavigate()
    const { data: recentCompleteDonation, isLoading, refetch } = useQuery('recentCompleteDonation', () => fetch('http://localhost:5000/complete-blood-request', {
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

    const latest5Donation = recentCompleteDonation.slice(0, 5)

    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg'>
            <p className='text-[#141C39] text-xl poppins-font font-semibold mb-4 flex items-center'> <span className='mr-3 text-red-500 text-2xl'><BiDonateHeart/> </span>Recent Blood Donation</p>

            {
                latest5Donation?.map(singleDonation => <div className='grid grid-cols-3 border-b py-1.5'> <p className='bangla-font'>{singleDonation.patient_name}</p> <p className='bangla-font text-center'>{singleDonation.blood_quantity
                } ব্যাগ</p> <p className='capitalize poppins-font text-red-500 font-bold text-center'>{singleDonation.requested_bloodGroup}</p> </div> )
            }
        </div>
    );
};

export default RecentBloodDonation;