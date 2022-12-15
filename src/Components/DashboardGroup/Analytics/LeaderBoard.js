import React from 'react';
import { useNavigate } from 'react-router-dom';
import crwon from '../../../Resources/crown.svg'
import { useQuery } from 'react-query';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const LeaderBoard = () => {

    const navigate = useNavigate()
    const { data: topDonor, isLoading } = useQuery('topDonor', () => fetch('http://localhost:5000/top-donor', {
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

    const leaderBoardTopper = topDonor?.slice(0, 5)

    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg bg-gradient-to-r from-[#5E17E6] to-[#6747F8]'>
            <p className='text-white text-xl poppins-font font-semibold mb-4'>Donors Leader Board</p>

            <p className='text-white bangla-font font-bold mb-3 grid grid-cols-3 px-2 sm:px-5'>
                <span>অবস্থান</span>
                <span className='text-center'>রক্তের গ্রুপ</span>
                <span className='text-right'>মোট রক্তদান</span>
            </p>

            {leaderBoardTopper?.map((singleDonor, index) => <div className='grid grid-cols-3 bg-white py-3.5 px-2 sm:px-5 rounded-lg mb-3'>
                {singleDonor.name.length > 15 ?
                    <p className='poppins-font flex items-center font-semibold text-sm whitespace-nowrap overflow-hidden'> <span className='mr-3'>{index + 1}</span> {singleDonor.name.slice(0, 15)}... <span className='ml-3 md:block hidden'> <img className='w-5 mb-1' src={crwon} alt="" /> </span></p>
                    :
                    <p className='poppins-font flex items-center font-semibold text-sm whitespace-nowrap overflow-hidden'> <span className='mr-3'>{index + 1}</span> {singleDonor.name} <span className='ml-3 md:block hidden'> <img className='w-5 mb-1' src={crwon} alt="" /> </span></p>
                }
                {singleDonor.bloodGroup === "oPositive" &&
                    <p className='capitalize poppins-font text-red-500 font-bold text-center'>O+</p>
                }
                {singleDonor.bloodGroup === "oNegative" &&
                    <p className='capitalize poppins-font text-red-500 font-bold text-center'>O-</p>
                }
                {singleDonor.bloodGroup === "aPositive" &&
                    <p className='capitalize poppins-font text-red-500 font-bold text-center'>A+</p>
                }
                {singleDonor.bloodGroup === "aNegative" &&
                    <p className='capitalize poppins-font text-red-500 font-bold text-center'>A-</p>
                }
                {singleDonor.bloodGroup === "bPositive" &&
                    <p className='capitalize poppins-font text-red-500 font-bold text-center'>B+</p>
                }
                {singleDonor.bloodGroup === "bNegative" &&
                    <p className='capitalize poppins-font text-red-500 font-bold text-center'>B-</p>
                }
                {singleDonor.bloodGroup === "abPositive" &&
                    <p className='capitalize poppins-font text-red-500 font-bold text-center'>AB+</p>
                }
                {singleDonor.bloodGroup === "abNegative" &&
                    <p className='capitalize poppins-font text-red-500 font-bold text-center'>AB-</p>
                }
                <p className='bangla-font text-right text-red-500 font-bold'>{singleDonor.donationCount}   বার</p>
            </div>)
            }

        </div>
    );
};

export default LeaderBoard;