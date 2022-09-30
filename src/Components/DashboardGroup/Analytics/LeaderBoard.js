import React from 'react';
import { useNavigate } from 'react-router-dom';
import crwon from '../../../Resources/crown.svg'
import { useQuery } from 'react-query';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const LeaderBoard = () => {

    const navigate = useNavigate()
    const { data: topDonor, isLoading, refetch } = useQuery('topDonor', () => fetch('https://payra.onrender.com/top-donor', {
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

    const leaderBoardTopper = topDonor.slice(0, 5)

    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg bg-[#fe3c46ea]'>
            <p className='text-white text-xl poppins-font font-semibold mb-4'>Donors Leader Board</p>

            <p className='text-white bangla-font font-bold mb-3 grid grid-cols-3 px-2 sm:px-5'>
                <span>অবস্থান</span>
                <span className='text-center'>রক্তের গ্রুপ</span>
                <span className='text-right'>মোট রক্তদান</span>
            </p>

            {leaderBoardTopper?.map((singleDonor, index) => <div className='grid grid-cols-3 bg-white py-3.5 px-2 sm:px-5 rounded-lg mb-3'>
                {
                    console.log(singleDonor)
                }
                <p className='poppins-font flex items-center font-semibold text-sm'> <span className='mr-3'>{index + 1}</span> {singleDonor.name} <span className='ml-3'> <img className='w-5 mb-1' src={crwon} alt="" /> </span></p>
                <p className='capitalize poppins-font text-red-500 font-bold text-center'>{singleDonor.bloodGroup}</p>
                <p className='bangla-font text-right text-red-500 font-bold'>{singleDonor.donationCount} বার</p>
            </div>)
            }

        </div>
    );
};

export default LeaderBoard;