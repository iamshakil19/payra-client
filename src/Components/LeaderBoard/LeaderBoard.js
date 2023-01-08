import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Loading from '../Shared/Loading/Loading';
import crwon from '../../Resources/crown.svg'
import Footer from '../Shared/Footer/Footer';
const LeaderBoard = () => {

    const navigate = useNavigate()
    const { data: leaderBoardData, isLoading } = useQuery('leaderBoard', () => fetch('http://localhost:5000/top-donor', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    const leaderBoardTopper = leaderBoardData?.slice(0, 5)
    const leaderBoardNormalDonar = leaderBoardData?.slice(5, 20)


    return (
        <div className='bg-[#F5F7FF]'>
            <Header />

            <p className='poppins-font text-2xl font-bold text-slate-700 text-center mt-4 container mx-auto'>
                Leader Board
            </p>

            <div className='container mx-auto'>
                <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg bg-gradient-to-r from-[#5E17E6] to-[#6747F8]'>
                    <p className='text-white text-xl poppins-font font-semibold mb-4'>Top Positions</p>

                    <p className='text-white bangla-font font-bold mb-3 grid grid-cols-3 px-2 sm:px-5'>
                        <span>অবস্থান</span>
                        <span className='text-center'>রক্তের গ্রুপ</span>
                        <span className='text-right'>মোট রক্তদান</span>
                    </p>

                    {leaderBoardTopper?.map((singleDonor, index) => <div className='grid grid-cols-3 bg-white py-3.5 px-2 sm:px-5 rounded-lg mb-3'>
                        {singleDonor.name.length > 15 ?
                            <p className='poppins-font flex items-center font-semibold text-sm whitespace-nowrap overflow-hidden'> <span className='mr-3'>{index + 1}</span> {singleDonor.name.slice(0, 15)} ... <span className='ml-3 md:block hidden'> <img className='w-5 mb-1' src={crwon} alt="" /> </span></p>
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
            </div>


            <div className='container mx-auto pb-10 mt-7'>
                <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg bg-[#fe3c46ea]'>
                    <p className='text-white text-xl poppins-font font-semibold mb-4'>Near The Top Positions</p>

                    <p className='text-white bangla-font font-bold mb-3 grid grid-cols-3 px-2 sm:px-5'>
                        <span>অবস্থান</span>
                        <span className='text-center'>রক্তের গ্রুপ</span>
                        <span className='text-right'>মোট রক্তদান</span>
                    </p>

                    {leaderBoardNormalDonar?.map((singleDonor, index) => <div className='grid grid-cols-3 bg-white py-3.5 px-2 sm:px-5 rounded-lg mb-3'>
                        {singleDonor.name.length > 15 ?
                            <p className='poppins-font flex items-center font-semibold text-sm whitespace-nowrap overflow-hidden'> <span className='mr-3'>{index + 1}</span> {singleDonor.name.slice(0, 15)}... </p>
                            :
                            <p className='poppins-font flex items-center font-semibold text-sm whitespace-nowrap overflow-hidden'> <span className='mr-3'>{index + 6}</span> {singleDonor.name} </p>
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
            </div>

            <Footer />
        </div>
    );
};

export default LeaderBoard;