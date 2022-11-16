import { signOut } from 'firebase/auth';
import React from 'react';
import { BiDonateHeart } from "react-icons/bi";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';
const RecentBloodDonation = () => {

    const navigate = useNavigate()
    const { data, isLoading } = useQuery('recentCompleteDonation', () => fetch('https://payra.onrender.com/complete-blood-request', {
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

    const latest5Donation = data?.completeBloodRequestList.slice(0, 5)

    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg'>
            <p className='text-[#141C39] text-xl poppins-font font-semibold mb-4 flex items-center'> <span className='mr-3 text-red-500 text-2xl'><BiDonateHeart /> </span>Recent Blood Donation</p>

            <div className='grid grid-cols-3 border-b py-1.5'> <p className='bangla-font font-bold'>রক্ত গ্রহীতা</p> <p className='bangla-font text-center font-bold'>পরিমাণ</p> <p className='capitalize bangla-font text-red-500 font-bold text-center'>গ্রুপ</p> </div>
            {
                latest5Donation?.map(singleDonation => <div className='grid grid-cols-3 border-b py-1.5'> <p className='bangla-font'>{singleDonation.patient_name}</p>
                    <p className='bangla-font text-center'>{singleDonation.blood_quantity} ব্যাগ</p>

                    {singleDonation.requested_bloodGroup === "oPositive" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>O+</p>
                    }
                    {singleDonation.requested_bloodGroup === "oNegative" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>O-</p>
                    }
                    {singleDonation.requested_bloodGroup === "aPositive" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>A+</p>
                    }
                    {singleDonation.requested_bloodGroup === "aNegative" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>A-</p>
                    }
                    {singleDonation.requested_bloodGroup === "bPositive" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>B+</p>
                    }
                    {singleDonation.requested_bloodGroup === "bNegative" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>B-</p>
                    }
                    {singleDonation.requested_bloodGroup === "abPositive" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>AB+</p>
                    }
                    {singleDonation.requested_bloodGroup === "abNegative" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>AB-</p>
                    }
                </div>)
            }
        </div>
    );
};

export default RecentBloodDonation;