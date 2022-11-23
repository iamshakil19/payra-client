import { signOut } from 'firebase/auth';
import React from 'react';
import { ImFire } from "react-icons/im";
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

const RecentDonor = () => {

    const navigate = useNavigate()
    const { data: recentDonor, isLoading, refetch } = useQuery('recentDonor', () => fetch('https://payra.onrender.com/verified-donor', {
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

    const latest5Donor = recentDonor.slice(0, 5)

    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg'>
            <p className='text-[#141C39] text-xl poppins-font font-semibold mb-4 flex items-center'> <span className='mr-3 text-red-500'><ImFire /> </span> New Donors</p>

            <div className='grid grid-cols-3 border-b py-1.5'> <p className='bangla-font font-bold'>রক্ত দাতা</p> <p className='bangla-font text-center font-bold'>লিঙ্গ</p> <p className='capitalize bangla-font text-red-500 font-bold text-center'>গ্রুপ</p> </div>

            {
                latest5Donor?.map(singleDonor => <div className='grid grid-cols-3 border-b py-1.5'> <p className='bangla-font'>{singleDonor.name}</p> <p className='bangla-font text-center'>{singleDonor.gender}</p>

                    {singleDonor.bloodGroup === "oPositive" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>O+</p>
                    }
                    {singleDonor.bloodGroup === "oNegative" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>O-</p>
                    }
                    {singleDonor.bloodGroup === "aPositive" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>A+</p>
                    }
                    {singleDonor.bloodGroup === "aNegative" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>A-</p>
                    }
                    {singleDonor.bloodGroup === "bPositive" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>B+</p>
                    }
                    {singleDonor.bloodGroup === "bNegative" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>B-</p>
                    }
                    {singleDonor.bloodGroup === "abPositive" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>AB+</p>
                    }
                    {singleDonor.bloodGroup === "abNegative" &&
                        <p className='capitalize poppins-font text-red-500 text-center'>AB-</p>
                    }
                </div>)
            }
        </div>
    );
};

export default RecentDonor;