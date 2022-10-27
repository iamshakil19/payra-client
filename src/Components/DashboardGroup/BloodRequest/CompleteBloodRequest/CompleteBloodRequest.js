import React from 'react';
import Loading from '../../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import CompleteBloodRequestRow from './CompleteBloodRequestRow';
import { useState } from 'react';
import CompleteDeleteModal from './CompleteDeleteModal';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import CompleteBloodProfileModal from './CompleteBloodProfileModal';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const CompleteBloodRequest = () => {
    const navigate = useNavigate()
    const [bloodRequestDeleteData, setBloodRequestDeleteData] = useState(null)
    const [bloodRequestProfileData, setBloodRequestProfileData] = useState(null)
    const [limit, setLimit] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)

    const { data, isLoading, refetch } = useQuery(['completeBloodList', limit, pageNumber], () => fetch(`http://localhost:5000/complete-blood-request?limit=${limit}&pageNumber=${pageNumber}`, {
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

    const handlePreviousButton = () => {
        if (pageNumber >= 1) {
            setPageNumber(pageNumber - 1)
        }
    }
    const handleNextButton = () => {
        if (pageNumber === data?.pageCount - 1) {
            return
        }
        setPageNumber(pageNumber + 1)

    }

    return (
        <div className="overflow-x-auto">
            <div className='mb-3 hidden lg:block'>
                <p className='text-right'>
                    <span className='poppins-font'>Show : </span>
                    <select onChange={(e) => setLimit(e.target.value)} defaultValue={limit} className="py-1 px-1 bg-slate-200 font-semibold outline-none rounded-sm poppins-font">
                        <option selected className='font-semibold' value="10">10</option>
                        <option className='font-semibold' value="15">15</option>
                        <option className='font-semibold' value="25">25</option>
                        <option className='font-semibold' value="50">50</option>
                    </select>
                </p>
            </div>
            <table className="table w-full">

                <thead>
                    <tr>
                        <th className='bangla-font text-[15px] '>সিরিয়াল</th>
                        <th className='bangla-font text-[15px] pl-2'>প্রোফাইল</th>
                        <th className='bangla-font text-[15px] pl-2'>রোগীর নাম</th>
                        <th className='bangla-font text-[15px] pl-2'>রক্তের গ্রুপ</th>
                        <th className='bangla-font text-[15px] pl-2'>রক্তের পরিমাণ</th>
                        <th className='bangla-font text-[15px] pl-2'>হিমোগ্লোবিন</th>
                        <th className='bangla-font text-[15px] pl-2'>রক্তদানের তারিখ</th>
                        <th className='bangla-font text-[15px] pl-2'>ফোন নাম্বার</th>
                        <th className='bangla-font text-[15px] pl-2'>রোগীর সমস্যা</th>
                        <th className='bangla-font text-[15px] pl-2'>রক্তদানের স্থান</th>
                        <th className='bangla-font text-[15px] pl-2'>স্টাটাস</th>
                        <th className='bangla-font text-[15px] pl-2'>অ্যাকশন</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data?.completeBloodRequestList?.map((completeSingleBloodRequest, index) => <CompleteBloodRequestRow
                            key={completeSingleBloodRequest._id}
                            completeSingleBloodRequest={completeSingleBloodRequest}
                            refetch={refetch}
                            index={index + 1}
                            setBloodRequestDeleteData={setBloodRequestDeleteData}
                            setBloodRequestProfileData={setBloodRequestProfileData}
                        ></CompleteBloodRequestRow>)
                    }
                </tbody>
            </table>

            {
                bloodRequestDeleteData && <CompleteDeleteModal
                    bloodRequestDeleteData={bloodRequestDeleteData}
                    setBloodRequestDeleteData={setBloodRequestDeleteData}
                    refetch={refetch}
                ></CompleteDeleteModal>
            }

            {
                bloodRequestProfileData && <CompleteBloodProfileModal
                    key={bloodRequestProfileData._id}
                    bloodRequestProfileData={bloodRequestProfileData}
                ></CompleteBloodProfileModal>
            }

            <div className="flex items-center justify-between border-t px-4 py-3 sm:px-6 bg-[#F5F7FF]">
                <div className="flex flex-1 justify-between sm:hidden">
                    <span
                        onClick={handlePreviousButton}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </span>
                    <span
                        onClick={handleNextButton}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </span>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(limit * pageNumber) + 1} </span> to
                            {(pageNumber + 1) * limit >= data?.totalCount ?
                                <span className="font-medium"> {data?.totalCount} </span>
                                :
                                <span className="font-medium"> {(pageNumber + 1) * limit} </span>
                            }
                            of{' '}
                            <span className="font-medium">{data.totalCount}</span> results
                        </p>
                    </div>
                    <div>

                        <nav className="isolate inline-flex -space-x-px rounded-md bg-[#F5F7FF]" aria-label="Pagination">
                            <span
                                onClick={handlePreviousButton}
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </span>

                            {
                                [...Array(data?.pageCount).keys()].map(number => <span onClick={() => setPageNumber(number)}
                                    className={`relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm  text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer poppins-font font-semibold ${pageNumber === number ? "z-10 bg-indigo-100 border-indigo-500 text-indigo-600" : ""}`}
                                >
                                    {number + 1}
                                </span>)
                            }

                            <span
                                onClick={handleNextButton}
                                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                        </nav>
                    </div>
                </div>
            </div>
        </div>





    );
};

export default CompleteBloodRequest;