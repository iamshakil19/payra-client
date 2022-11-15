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
import ReactPaginate from 'react-paginate';

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

    const handlePageClick = (event) => {
        setPageNumber(event.selected)
    };


    return (
        <div className='mb-5'>
            <div className="overflow-x-auto">
                <div className='mb-3 hidden lg:block'>
                    <p className='text-right'>
                        <span className='poppins-font'>Show : </span>
                        <select onChange={(e) => setLimit(e.target.value)} defaultValue={limit} className="py-1 px-1 bg-slate-200 font-semibold outline-none rounded-sm poppins-font">
                            <option selected className='font-semibold' value="10">10</option>
                            <option className='font-semibold' value="15">15</option>
                            <option className='font-semibold' value="25">25</option>
                            <option className='font-semibold' value="50">50</option>
                            <option className='font-semibold' value="100">100</option>
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


            </div>

            <div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={data?.pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    breakClassName="hidden lg:block py-[8px] px-[15px] cursor-pointer rounded-sm"
                    containerClassName="list-none flex items-center justify-end poppins-font text-[17px] mt-5"
                    pageLinkClassName=' cursor-pointer border border-gray-300 border-collapse font-semibold hover:bg-indigo-50 hidden lg:block bg-white text-gray-500 px-4 py-2 text-sm'
                    previousLinkClassName='cursor-pointer border border-gray-300 border-collapse font-semibold hover:bg-indigo-50 lg:block bg-white text-gray-500 px-4 py-2 text-sm rounded-l-md mr-3 lg:mr-0 hover:border-indigo-500'
                    nextLinkClassName='cursor-pointer border border-gray-300 border-collapse font-semibold hover:bg-indigo-50 ml-3 lg:ml-0 lg:block bg-white text-gray-500 px-4 py-2 text-sm rounded-r-md hover:border-indigo-500'
                    activeLinkClassName='z-10 bg-indigo-100 border-indigo-500 text-indigo-600'
                />
            </div>
        </div>





    );
};

export default CompleteBloodRequest;